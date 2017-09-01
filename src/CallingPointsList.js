import React from 'react';
import PropTypes from 'prop-types';

import CallingPoint from '../CallingPoint';

const CallingPointsList = (callingPoints) => (
  <ul className="calling-points">
    { callingPoints.map((props, index) => <CallingPoint { ...props } key={ index } />) }
  </ul>
);

CallingPointsList.displayName = 'CallingPointsList';
CallingPointsList.propTypes = {
  callingPoints: PropTypes.arrayOf(PropTypes.shape({
    hasDeparted: PropTypes.bool.isRequired,
    isTrainHere: PropTypes.bool.isRequired,
    station: PropTypes.string.isRequired,
    scheduledAt: PropTypes.string.isRequired,
    estimatedAt: PropTypes.string.isRequired,
    isOrigin: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool,
    isDestination: PropTypes.bool.isRequired
   }))
};

export default CallingPointsList;
