import React, { Component } from 'react';
import { string, bool, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import './Converter.css';

// Actions
import { exchangeRate, currencyList } from '../../redux/actions';

// Components
import CurrencyBox from '../CurrencyBox';
import CurrencyReverseButton from '../CurrencyReverseButton';

export class Converter extends Component {
  componentDidMount() {
    const { exchangeRate, currencyList, currency } = this.props;
    exchangeRate({
      from: currency.from,
      to: currency.to
    });
    currencyList();
  }

  render() {
    const { currency: { isReversed } } = this.props;
    return (
      <div className="Converter">
        <h1 className="Converter__header">Currency Converter</h1>
        <div className="Converter__input-container">
          <CurrencyBox position={isReversed ? "from" : "to"} alternative={isReversed ? "to" : "from"} />
          <CurrencyReverseButton />
          <CurrencyBox position={isReversed ? "to" : "from"} alternative={isReversed ? "from" : "to"} />
        </div>
      </div>
    );
  }
};

Converter.propTypes = {
  currency: shape({
    from: string.isRequired,
    to: string.isRequired,
    isReversed: bool.isRequired
  }).isRequired,
  exchangeRate: func.isRequired,
  currencyList: func.isRequired
};

const mapStateToProps = ({ currency }) => ({ currency });

const mapDispatchToProps = { exchangeRate, currencyList };

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
