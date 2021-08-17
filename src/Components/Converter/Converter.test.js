import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Converter from './index';

const initialState = { };
const mockStore = configureStore();
let wrapper;
let store;

beforeEach(() => {
  store = mockStore(initialState);
  wrapper = shallow(<Converter store={store} />);
});

describe('Converter', () => {
  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
