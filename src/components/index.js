import { noop, get } from 'lodash';
import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { connect } from 'react-redux';
import { convertRoutesToComponents }  from 'rndm-render-plugin-react-navigation';
import createNavigator from '../utils/createNavigator';

const navigators = {
  StackNavigator: createStackNavigator,
  BottomTabNavigator: createBottomTabNavigator,
  TopTabNavigator: createMaterialTopTabNavigator,
  DrawerNavigator: createDrawerNavigator,
  SwitchNavigator: createSwitchNavigator,
};

const components = Object.keys(navigators).map(type => ({
  type,
  value: ({ routes, options, id }) => (
    createNavigator(navigators[type](convertRoutesToComponents(routes), options), routes, id)
  ),
}));

export default components;
