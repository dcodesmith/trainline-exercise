import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CallingPoint.css';

const CallingPoint = (props) => {
	const {
		hasDeparted,
		isTrainHere,
		station,
		scheduledAt,
		estimatedAt,
		isOrigin,
		isSelected,
		isDestination
	} = props;

	const getEstimateTime = () => {
		if (estimatedAt === 'On time') {
			return estimatedAt;
		}

		if (hasDeparted) {
			return `Dept. ${ estimatedAt }`
		}

		return `Exp. ${ estimatedAt }`
	}

	const classes = classNames('calling-points__item', {
		'destination': isDestination,
		'origin': isOrigin,
		'selected': isSelected,
		'expected': !hasDeparted,
		'train': isTrainHere
	});

	return (
		<li className={ classes }>
			<div className="calling-points__time"> { scheduledAt } </div>
			<span className="divider"/>
			<div className="calling-points__description">
				<span className="calling-points__station"> { station } </span>
				<span className="calling-points__estimatedat">
					{ getEstimateTime() }
				</span>
			</div>
		</li>
	);
}

CallingPoint.displayName = 'CallingPoint';
CallingPoint.propTypes = {
	hasDeparted: PropTypes.bool.isRequired,
	isTrainHere: PropTypes.bool.isRequired,
	station: PropTypes.string.isRequired,
	scheduledAt: PropTypes.string.isRequired,
	estimatedAt: PropTypes.string.isRequired,
	isOrigin: PropTypes.bool.isRequired,
	isSelected: PropTypes.bool,
	isDestination: PropTypes.bool.isRequired
};

export default CallingPoint;
