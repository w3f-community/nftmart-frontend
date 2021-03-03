import { ComponentStyleConfig } from "@chakra-ui/react";
import colors from "../colors";

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "5px",
    padding: "4px 15px",
    // py: 1,
    mr: "10px",
    fontWeight: "normal",
    _disabled: {
      backgroundColor: colors.buttonBackground.disabled,
      border: "none",
      color: colors.text.light,
      _hover: {
        background: colors.buttonBackground.disabled,
      },
    },
  },
  variants: {
    primary: {
      color: "white",
      backgroundColor: colors.primary,
      _hover: {
        backgroundColor: colors.buttonBackground.hover.primary,
      },
    },
    default: {
      color: colors.primary,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: colors.primary,
      _hover: {
        backgroundColor: colors.buttonBackground.hover.default,
      },
    },
  },
  defaultProps: {
    variants: "default",
  },
};

export default Button;
