import React from 'react';

class Pagination extends React.Component {
  next = () => {
    if (this.props.page !== this.props.count) {
      this.props.selectPage(this.props.page + 1);
    }
  };

  previous = () => {
    if (this.props.page !== 1) {
      this.props.selectPage(this.props.page - 1);
    }
  };

  pagination = () => {
    let intermediate = Math.floor(this.props.size / 2) + 1;
    let previousCount = this.props.page - 1;
    let nextCount = this.props.count - this.props.page;

    let result = [];
    if (this.props.count <= this.props.size) {
      for (let i = 1; i <= this.props.count; i++) {
        if (i === this.props.page) {
          //Выделить цветом
          result.push(
            <button className="button border-none" onClick={() => this.props.selectPage(i)}>
              {String(i)}
            </button>,
          );
        } else {
          result.push(
            <button className="button border-none" onClick={() => this.props.selectPage(i)}>
              {String(i)}
            </button>,
          );
        }
      }
    } else {
      if (this.props.page <= intermediate) {
        for (let i = 1; i < this.props.size - 1; i++) {
          if (i === this.props.page) {
            //Выделить цветом
            result.push(
              <button className="button border-none" onClick={() => this.props.selectPage(i)}>
                {String(i)}
              </button>,
            );
          } else {
            result.push(
              <button className="button border-none" onClick={() => this.props.selectPage(i)}>
                {String(i)}
              </button>,
            );
          }
        }
        result.push(<button className="button border-none">{'...'}</button>);
        result.push(
          <button className="button border-none" onClick={() => this.props.selectPage(this.props.count)}>
            {String(this.props.count)}
          </button>,
        );
      } else if (previousCount >= intermediate && nextCount >= intermediate) {
        result.push(
          <button className="button border-none" onClick={() => this.props.selectPage(1)}>
            {'1'}
          </button>,
        );
        result.push(<button className="button border-none">{'...'}</button>);
        for (let i = this.props.page - 2; i < this.props.page + 3; i++) {
          if (i === this.props.page) {
            //Выделить цветом
            result.push(
              <button className="button border-none" onClick={() => this.props.selectPage(i)}>
                {String(i)}
              </button>,
            );
          } else {
            result.push(
              <button className="button border-none" onClick={() => this.props.selectPage(i)}>
                {String(i)}
              </button>,
            );
          }
        }
        result.push(<button className="button border-none">{'...'}</button>);
        result.push(
          <button className="button border-none" onClick={() => this.props.selectPage(this.props.count)}>
            {String(this.props.count)}
          </button>,
        );
      } else if (nextCount < intermediate) {
        result.push(
          <button className="button border-none" onClick={() => this.props.selectPage(1)}>
            {'1'}
          </button>,
        );
        result.push(<button className="button border-none">{'...'}</button>);
        for (let i = this.props.count - this.props.size + 3; i <= this.props.count; i++) {
          if (i === this.props.page) {
            //Выделить цветом
            result.push(
              <button className="button border-none" onClick={() => this.props.selectPage(i)}>
                {String(i)}
              </button>,
            );
          } else {
            result.push(
              <button className="button border-none" onClick={() => this.props.selectPage(i)}>
                {String(i)}
              </button>,
            );
          }
        }
      }
    }
    return result;
  };

  render() {
    return (
      <div className="flex-row align-items-center">
        {/*<div className="flex-row">*/}
        <button className="button-icon-without-border" onClick={() => this.props.selectPage(1)}>
          <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="m16.9 17.3-4.6-4.6q-.15-.15-.212-.325-.063-.175-.063-.375t.063-.375q.062-.175.212-.325l4.6-4.6q.275-.275.687-.288Q18 6.4 18.3 6.7q.275.275.275.7 0 .425-.275.7L14.425 12l3.875 3.9q.275.275.287.687.013.413-.287.713-.275.275-.7.275-.425 0-.7-.275Zm-6.6 0-4.6-4.6q-.15-.15-.212-.325-.063-.175-.063-.375t.063-.375q.062-.175.212-.325l4.6-4.6q.275-.275.688-.288.412-.012.712.288.275.275.275.7 0 .425-.275.7L7.825 12l3.875 3.9q.275.275.288.687Q12 17 11.7 17.3q-.275.275-.7.275-.425 0-.7-.275Z" />
          </svg>
        </button>
        <button className="button-icon-without-border" onClick={this.previous}>
          <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="m13.3 17.3-4.6-4.6q-.15-.15-.212-.325-.063-.175-.063-.375t.063-.375q.062-.175.212-.325l4.6-4.6q.275-.275.7-.275.425 0 .7.275.275.275.275.7 0 .425-.275.7L10.8 12l3.9 3.9q.275.275.275.7 0 .425-.275.7-.275.275-.7.275-.425 0-.7-.275Z" />
          </svg>
        </button>
        {this.pagination()}
        <button className="button-icon-without-border" onClick={this.next}>
          <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8.7 17.3q-.275-.275-.275-.7 0-.425.275-.7l3.9-3.9-3.9-3.9q-.275-.275-.275-.7 0-.425.275-.7.275-.275.7-.275.425 0 .7.275l4.6 4.6q.15.15.213.325.062.175.062.375t-.062.375q-.063.175-.213.325l-4.6 4.6q-.275.275-.7.275-.425 0-.7-.275Z" />
          </svg>
        </button>
        <button className="button-icon-without-border" onClick={() => this.props.selectPage(this.props.count)}>
          <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.7 17.3q-.275-.275-.275-.7 0-.425.275-.7L9.575 12 5.7 8.1q-.275-.275-.287-.688Q5.4 7 5.7 6.7q.275-.275.7-.275.425 0 .7.275l4.6 4.6q.15.15.213.325.062.175.062.375t-.062.375q-.063.175-.213.325l-4.6 4.6q-.275.275-.688.287Q6 17.6 5.7 17.3Zm6.6 0q-.275-.275-.275-.7 0-.425.275-.7l3.875-3.9L12.3 8.1q-.275-.275-.288-.688Q12 7 12.3 6.7q.275-.275.7-.275.425 0 .7.275l4.6 4.6q.15.15.212.325.063.175.063.375t-.063.375q-.062.175-.212.325l-4.6 4.6q-.275.275-.687.287-.413.013-.713-.287Z" />
          </svg>
        </button>
        {/*</div>*/}
      </div>
    );
  }
}

export default Pagination;
