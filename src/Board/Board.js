import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

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
		fetch('http://localhost:3001/ldb.json')
			.then((res) => res.json())
			.then(({ data, meta }) => {
				this.setState({ data, meta })
			});
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
