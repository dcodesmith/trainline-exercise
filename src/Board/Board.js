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

    console.log('Hey', options);
    
    Api
      .get({ params: options })
      .then(({ data }) => {
        console.log('asdasdasda');
        this.setState(data);
      })
      .catch((err) =>  console.log('err', err));
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
