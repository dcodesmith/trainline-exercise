import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import Header from './Header.js';

const testProps = {
  origin: 'Ojodu Berger',
  destination: 'Sagamu',
  operator: 'NURTW'
};

describe('Given a Header Component', () => {
	let component;

	describe('When rendered', () => {
		beforeEach(() => {
      component = shallow(<Header { ...testProps } />);
		});

		it('should render the component', () => {
      expect(component.length).to.equal(1);
    });

		it('should display `Ojodu Berger` and `Sagamu` as origin and destination', () => {
      expect(component.find('.board__origindestination').text().trim()).to.equal('Ojodu Berger to Sagamu');
    });

		it('should display `NURTW` as the operator', () => {
      expect(component.find('.board__operator').text().trim()).to.equal('Operated by NURTW');
    });
  });
});
