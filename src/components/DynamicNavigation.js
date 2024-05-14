import React from 'react';

class DynamicNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.content = React.createRef();
    this.first = React.createRef();
    this.second = React.createRef();
    this.third = React.createRef();
    this.fourth = React.createRef();
    this.state = {
      currentElement: 'divFirst',
      currentElements: ['divFirst'],
    };
  }

  componentDidMount() {
    this.content.current.addEventListener('scroll', this.currentVisibleElement);
    this.currentVisibleElement();
  }

  currentVisibleElement = () => {
    const scrollElements = ['divFirst', 'divSecond', 'divThird', 'divFourth'];
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

  //Если элемент пересёк верхнюю границу
  // currentVisibleElement = () => {
  //     console.log('currentVisibleElement()')
  //     const scrollElements = ['divFirst', 'divSecond', 'divThird', 'divFourth']
  //     let currentElement
  //     for (let i = 0; i < scrollElements.length; i++) {
  //         if (document.getElementById(scrollElements[i]).getBoundingClientRect().top <= this.content.current.getBoundingClientRect().top) {
  //             currentElement = scrollElements[i]
  //         }
  //     }
  //     this.setState({currentElement})
  // }

  scrollIntoView = currentElement => {
    document.getElementById(currentElement).scrollIntoView();
    this.setState({currentElement});
  };

  render() {
    return (
      <div>
        <button
          onClick={() => this.scrollIntoView('divFirst')}
          className={this.state.currentElements.includes('divFirst') ? 'btn btn-primary' : 'btn btn-default'}
        >
          1
        </button>
        <button
          onClick={() => this.scrollIntoView('divSecond')}
          className={this.state.currentElements.includes('divSecond') ? 'btn btn-primary' : 'btn btn-default'}
        >
          2
        </button>
        <button
          onClick={() => this.scrollIntoView('divThird')}
          className={this.state.currentElements.includes('divThird') ? 'btn btn-primary' : 'btn btn-default'}
        >
          3
        </button>
        <button
          onClick={() => this.scrollIntoView('divFourth')}
          className={this.state.currentElements.includes('divFourth') ? 'btn btn-primary' : 'btn btn-default'}
        >
          4
        </button>
        <div ref={this.content} style={{maxHeight: '500px', overflowY: 'scroll'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div id="divFirst" ref={this.first} style={{width: '200px', height: '400px', backgroundColor: 'red'}}></div>
            <div
              id="divSecond"
              ref={this.second}
              style={{width: '200px', height: '600px', backgroundColor: 'green'}}
            ></div>
            <div
              id="divThird"
              ref={this.third}
              style={{width: '200px', height: '600px', backgroundColor: 'blue'}}
            ></div>
            <div
              id="divFourth"
              ref={this.fourth}
              style={{width: '200px', height: '300px', backgroundColor: 'pink'}}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DynamicNavigation;
