import { ComponentStyleConfig } from '@chakra-ui/react';

const Popover: ComponentStyleConfig = {
  baseStyle: {
    content: {
      padding: '4px 18px',
      borderRadius: '5px',
    },
  },

  variants: {
    menu: {
      popper: {
        width: 'unset',
      },
    },
  },
};

export default Popover;
