import colors from "./colors";

const obj = {
  global: () => ({
    // font
    "html, body": {
      // fontFamily: "PingFangSC-Regular, PingFang SC;",
      width: "100%",
      height: "100%",
    },
    body: {
      backgroundColor: colors.background.gray,
    },
    a: {
      _hover: {
        textDecoration: "none",
      },
    },
  }),
};

export default obj;
