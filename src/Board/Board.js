import React, { Component } from 'react';
import queryString from 'query-string';

import Api from '../common/Api.js';

import './Board.css';

import LoadingMessage from '../LoadingMessage';
import Itinerary from '../Itinerary.js';

class Board extends Component {
  constructor() {
    super();

    this.state = {
			data: { callingPoints: [], operator: '' },
			meta: {}
    };
	}

	componentDidMount() {
    const options = queryString.parse(window.location.search);

    Api
      .get({ params: options })
      .then(({ data: { data }}) => this.setState({ data }));
	}

  render() {
    const { data } = this.state;
    const isFetching = !data.callingPoints.length;

    if (isFetching) {
      console.log('fetching....', data);
    } else {
      console.log('Done fetching!', data);
    }

    return (
      <div className="board">
				 { isFetching ? <LoadingMessage /> : <Itinerary data={ data } /> }
			</div>
    );
  }
}

Board.displayName = 'Board';

export default Board;
