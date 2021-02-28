import React from 'react';
import { Box } from '@chakra-ui/react';
import Collection from '../../../components/collection';
import colors from '../../../themes/colors';
import IconSj from '../../../assets/home/icon_sj.png';
import IconCj from '../../../assets/home/icon_cj.png';
import IconClinch from '../../../assets/home/icon_clinch.png';
import IconRight from '../../../assets/home/icon_right.png';

type PartWorksProps = {
  title: string;
  icon: any;
  typicalList: {
    name: string;
    id: number;
    price: number;
  }[];
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
        <Box as="img" src={icon} alt="" width="24px" height="24px" mr="8px" />
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
          color={colors.text[500]}
          fontSize="14px"
        >
          查看更多
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
    <Box width="1364px" m="0 auto">
      <PartHeader title={title} icon={icon} />
      <Box display="flex" mr="-16px">
        {typicalList.map(({ id, name, price }) => (
          <Box margin="0 16px 40px 0" key={id}>
            <Collection name={name} price={price} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Works = () => {
  const partList = [
    {
      title: '新上架',
      icon: IconSj,
      seeMoreLink: '',
      typicalList: [
        {
          name: '静物系列再作星空',
          id: 0,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 1,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 2,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 3,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 4,
          price: 198234,
        },
      ],
      id: 0,
    },
    {
      title: '新创建',
      icon: IconCj,
      seeMoreLink: '',
      typicalList: [
        {
          name: '静物系列再作星空',
          id: 0,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 1,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 2,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 3,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 4,
          price: 198234,
        },
      ],
      id: 1,
    },
    {
      title: '最近成交',
      icon: IconClinch,
      seeMoreLink: '',
      typicalList: [
        {
          name: '静物系列再作星空',
          id: 0,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 1,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 2,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 3,
          price: 198234,
        },
        {
          name: '静物系列再作星空',
          id: 4,
          price: 198234,
        },
      ],
      id: 2,
    },
  ];

  return (
    <Box backgroundColor={colors.bg[600]} p="40px 0">
      {partList.map(({ title, id, typicalList, icon }) => (
        <PartWorks title={title} key={id} typicalList={typicalList} icon={icon} />
      ))}
    </Box>
  );
};

export default Works;
