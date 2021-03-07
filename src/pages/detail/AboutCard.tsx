import React, { FC } from 'react';
import Card from '../../components/card';

const AboutCard: FC<{ about: string }> = ({ about }) => {
  return <Card title="关于集合名称">{about}</Card>;
};

export default AboutCard;
