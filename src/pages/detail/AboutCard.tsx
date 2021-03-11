import React, { FC } from 'react';
import Card from '../../components/card';
import { t } from '../../i18n';

const AboutCard: FC<{ about: string }> = ({ about }) => {
  return <Card title={t('detail.title.about')}>{about}</Card>;
};

export default AboutCard;
