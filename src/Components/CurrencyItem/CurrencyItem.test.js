import React from 'react';
import { shallow, mount } from 'enzyme';

import { CurrencyItem } from './index';
import { CurrencySelect } from '../CurrencySelect';

describe('CurrencyItem', () => {
  const fn = () => {};

  describe('Rendering', () => {
    it('should render with currency name', () => {
      const shallowWrapper = shallow(<CurrencyItem currencyType="GBP" onClick={fn} />);
      expect(shallowWrapper.html()).toEqual('<li class="CurrencyItem">GBP</li>');
    });
  });

});
