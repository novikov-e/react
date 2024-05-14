import {Client, Versions} from 'stompjs7';
import {SERVER_URL} from './url';
let SockJS = require('sockjs-client');

let client;
let lostConnection = false;
const tasks = [];
const subscriptions = {};
let interval;
const callbacks = [];

class SocketService {
  constructor() {
    if (client) {
      throw new Error('You can only create one instance!');
    }
    client = new Client();
    client.webSocketFactory = function () {
      return new SockJS(SERVER_URL + '/webserver');
    };

    client.debug = function (str) {
      console.log('STOMP: ' + str);
    };

    client.stompVersions = new Versions(['1.1', '1.0']);
    client.heartbeatIncoming = 5000;
    client.heartbeatOutgoing = 5000;
    client.connectHeaders = {component: 'pageOperator'};

    client.connectionTimeout = 10000;
    client.reconnectDelay = 10000;

    client.onConnect = function (frame) {
      console.log('client.onConnect');
      if (lostConnection) {
        console.log('lostConnection');
        callbacks.forEach(callback => callback());
        for (const subscription in subscriptions) {
          subscriptions[subscription].subscription = client.subscribe(
            subscriptions[subscription].task.subscription.topic,
            subscriptions[subscription].task.subscription.callback,
          );
        }
      }

      const work = () => {
        console.log('work');
        console.log(tasks);
        console.log(subscriptions);
        while (tasks.length) {
          const task = tasks.pop();
          switch (task.action) {
            case 'subscribe':
              subscriptions[task.subscription.topic] = {
                task,
                subscription: client.subscribe(task.subscription.topic, task.subscription.callback),
              };
              break;
            case 'unsubscribe':
              if (subscriptions[task.subscription.topic]) {
                subscriptions[task.subscription.topic].subscription.unsubscribe();
                delete subscriptions[task.subscription.topic];
              }
              break;
            default:
              break;
          }
        }
      };
      interval = setInterval(work, 1000);
      lostConnection = false;
    };
    client.onWebSocketClose = function (closeEvent) {
      console.log('onWebSocketClose');
      console.log(closeEvent);
      lostConnection = true;
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
  }

  subscribe(topic, callback) {
    tasks.push({action: 'subscribe', subscription: {topic, callback}});
  }

  unsubscribe(topic) {
    tasks.push({action: 'unsubscribe', subscription: {topic}});
  }

  callAfterReconnect(callback) {
    callbacks.push(callback);
  }
}

const SOCKET_SERVICE = Object.freeze(new SocketService());
export default SOCKET_SERVICE;
