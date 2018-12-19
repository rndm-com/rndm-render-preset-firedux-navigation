# RNDM Render Preset: Firedux Navigation

## About

This preset provides functionality for [RNDM Render package](https://github.com/rndm-com/rndm-render) for combined integrations of Firebase and Redux (Firedux!) as well as React Navigation.

It includes the following packages:

- [@rndm/render-preset-firedux](https://github.com/rndm-com/rndm-render-preset-firedux)
- [@rndm/render-plugin-react-navigation](https://github.com/rndm-com/rndm-render-plugin-react-navigation)

## Installation

If you have not already done so, then please ensure you have installed the [RNDM Render](https://github.com/rndm-com/rndm-render) package.

### From NPM

```sh
npm install --save @rndm/render-preset-firedux-navigation
```

### Post Installation

In order to allow this plugin to work, it must first be included in your project. You can do this inside your main index file:

```javascript
import '@rndm/render-preset-firedux-navigation';
```

## Usage

### Components

The components included within this plugin make use of the 'create...()' functions but are named after the type of Navigator generated. These are:

- StackNavigator
- BottomTabNavigator
- TopTabNavigator
- DrawerNavigator
- SwitchNavigator

These Navigators are comprised of different Screens, which take the key of their name as the route name.

The difference from the standard React Navigation Plugin is that the state of the navigation stack is managed within the custom redux implementation created with your redux instance.

**Example**

```javascript
{
    type: 'firedux-navigation.DrawerNavigator',
    props: {
        routes: {
            Screen: {
                type: 'react-native.View',
                props: {
                    style: {
                        flex: 1,
                        backgroundColor: 'red',,
                    },
                },
            },
        },
    },
}

```

In the example above, you can see that a single screen is provided to a DrawerNavigator, which will take up the full height of the view and will appear red.

Since the state is managed by your own Redux Store, you can build out full Navigation history.

**Example**

```json
{
  "type": "firedux-navigation.StackNavigator",
  "props": {
    "routes": {
      "Screen": {
        "type": "react-native.View",
        "props": {
          "style": {
            "width": 100,
            "height": 100,
            "backgroundColor": "yellow"
          },
          "children": {
            "type": "react-native.TouchableOpacity",
            "props": {
              "children": {
                "type": "react-native.Text",
                "props": {
                  "children": "Test"
                }
              },
              "middleware": [
                {
                  "middleware": "redux.connect",
                  "args": [
                    null,
                    [
                      {
                        "prop": "onPress",
                        "action": {
                          "type": "Navigation/PUSH",
                          "value": {
                            "routeName": "Other"
                          }
                        }
                      }
                    ]
                  ]
                }
              ]
            }
          }
        }
      },
      "Other": {
        "type": "react-native.View",
        "props": {
          "style": {
            "width": 100,
            "height": 100,
            "backgroundColor": "orange"
          },
          "children": {
            "type": "react-native.TouchableOpacity",
            "props": {
              "children": {
                "type": "react-native.Text",
                "props": {
                  "children": "Test"
                }
              },
              "middleware": [
                {
                  "middleware": "redux.connect",
                  "args": [
                    null,
                    [
                      {
                        "prop": "onPress",
                        "action": {
                          "type": "Navigation/PUSH",
                          "value": {
                            "routeName": "Screen"
                          }
                        }
                      }
                    ]
                  ]
                }
              ]
            }
          }
        }
      }
    },
    "id": "root"
  }
}
```

#### Examples

Full examples can be found in the example library found in this project.

https://github.com/rndm-com/rndm-render-preset-firedux-navigation/tree/master/examples


## CLI

In addition to the files created by the [Redux Plugin](https://github.com/rndm-com/rndm-render-plugin-redux), this CLI will create additional files and attempt to integrate into the existing Redux setup.

In order to run this, you can call the following command line script:

```sh
rndm-render-preset-firedux-navigation init
```

The files it will create will be as below. Should you need to adapt the code or have an existing Redux integration, please cherry pick the items you require from these below setup:

src/app/middleware/navigation.js

```javascript
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => (
    state.navigation
  ),
);

export default middleware;
```

src/app/redux/reducers/navigation.js

```javascript
import { NavigationActions } from 'react-navigation';
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
        const router = get(state, `routers.${id}`);
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
```

These will then need to be included in your middleware array and reducers object.
