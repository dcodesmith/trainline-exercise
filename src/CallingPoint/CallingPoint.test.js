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

describe('Given a CallingPoint Component', () => {
	describe('When rendered', () => {
    let component;
    let callingPointEl;
    let testProps = {};
		const expectedProps = { ...defaultProps };
      
		beforeEach(() => {
      const props = { ...defaultProps, ...testProps };

      component = shallow(<CallingPoint { ...props } />);
			callingPointEl = component.find('.calling-points__item');
		});

    afterEach(() => {
      testProps = {};
    });

		it('should render a scheduled time', () => {
			expect(callingPointEl.find('.calling-points__time').text().trim()).to.equal(expectedProps.scheduledAt);
		});

		it('should render a station name', () => {
			expect(callingPointEl.find('.calling-points__station').text().trim()).to.equal(expectedProps.station);
    });

    it('should render an estimated arrival time', () => {
			expect(callingPointEl.find('.calling-points__estimatedat').text().trim()).to.equal(expectedProps.estimatedAt);
    });

		describe('and the calling point is the origin station', () => {
      beforeAll(() => {
        testProps.isOrigin = true;
      });

      it('should have the class `origin`', () => {
        callingPointEl = component.find('.calling-points__item');

        expect(callingPointEl.hasClass('origin')).to.be.true;
        expect(callingPointEl.hasClass('destination')).to.be.false;
      });
		});

		describe('and the calling point is the destination station', () => {
      beforeAll(() => {
        testProps.isDestination = true;
      });

      it('should have the class `destination`', () => {
        callingPointEl = component.find('.calling-points__item');

        expect(callingPointEl.hasClass('destination')).to.be.true;
        expect(callingPointEl.hasClass('origin')).to.be.false;
      });
		});

		describe('and the calling point is the selected station', () => {
      beforeAll(() => {
        testProps.isSelected = true;
      });

      it('should have the class `selected`',() => {
        callingPointEl = component.find('.calling-points__item');

        expect(callingPointEl.hasClass('selected')).to.be.true;
      });
		});

		describe('and the train is at this station', () => {
      beforeAll(() => {
        testProps.isTrainHere = true;        
      });

      it('should have the class `train`',() => {
        callingPointEl = component.find('.calling-points__item');

        expect(callingPointEl.hasClass('train')).to.be.true;
      });
		});

		describe('and there is an estimated time', () => {
      let expectedText, estimatedAt = {};

      beforeAll(() => {
        estimatedAt = { estimatedAt: '10:00' };
      });

			describe('and the train has NOT arrived from the station', () => {
				beforeAll(() => {
					testProps = { hasDeparted: false, ...estimatedAt };
				});

				it('should contain the text `Exp. 10:00`',() => {
          expectedText = callingPointEl.find('.calling-points__estimatedat').text().trim();

					expect(expectedText).to.equal('Exp. 10:00');
				});
			});

			describe('and the train has departed from the station', () => {
				beforeAll(() => {
          testProps = { hasDeparted: true, ...estimatedAt };
				});

				it('should contain the text `Dept. 10:00`',() => {
          expectedText = callingPointEl.find('.calling-points__estimatedat').text().trim();

					expect(expectedText).to.equal('Dept. 10:00');
				});
			});
		});
	});
});
