import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Stack,
  Portal,
  Avatar,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import NLink from '../link';
import { USER_LINKS } from '../../constants';

const Login = () => {
  const location = useLocation();

  const [opening, setOpening] = useState(false);

  const avatar = '';
  const username = 'Username';

  // Link render helper
  const renderLink = (title: string) => {
    const path = USER_LINKS[title];
    const active = location.pathname === path;

    return (
      <NLink
        title={title}
        path={path}
        active={active}
        bgSize="cover"
        textAlign="center"
        linkProps={{
          paddingX: 4,
          display: 'block',
        }}
      />
    );
  };

  // Menus
  const menus = <Stack paddingY={2}>{Object.keys(USER_LINKS).map(renderLink)}</Stack>;

  // Trigger
  const triggerContent = (
    <Stack
      direction="row"
      alignItems="center"
      cursor="pointer"
      spacing={2}
      px={2}
      maxWidth="233px"
      // _hover={{ backgroundColor: colors.bg.light1 }}
    >
      <Avatar size="sm" src={avatar} />
      <Flex align="center">
        <Text fontSize="sm" fontWeight="bold" userSelect="none" isTruncated>
          {username}
        </Text>
        <Icon
          marginLeft={0}
          marginInlineStart={0}
          as={opening ? IoMdArrowDropup : IoMdArrowDropdown}
        />
      </Flex>
    </Stack>
  );

  return (
    <Popover
      placement="bottom"
      size="sm"
      variant="menu"
      onOpen={() => setOpening(true)}
      onClose={() => setOpening(false)}
    >
      <PopoverTrigger>{triggerContent}</PopoverTrigger>
      <Portal>
        {/* TODO: Move focus property else where to have common use */}
        <PopoverContent maxWidth="200px" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody display="flex" justifyContent="center">
            {menus}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Login;
