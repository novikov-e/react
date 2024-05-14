import React, {Component} from 'react';
import ObjectInfo from './object/ObjectInfo';
import Notifications from './Notifications';
import {connect} from 'react-redux';
import {closeTab, showTab} from '../../tabs/TabsActions';

class Info extends Component {
  buttons = () => {
    let buttons = [];
    for (let tabId in this.props.tabs) {
      switch (this.props.tabs[tabId].type) {
        case 'notifications':
          buttons.push(
            <div
              className={
                tabId == this.props.activeTabId
                  ? 'pl-10 pr-10 g-10 font-weight-bold height-100 flex-row align-items-center border-right cursor-pointer tab-button-active'
                  : 'pl-10 pr-10 g-10 font-weight-bold height-100 flex-row align-items-center border-right cursor-pointer tab-button'
              }
              onClick={() => this.props.showTab(tabId)}
            >
              Уведомления
              {/*{this.state.countNotifications !== 0 ?*/}
              {/*<span className="badge red">{this.state.countNotifications}</span> : null}*/}
            </div>,
          );
          break;
        case 'object':
          buttons.push(
            <div
              onClick={() => this.props.showTab(tabId)}
              className={
                tabId == this.props.activeTabId
                  ? 'pl-10 pr-10 g-10 font-weight-bold border-right height-100 flex-row align-items-center cursor-pointer tab-button-active'
                  : 'pl-10 pr-10 g-10 font-weight-bold border-right height-100 flex-row align-items-center cursor-pointer tab-button'
              }
            >
              {this.props.tabs[tabId].objectNumber}
              <button
                className="btn-icon"
                title="Закрыть"
                onClick={event => {
                  event.stopPropagation();
                  this.props.closeTab(tabId);
                }}
              >
                <i className="fa-solid fa-close"></i>
              </button>
            </div>,
          );
          break;
      }
    }
    return buttons;
  };

  tabs = () => {
    let tabs = [];
    for (let tabId in this.props.tabs) {
      switch (this.props.tabs[tabId].type) {
        case 'notifications':
          tabs.push(
            <div
              className="position-absolute"
              style={{
                width: this.props.width - 2,
                height: this.props.height - 32,
                zIndex: this.props.tabs[tabId].zIndex,
              }}
            >
              <Notifications width={this.props.width - 2} height={this.props.height - 32} />
            </div>,
          );
          break;
        case 'object':
          tabs.push(
            <div
              className="position-absolute"
              style={{
                width: this.props.width - 2,
                height: this.props.height - 32,
                zIndex: this.props.tabs[tabId].zIndex,
              }}
            >
              <ObjectInfo
                width={this.props.width - 2}
                height={this.props.height - 32}
                objectNumber={this.props.tabs[tabId].objectNumber}
                events={this.props.events}
                eventId={this.props.tabs[tabId].eventId}
                alarmId={this.props.tabs[tabId].alarmId}
              />
            </div>,
          );
          break;
      }
    }
    return tabs;
  };

  render() {
    return (
      <div
        className="window-body-background-color window-body-text-color"
        style={{width: this.props.width - 2, height: this.props.height - 2}}
      >
        <div className="height-30-px flex-row align-items-center border-bottom window-header-background-color window-header-text-color">
          {this.buttons()}
        </div>
        {this.tabs()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tabs: state.tabsReducer.tabs,
    activeTabId: state.tabsReducer.activeTabId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showTab: tabId => dispatch(showTab(tabId)),
    closeTab: objectNumber => dispatch(closeTab(objectNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
