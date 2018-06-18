import React, { Component } from 'react';
import queryString from 'query-string';

import Api from '../common/Api.js';

import './Board.css';

import LoadingMessage from '../LoadingMessage';
import Itinerary from '../Itinerary';

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
      .then(({ data }) => {
        this.setState(data);
      })
      .catch((error) =>  console.log('err', error));
	}

  render() {
    const { data } = this.state;
    const isFetching = !data.callingPoints.length;

    return (
      <div className="board">
				{ isFetching ? <LoadingMessage /> : <Itinerary { ...data } /> }
			</div>
    );
  }
}

Board.displayName = 'Board';

export default Board;
