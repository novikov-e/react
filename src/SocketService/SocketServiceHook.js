import {Client, Versions} from 'stompjs7';
import {SERVER_URL} from './url';
import {useCallback, useEffect, useState} from 'react';

let SockJS = require('sockjs-client');

export default function useSocketService(component) {
  let client = new Client();
  let interval;

  const [lostConnection, setLostConnection] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [subscriptions, setSubscriptions] = useState({});
  const [callbacks, setCallbacks] = useState({});

  const workCallback = useCallback(() => {
    setTasks(prev => {
      if (prev.length) {
        for (const task of prev) {
          switch (task.action) {
            case 'subscribe':
              setSubscriptions(prev => {
                prev[task.subscription.topic] = {
                  task,
                  subscription: client.subscribe(task.subscription.topic, task.subscription.callback),
                };
                return prev;
              });
              break;
            case 'unsubscribe':
              if (subscriptions[task.subscription.topic]) {
                setSubscriptions(prev => {
                  prev[task.subscription.topic].subscription.unsubscribe();
                  delete prev[task.subscription.topic];
                  return prev;
                });
              }
              break;
            default:
              break;
          }
        }
        return [];
      }
      return prev;
    });
  }, [tasks, subscriptions, callbacks]);

  useEffect(() => {
    client.webSocketFactory = function () {
      return new SockJS(SERVER_URL + '/webserver');
    };

    client.debug = function (str) {
      console.log('STOMP: ' + str);
    };

    client.stompVersions = new Versions(['1.1', '1.0']);
    client.heartbeatIncoming = 5000;
    client.heartbeatOutgoing = 5000;
    client.connectHeaders = {component};

    client.connectionTimeout = 10000;
    client.reconnectDelay = 10000;

    client.onConnect = function (frame) {
      if (lostConnection) {
        for (const callbacksKey in callbacks) {
          callbacks[callbacksKey]();
        }
        for (const subscription in subscriptions) {
          subscriptions[subscription].subscription = client.subscribe(
            subscriptions[subscription].task.subscription.topic,
            subscriptions[subscription].task.subscription.callback,
          );
        }
      }
      interval = setInterval(workCallback, 3000);
      setLostConnection(false);
    };
    client.onWebSocketClose = function (closeEvent) {
      console.log('onWebSocketClose');
      console.log(closeEvent);
      setLostConnection(true);
      clearInterval(interval);
    };
    client.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    client.onChangeState = function (state) {
      console.log('onChangeState');
      console.log(state);
    };
    client.onDisconnect = function (frame) {
      console.log('onDisconnect');
      console.log(frame);
      clearInterval(interval);
    };
    client.onUnhandledFrame = function (frame) {
      console.log('onUnhandledFrame');
      console.log(frame);
    };
    client.onUnhandledMessage = function (message) {
      console.log('onUnhandledMessage');
      console.log(message);
    };
    client.onWebSocketError = function (closeEvent) {
      console.log('onWebSocketError');
      console.log(closeEvent);
    };
    // console.log(client.state);
    // console.log(client.connected);
    // console.log(client.active);
    client.activate();
  }, []);

  const subscribe = (topic, callback) => {
    setTasks(prev => {
      prev.push({action: 'subscribe', subscription: {topic, callback}});
      return prev;
    });
  };

  const unsubscribe = topic => {
    setTasks(prev => {
      prev.push({action: 'unsubscribe', subscription: {topic}});
      return prev;
    });
  };

  const callAfterReconnect = (component, callback) => {
    setCallbacks(prev => {
      prev[component] = callback;
      return prev;
    });
  };

  const dontCallAfterReconnect = component => {
    setCallbacks(prev => {
      delete prev[component];
      return prev;
    });
  };

  return {state: !lostConnection, subscribe, unsubscribe, callAfterReconnect, dontCallAfterReconnect};
}
