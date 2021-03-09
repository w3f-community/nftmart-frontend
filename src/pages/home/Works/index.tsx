import React, { FC } from 'react';
import { Box, Container, SimpleGrid, Skeleton } from '@chakra-ui/react';
import Collection from '../../../components/collection';
import colors from '../../../themes/colors';
import IconSj from '../../../assets/home/icon_sj.png';
import IconCj from '../../../assets/home/icon_cj.png';
import IconClinch from '../../../assets/home/icon_clinch.png';
import IconRight from '../../../assets/home/icon_right.png';
import { t } from '../../../i18n';
import { Work } from '../../../types';

type PartWorksProps = {
  title: string;
  icon: React.ReactNode;
  link: string;
  typicalList: Work[];
};

type PartHeaderProps = {
  title: string;
  icon: any;
};

const PartHeader = (props: PartHeaderProps) => {
  const { title, icon } = props;

  return (
    <Box
      display="flex"
      height="30px"
      alignItems="flex-end"
      justifyContent="space-between"
      marginBottom="30px"
    >
      <Box display="flex" height="100%" alignItems="center">
        {/* TODO: Update image source to have more clearness by using svg etc... */}
        <Box as="img" src={icon} alt="" width={7} height={7} mr="8px" />
        <Box color="#232A4A" fontSize="22px" fontWeight="600" lineHeight="30px">
          {title}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" cursor="pointer">
        <Box
          as="a"
          lineHeight="20px"
          display="block"
          height="20px"
          color={colors.text.black}
          fontSize="14px"
        >
          {t(`home.more`)}
        </Box>
        <Box
          as="img"
          src={IconRight}
          alt=""
          width="14px"
          height="14px"
          transform="translateY(2px)"
        />
      </Box>
    </Box>
  );
};

const PartWorks = (props: PartWorksProps) => {
  const { title, typicalList, icon } = props;

  return (
    <Box marginBottom={10}>
      <PartHeader title={title} icon={icon} />
      <SimpleGrid columns={5} spacing={4}>
        {typicalList.map((work) => (
          <Collection {...work} isSet />
        ))}
      </SimpleGrid>
    </Box>
  );
};
export interface WorksProps {
  loading: boolean;
  data: Record<string, Work[]>;
}

const Works: FC<WorksProps> = ({ loading, data }) => {
  const partList = [
    {
      key: 'listing',
      title: t('nav.list-sale'),
      icon: IconSj,
      link: '/explore?status=listing',
    },
    {
      key: 'new',
      title: t('nav.latest-create'),
      icon: IconCj,
      link: '/explore?status=new',
    },
    {
      key: 'recent',
      title: t('nav.latest-strike'),
      icon: IconClinch,
      link: '/explore?status=recent',
    },
  ].map((item) => ({ ...item, list: data[item.key] || [] }));

  return (
    <Box p="40px 0">
      <Container>
        {partList.map(({ title, link, icon, list }) => (
          <Skeleton isLoaded={!loading} key={title}>
            <PartWorks title={title} typicalList={list} icon={icon} link={link} />
          </Skeleton>
        ))}
      </Container>
    </Box>
  );
};

export default Works;
