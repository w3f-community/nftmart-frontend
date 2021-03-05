import React from 'react';
import { useLocation } from 'react-router-dom';

import NLink from '../link';

const NavLink = () => {
  const location = useLocation();

  const navMap: { [key: string]: string } = {
    'nav.home': '/',
    'nav.explore': '/explore',
    'nav.list-sale': '/list-sale',
    'nav.latest-create': '/lates-create',
    'nav.latest-strike': '/lates-strike',
  };

  const renderLink = (title: string) => {
    const path = navMap[title];
    const active = location.pathname === path;

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

  return <>{Object.keys(navMap).map(renderLink)}</>;
};

export default NavLink;
