import { use } from '@rndm/render';
import components from './components/index';
import * as firedux from '@rndm/render-preset-firedux';
import * as navigation from '@rndm/render-plugin-react-navigation';

const plugin = {
  key: 'firedux-navigation',
  components,
};

use(plugin);

export {
  firedux,
  navigation,
};

export default plugin;
