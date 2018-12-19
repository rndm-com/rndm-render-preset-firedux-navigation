import { get } from 'lodash';
import React from 'react';
import { NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import addNavigationHelpers from 'react-navigation/src/addNavigationHelpers';
import { connect } from 'react-redux';

const createNavigator = (Element, routes, id = 'root') => {
  const { router } = Element;
  const routeName = Object.keys(routes)[0];
  const initial = router.getStateForAction(NavigationActions.navigate({ routeName }));
  const Navigator = ({ screenProps, dispatch, navigation }) => {
    if (!navigation) {
      dispatch({
        type: NavigationActions.INIT,
        id,
        state: initial,
        router,
      });
      return null;
    }
    return (
      <Element
        screenProps={screenProps}
        navigation={addNavigationHelpers({
          dispatch,
          state: navigation || initial,
          addListener: createReduxBoundAddListener('root'),
        })}
      />
    );
  };
  const mapStateToProps = state => {
    return ({
      navigation: get(state, `navigation.${id}`)
    });
  };
  const Connected = connect(mapStateToProps)(Navigator);
  return <Connected />
};

export default createNavigator;
