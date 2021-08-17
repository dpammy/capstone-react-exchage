import React from 'react';
import { string, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import './CurrencySelect.css';

// Actions
import { toggleCurrencyMenu } from '../../redux/actions';

// Assets
import downArrow from './arrow-down.svg';

// Components
import CurrencyList from '../CurrencyList';

export const CurrencySelect = ({ currency, position, alternative, toggleCurrencyMenu }) => {
  return (
    <>
      <div className="CurrencySelect__header" onClick={() => toggleCurrencyMenu(position)}>
        <h4>{currency[position]}</h4>
        <img className="CurrencySelect__arrow" src={downArrow} alt="Toggle currency menu" />
      </div>
      <CurrencyList position={position} alternative={alternative} />
    </>
  );
};

CurrencySelect.propTypes = {
  currency: shape({
    from: string.isRequired,
    to: string.isRequired,
  }).isRequired,
  position: string.isRequired,
  alternative: string.isRequired,
  toggleCurrencyMenu: func.isRequired
};

const mapStateToProps = state => ({
  currency: state.currency
});

const mapDispatchToProps = { toggleCurrencyMenu };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
