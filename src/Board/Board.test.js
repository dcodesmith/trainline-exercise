import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import Board from './Board.js';
import LoadingMessage from '../LoadingMessage';
import Itinerary from '../Itinerary';

let stateData = {
  'data': {
    'checkedAt': '10:56',
    'callingPoints': [
      {
        'hasDeparted': true,
        'isTrainHere': false,
        'station': 'Sevenoaks',
        'scheduledAt': '10:00',
        'estimatedAt': 'On time',
        'isOrigin': true,
        'isDestination': false
      },
      {
        'hasDeparted': true,
        'isTrainHere': false,
        'station': 'Bat & Ball',
        'scheduledAt': '10:03',
        'estimatedAt': 'On time',
        'isOrigin': false,
        'isDestination': false
      },
      {
        'hasDeparted': true,
        'isTrainHere': false,
        'station': 'Otford',
        'scheduledAt': '10:07',
        'estimatedAt': '10:10',
        'isOrigin': false,
        'isDestination': false
      },
      {
        'hasDeparted': false,
        'isTrainHere': false,
        'station': 'West Hampstead Thameslink',
        'scheduledAt': '11:23',
        'estimatedAt': '11:29',
        'isOrigin': false,
        'isDestination': true
      }
    ],
    'scheduledAt': '11:10',
    'operator': 'Thameslink'
  },
  'meta': {}
};

describe.skip('Given a Board Component', () => {
	let component, boardEl;

	describe('When rendered', () => {
		beforeEach(() => {
      component = shallow(<Board />, { lifecycleExperimental: true });
			boardEl = component.find('.board');
		});

		it('should render the component', () => {
      expect(boardEl.length).to.equal(1);
    });

    describe.skip('and not data has been fetched', () => {
      it('should render the LoadingMessage component', () => {
        expect(boardEl.find(LoadingMessage).length).to.equal(1)
      });
    });

    describe('and data has been fetched', () => {
      beforeEach(() => {
        const { data, meta } = stateData;
        component.setState(data);
      });

      it('should render a Itinerary component', () => {
        console.log(boardEl.debug());
        expect(boardEl.find(Itinerary).length).to.equal(1);
      });
    });
  });
});
