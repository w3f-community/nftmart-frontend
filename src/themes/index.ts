// theme.js
import { extendTheme, ThemeOverride } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

// Foundational style overrides
import borders from './foundations/borders';

import colors from './colors';
// Component style overrides
import Button from './components/button';
import Link from './components/link';
import Popover from './components/popover';

const overrides: ThemeOverride = {
  colors,
  // colorMode config
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles, // global style
  borders,
  // Other foundational style overrides go here
  components: {
    Button,
    Link,
    Popover,
    // Other components go here
  },
};

export default extendTheme(overrides);
