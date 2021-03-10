import React from 'react';
import { useLocation } from 'react-router-dom';

import NLink from '../link';
import { NAV_MAP } from '../../constants';

const NavLink = () => {
  const location = useLocation();

  const renderLink = (title: string) => {
    const path = NAV_MAP[title];
    const active = location.pathname + location.search === path;

    return (
      <NLink
        title={title}
        path={path}
        active={active}
        bgSize="cover"
        fontWeight="bold"
        marginRight={8}
        bordered
      />
    );
  };

  return <>{Object.keys(NAV_MAP).map(renderLink)}</>;
};

export default NavLink;
