import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../i18n';

// fires a GA pageview every time the route changes
type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
export default Container;
