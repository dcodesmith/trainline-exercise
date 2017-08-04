import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import CallingPoint from './CallingPoint.js';

let defaultProps = {
	estimatedAt: 'On time',
	hasDeparted: true,
	isDestination: false,
	isTrainHere: false,
	isOrigin: false,
	scheduledAt: '10:00',
	station: 'Sevenoaks'
};
let testProps = {};

const setProps = (newProps) => {
  return Object.assign({}, defaultProps, newProps);
}

describe('Given a CallingPoints Component', () => {
	let component, callingPointEl;

	describe('When rendered', () => {
		beforeEach(() => {
      testProps = Object.assign({}, defaultProps);
      component = shallow(<CallingPoint { ...testProps } />);
			callingPointEl = component.find('.calling-points__item');
		});

		it('should render the component', () => {
			const expectedProps = Object.assign({}, defaultProps);

			expect(callingPointEl.length).to.equal(1);

			expect(callingPointEl.find('.calling-points__time').text().trim()).to.equal(expectedProps.scheduledAt);
			expect(callingPointEl.find('.calling-points__station').text().trim()).to.equal(expectedProps.station);
			expect(callingPointEl.find('.calling-points__estimatedat').text().trim()).to.equal(expectedProps.estimatedAt);
		});

		describe('and the calling point is the origin station', () => {
				beforeEach(() => {
						testProps = setProps({ isOrigin: true });
						component.setProps(testProps);
				});

				afterEach(() => {
						testProps = {};
				});

				it('should have the class `origin`', () => {
			callingPointEl = component.find('.calling-points__item');
						
						expect(callingPointEl.hasClass('origin')).to.be.true;
						expect(callingPointEl.hasClass('destination')).to.be.false;
				});
		});

		describe('and the calling point is the destination station', () => {
				beforeEach(() => {
						testProps = setProps({ isDestination: true });
						component.setProps(testProps);
				});

				afterEach(() => {
						testProps = {};
				});

				it('should have the class `destination`', () => {
			callingPointEl = component.find('.calling-points__item');
						
						expect(callingPointEl.hasClass('destination')).to.be.true;
						expect(callingPointEl.hasClass('origin')).to.be.false;
				});
		});

		describe('and the calling point is the selected station', () => {
				beforeEach(() => {
						testProps = setProps({ isSelected: true });
						component.setProps(testProps);
				});

				afterEach(() => {
						testProps = {};
				});

				it('should have the class `selected`',() => {
			callingPointEl = component.find('.calling-points__item');
						
						expect(callingPointEl.hasClass('selected')).to.be.true;
				});
		});

		describe('and the train is at this station', () => {
				beforeEach(() => {
						testProps = setProps({ isTrainHere: true });
						component.setProps(testProps);
				});

				afterEach(() => {
						testProps = {};
				});

				it('should have the class `train`',() => {
			callingPointEl = component.find('.calling-points__item');
						
						expect(callingPointEl.hasClass('train')).to.be.true;
				});
		});

		describe('and there is an estimated time', () => {
			let expectedText;
			const estimatedAt = { estimatedAt: '10:00' };                

			afterEach(() => {
				testProps = {};
			});

			describe('and the train has departed from the station', () => {
				beforeEach(() => {
					testProps = setProps({ hasDeparted: true, ...estimatedAt });
					component.setProps(testProps);
					callingPointEl = component.find('.calling-points__item');
					expectedText = callingPointEl.find('.calling-points__estimatedat').text().trim();     
				});

				it('should contain the text `Dept. 10:00`',() => {              
					expect(expectedText).to.equal('Dept. 10:00');
				});
			});

			describe('and the train has NOT arrived from the station', () => {
				beforeEach(() => {
					testProps = setProps({ hasDeparted: false, ...estimatedAt });
					component.setProps(testProps);
					callingPointEl = component.find('.calling-points__item');
					expectedText = callingPointEl.find('.calling-points__estimatedat').text().trim();
				});

				it('should contain the text `Exp. 10:00`',() => {                    
					expect(expectedText).to.equal('Exp. 10:00');
				});
			});
		});
	});
});