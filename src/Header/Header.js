import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

const Header = ({ origin, destination, operator }) => (
  <header className="board__header">
    <div className="board__origindestination"> { origin } <span className="to">to</span> { destination } </div>
    <div className="board__operator">Operated by { this.state.data.operator }</div>
  </header>
);

Header.displayName = 'Header';
Header.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  operator: PropTypes.string.isRequired
};

export default Header;
