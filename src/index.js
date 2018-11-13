import { use } from '@rndm/render';
import components from './components/index';

const plugin = {
  key: 'firedux-navigation',
  components,
};

use(plugin);

export default plugin;
