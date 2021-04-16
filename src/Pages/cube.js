import React, { Component } from 'react';

class Cube extends Component {
  render() {
    return (
      <div className="shape">
        <div className="ft"><span /></div>
        <div className="rt"><span role="img" aria-label="rocket">🚀</span></div>
        <div className="bk"><span /></div>
        <div className="lt"><span role="img" aria-label="rocket">🚀</span></div>
        <div className="tp"><span /></div>
        <div className="bm"><span /></div>
      </div>
    );
  }
}

export default Cube;
