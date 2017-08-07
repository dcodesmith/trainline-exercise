import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import Header from './Header';
import CallingPoint from './CallingPoint';

const Itinerary = ({ callingPoints = [], operator = '' }) => {
  console.log('Afees', callingPoints, operator);

  const { station: destination } = find(callingPoints, 'isDestination');
  const { station: origin } = find(callingPoints, 'isOrigin');

	const callPointsList = callingPoints.map((props, index) => <CallingPoint { ...props } key={ index } />);

	return (
    <div>
      <Header origin={ origin } destination={ destination } operator={ operator } />
      <ul className="calling-points">
        { callPointsList }
      </ul>
    </div>
	);
}

Itinerary.displayName = 'Itinerary';
Itinerary.propTypes = {
  callingPoints: PropTypes.arrayOf(PropTypes.shape({
    hasDeparted: PropTypes.bool.isRequired,
    isTrainHere: PropTypes.bool.isRequired,
    station: PropTypes.string.isRequired,
    scheduledAt: PropTypes.string.isRequired,
    estimatedAt: PropTypes.string.isRequired,
    isOrigin: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool,
    isDestination: PropTypes.bool.isRequired
   })),
  operator: PropTypes.string
};

export default Itinerary;
