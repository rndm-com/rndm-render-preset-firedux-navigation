const files = {
  folders: {
    middleware: {
      files: [
        {
          string: `import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => (
    state.navigation
  ),
);

export default middleware;
`,
          filename: 'navigation.js',
        },
      ]
    },
    reducers: {
      files: [
        {
          string: `import { NavigationActions } from 'react-navigation';
import { get } from 'lodash';

const reducer = (state = {}, { type = '', ...action } = {}) => {

  if(type.startsWith('Navigation/')) {
    const { id = 'root' } = action;
    switch (type) {
      case NavigationActions.INIT:
        return {
          ...state,
          routers: {
            [id]: action.router,
          },
          [id]: {
            ...action.state,
          },
        };
      default:
        const router = get(state, \`routers.$\{id}\`);
        if (!router) return state;
        const output = router.getStateForAction({ type, ...action.value });
        return {
          ...state,
          [id]: {
            ...output,
          },
        };
    }
  }

  return state;
};

export default reducer;
`,
          filename: 'navigation.js'
        }
      ]
    }
  }
};

module.exports = files;
