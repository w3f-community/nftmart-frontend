import React from 'react';
import {  Link as routerLink } from 'react-router-dom';
import { Box, Link } from '@chakra-ui/react';

import { t } from '../../i18n';

const Component = () => {

  const pagesConf: { [key: string]: string } = {
    'nav.home': '/',
    'nav.explore': '/explore',
    'nav.list-sale': '/list-sale',
    'nav.latest-create': '/lates-create',
    'nav.latest-strike': '/lates-strike',
  };

  const renderLink = (key: string) => {
    return (
      <Link
        as={routerLink}
        key={key}
        style={{ color: '#784400' }}
        _active={{ color: 'red' }}
        to={pagesConf[key]}
      >
        <Box display="inline-block" padding="0 8px" fontWeight="bold" fontSize={16} bgSize="cover">
          {t(key)}
        </Box>
      </Link>
    );
  };
  return <>{Object.keys(pagesConf).map(renderLink)}</>;
};

export default Component