import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import './CurrencyItem.css';

// Actions
import { currencyChange, closeCurrencyMenu } from '../../redux/actions';

export class CurrencyItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      currencyChange,
      closeCurrencyMenu,
      currencyType,
      position,
      alternative
    } = this.props;
    currencyChange(currencyType, position, alternative);
    closeCurrencyMenu(position);
  }

  render() {
    const { currencyType } = this.props;
    return (
      <li
        className="CurrencyItem"
        onClick={this.handleClick}
      >
        {currencyType}
      </li>
    );
  }
};

CurrencyItem.propTypes = {
  currencyType: string.isRequired,
  currencyChange: func.isRequired,
  position: string.isRequired,
  alternative: string.isRequired
};

const mapDispatchToProps = { currencyChange, closeCurrencyMenu };

export default connect(() => ({}), mapDispatchToProps)(CurrencyItem);
