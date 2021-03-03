import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Link, Text } from "@chakra-ui/react";
import colors from "../../themes/colors";

import { t } from "../../i18n";

const NavLink = () => {
  const location = useLocation();

  const navMap: { [key: string]: string } = {
    "nav.home": "/",
    "nav.explore": "/explore",
    "nav.list-sale": "/list-sale",
    "nav.latest-create": "/lates-create",
    "nav.latest-strike": "/lates-strike",
  };

  const renderLink = (title: string) => {
    const path = navMap[title];
    const active = location.pathname === path;
    const borderBottom = {
      content: '" "',
      height: 1,
      width: "80%",
      borderRadius: 3,
      position: "absolute",
      backgroundColor: colors.primary,
      left: "50%",
      bottom: -2,
      transform: "translate(-50%, -50%)",
    };

    return (
      <Text
        fontSize={16}
        marginRight={8}
        fontWeight="bold"
        bgSize="cover"
        _hover={{
          color: colors.primary,
        }}
        position="relative"
      >
        <Link
          as={RouterLink}
          key={title}
          to={path}
          color={active ? colors.primary : ""}
          _after={active ? borderBottom : {}}
        >
          {t(title)}
        </Link>
      </Text>
    );
  };

  return <>{Object.keys(navMap).map(renderLink)}</>;
};

export default NavLink;
