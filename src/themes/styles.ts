import colors from './colors';

const obj = {
  global: () => ({
    // font
    'html, body': {
      // fontFamily: "PingFangSC-Regular, PingFang SC;",
      width: '100%',
      height: '100%',
    },
    body: {
      backgroundColor: colors.bg.light1,
    },
    a: {
      _hover: {
        textDecoration: 'none',
      },
    },
  }),
};

export default obj;
