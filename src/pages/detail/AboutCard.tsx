import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../components/card';

const AboutCard: FC<{ about: string }> = ({ about }) => {
  const { t } = useTranslation();
  return <Card title={t('detail.title.about')}>{about}</Card>;
};

export default AboutCard;
