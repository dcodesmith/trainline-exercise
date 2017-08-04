import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

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

  render() {
		const loadingMessage = this.getLoadingMessage();
		const callingPoints = this.renderCallingPoints();
		const isFetching = this.state.data.callingPoints.length;

    return (
			<div className="board">
				{ !isFetching ? loadingMessage : callingPoints }
			</div>
    );
  }
}


Board.displayName = 'Board';

export default Board;
