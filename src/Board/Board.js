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

  render() {
		const callingPoints = this.renderCallingPoints();

    return (
			<div>
				{ callingPoints }
			</div>
    );
  }
}


Board.displayName = 'Board';

export default Board;
