import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import Itinerary from './Itinerary.js';
import Header from '../Header';
import CallingPoint from '../CallingPoint';

let testProps = {
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
  'operator': 'Thameslink'
};

describe.only('Given a Itinerary Component', () => {
	let component, itineraryEl;

	describe('When rendered', () => {
		beforeEach(() => {
      component = shallow(<Itinerary { ...testProps } />);
      itineraryEl = component.find('div');
		});

		it('should render the component', () => {
			expect(itineraryEl.length).to.equal(1);
    });

    it('should render a Header component with the appropriate props', () => {
      const headerComponent = itineraryEl.find(Header);

      expect(headerComponent.length).to.equal(1);

      expect(headerComponent.prop('origin')).to.equal(testProps.callingPoints[0].station);
      expect(headerComponent.prop('destination')).to.equal(testProps.callingPoints[3].station);
      expect(headerComponent.prop('operator')).to.equal(testProps.operator);
    });

    it('should render 4 CallingPoint component with the appropriate props', () => {
      const callingPointComponents = itineraryEl.find(CallingPoint);

      expect(callingPointComponents.length).to.equal(testProps.callingPoints.length);
      callingPointComponents.forEach((callingPointComponent, index) => {
        expect(callingPointComponent.props()).to.eql(testProps.callingPoints[index]);
      });
    });
	});
});
