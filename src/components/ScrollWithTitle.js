import {Component, createRef} from 'react';
import '../styles/styles.scss';

class ScrollWithTitle extends Component {
  constructor(props) {
    super(props);
    this.content = createRef();
    this.state = {
      currentElements: [],
    };
  }

  componentDidMount() {
    this.content.current.addEventListener('scroll', this.currentVisibleElement);
  }

  scrollIntoView = currentElement => {
    document.getElementById(currentElement).scrollIntoView();
    this.setState({currentElement});
  };

  currentVisibleElement = () => {
    const scrollElements = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
    let currentElements = [];
    for (let i = 0; i < scrollElements.length; i++) {
      if (
        (document.getElementById(scrollElements[i]).getBoundingClientRect().top >=
          this.content.current.getBoundingClientRect().top &&
          document.getElementById(scrollElements[i]).getBoundingClientRect().top <
            this.content.current.getBoundingClientRect().bottom) ||
        (document.getElementById(scrollElements[i]).getBoundingClientRect().bottom >
          this.content.current.getBoundingClientRect().top &&
          document.getElementById(scrollElements[i]).getBoundingClientRect().bottom <=
            this.content.current.getBoundingClientRect().bottom) ||
        (document.getElementById(scrollElements[i]).getBoundingClientRect().top <=
          this.content.current.getBoundingClientRect().top &&
          document.getElementById(scrollElements[i]).getBoundingClientRect().bottom >=
            this.content.current.getBoundingClientRect().bottom)
      ) {
        currentElements.push(scrollElements[i]);
      }
    }
    this.setState({currentElements});
  };

  render() {
    return (
      <div className="flex-row body-height width-100 center g-10">
        <div className="flex-column mt-10">
          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('1') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('1')}>
              1
            </button>
          </div>
          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('2') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('2')}>
              2
            </button>
          </div>
          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('3') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('3')}>
              3
            </button>
          </div>

          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('4') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('4')}>
              4
            </button>
          </div>

          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('5') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('5')}>
              5
            </button>
          </div>
          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('6') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('6')}>
              6
            </button>
          </div>
          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('7') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('7')}>
              7
            </button>
          </div>
          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('8') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('8')}>
              8
            </button>
          </div>
          <div className="flex-row">
            <div style={{width: '3px'}} className={this.state.currentElements.includes('9') && 'menu-btn-active'}></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('9')}>
              9
            </button>
          </div>
          <div className="flex-row">
            <div
              style={{width: '3px'}}
              className={this.state.currentElements.includes('10') && 'menu-btn-active'}
            ></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('10')}>
              10
            </button>
          </div>
          <div className="flex-row">
            <div
              style={{width: '3px'}}
              className={this.state.currentElements.includes('10') && 'menu-btn-active'}
            ></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('10')}>
              11
            </button>
          </div>
          <div className="flex-row">
            <div
              style={{width: '3px'}}
              className={this.state.currentElements.includes('11') && 'menu-btn-active'}
            ></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('11')}>
              12
            </button>
          </div>
          <div className="flex-row">
            <div
              style={{width: '3px'}}
              className={this.state.currentElements.includes('12') && 'menu-btn-active'}
            ></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('12')}>
              13
            </button>
          </div>
          <div className="flex-row">
            <div
              style={{width: '3px'}}
              className={this.state.currentElements.includes('13') && 'menu-btn-active'}
            ></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('13')}>
              14
            </button>
          </div>
          <div className="flex-row">
            <div
              style={{width: '3px'}}
              className={this.state.currentElements.includes('14') && 'menu-btn-active'}
            ></div>
            <button className="menu-btn width-100" onClick={() => this.scrollIntoView('14')}>
              15
            </button>
          </div>
        </div>

        <div
          ref={this.content}
          className="height-100 width-980-px overflow-y-auto g-10 mt-10 pr-10"
          style={{height: 'calc(100% - 20px)'}}
        >
          <div id="1">
            <div className="flex-column window-body-background-color window-body-text-color height-100 white border-box border mb-10">
              <div className="height-30-px flex-row space-between align-items-center window-header-background-color window-header-text-color border-bottom">
                <div className="ml-10 font-weight-bold">Приём сообщений</div>
                <div className="height-100 border-left">
                  <button className="custom-btn custom-btn-green min-width-100-px height-100">Кнопка</button>
                </div>
              </div>
              <div className="flex-column p-10 g-10"></div>
            </div>
          </div>
          <div id="2"></div>
          <div id="3"></div>
          <div id="4"></div>
          <div id="5"></div>
          <div id="6"></div>
          <div id="7"></div>
          <div id="8"></div>
          <div id="9"></div>
          <div id="10"></div>
          <div id="11"></div>
          <div id="12"></div>
          <div id="13"></div>
          <div id="14"></div>
          <div id="15"></div>
        </div>
      </div>
    );
  }
}

export default ScrollWithTitle;
