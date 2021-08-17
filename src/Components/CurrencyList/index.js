import React from 'react';
import { string, bool, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './CurrencyList.css';

// Components
import CurrencyItem from '../CurrencyItem';

const CurrencyList = ({ currencyList, menuOpen, position, alternative }) => {
  const menuClasses = classnames("CurrencyList__menu", {
    "CurrencyList__menu--open": menuOpen[position]
  });
  return (
    <ul className={menuClasses}>
      {currencyList.map((currencyType, i) => (
        <CurrencyItem
          key={`${currencyType}_${i}`}
          position={position}
          alternative={alternative}
          currencyType={currencyType}
        />
      ))}
    </ul>
  );
}

CurrencyList.propTypes = {
  position: string.isRequired,
  alternative: string.isRequired,
  currencyList: arrayOf(string).isRequired,
  menuOpen: shape({
    from: bool,
    to: bool
  })
};

CurrencyList.defaultProps = {
  menuOpen: {
    from: false,
    to: false
  }
};

const mapStateToProps = ({ currency }) => {
  return {
    currencyList: currency.types.list,
    menuOpen: currency.menuOpen
  };
};

export default connect(mapStateToProps)(CurrencyList);
