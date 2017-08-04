import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import './Board.css';

import CallingPoint from '../CallingPoint';

class Board extends Component {
  constructor() {
    super();

    this.state = {
			data: { callingPoints: [] },
			meta: {}
    };
	}

	componentDidMount() {
		const options = queryString.parse(window.location.search);

		axios.get('http://localhost:3001/ldb.json', { params: options })
			.then(({ data: { data, meta } }) => {
				this.setState({ data, meta })
			}).catch((err) => {});
	}

	renderCallingPoints() {
		const { data: { callingPoints } } = this.state;

		const callPointsList = callingPoints.map((props, index) => <CallingPoint { ...props } key={index} />);

		return (
			<ul className="calling-points">
				{ callPointsList }
			</ul>
		);
	}

	getLoadingMessage() {
		return (
			<span> We are making sure we get you the right information. Bear with us ;) </span>
		);
	}

  getHeader() {
    const { station: destination } = this.filterByKey('isDestination');
    const { station: origin } = this.filterByKey('isOrigin');

    return (
      <header className="board__header">
        { origin } <span className="to">to</span> { destination }
      </header>
    );
  }

  filterByKey(key) {
    const { data: { callingPoints } } = this.state;

    return callingPoints.length && callingPoints.filter((item) => {
      return !!item[key];
    })[0];
  }

  render() {
		const loadingMessage = this.getLoadingMessage();
    const callingPointsEls = this.renderCallingPoints();
    const headerEl = this.getHeader();
    const { data: { callingPoints } } = this.state;
    const isFetching = !callingPoints.length;

    return (
      <div className="board">
        { !isFetching && headerEl }
				{ isFetching ? loadingMessage : callingPointsEls }
			</div>
    );
  }
}


Board.displayName = 'Board';

export default Board;
