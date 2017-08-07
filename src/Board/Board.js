import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import createFragment from 'react-addons-create-fragment';

import './Board.css';

import Header from '../Header';
import CallingPoint from '../CallingPoint';
import LoadingMessage from '../LoadingMessage';

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

  renderHeader() {
    const { station: destination } = this.filterByKey('isDestination');
    const { station: origin } = this.filterByKey('isOrigin');
    const { operator } = this.state.data;

    // if (origin && destination && operator) {
    return (
      <Header origin={ origin } destination={ destination } operator={ operator } />
    );
    // }
  }

  filterByKey(key) {
    const { data: { callingPoints } } = this.state;

    return callingPoints.length && callingPoints.filter((item) => {
      return !!item[key];
    })[0];
  }

  render() {
    const { data: { callingPoints } } = this.state;
    const isFetching = !callingPoints.length;

    // const headerEl = this.renderHeader();
    // const callingPointsEls = this.renderCallingPoints();
    let content = <LoadingMessage />;

    if (!isFetching) {
      console.log(this.renderHeader());
      content = createFragment({
        header: this.renderHeader()
        // callingPoints: this.renderCallingPoints()
      });
    }

    return (
      <div className="board">
        {/* { !isFetching && this.renderHeader() }
				{ isFetching ? <LoadingMessage /> : this.renderCallingPoints() } */}
        { content }
			</div>
    );
  }
}

Board.displayName = 'Board';

export default Board;
