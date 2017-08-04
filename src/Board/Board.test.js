import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import Board from './Board.js';
import CallingPoint from '../CallingPoint';

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

describe('Given a Board Component', () => {
	let component, boardEl;

	describe('When rendered', () => {
		beforeEach(() => {
      component = shallow(<Board />, { lifecycleExperimental: true });
			boardEl = component.find('.board');
		});

		it('should render the component', () => {
      expect(boardEl.length).to.equal(1);
    });

    describe('and not data has been fetch', () => {
      it('should display a nice calming reasurring message', () => {
        expect(boardEl.find('span').text().trim())
          .to.equal('We are making sure we get you the right information. Bear with us ;)');
      });
    });

    describe('and data has been fetch', () => {
      beforeEach(() => {
        const { data, meta } = stateData;
        component.setState({ data, meta });
      });

      it('should render 4 CallingPoint components', () => {
        const expectedProps = Object.assign({}, stateData);
        const { data: { callingPoints } } = expectedProps;

        expect(component.find(CallingPoint).length).to.equal(callingPoints.length);
      });
    });
  });
});
