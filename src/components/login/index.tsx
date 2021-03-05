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
} from '@chakra-ui/react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import NLink from '../link';

const navMap: Record<string, string> = {
  'quick-area.wallet': '/profile/wallet',
  'quick-area.works': '/profile/product',
  'quick-area.works.create': '/profile/create',
  'quick-area.profile.edit': '/profile/info',
};

const Login = () => {
  const location = useLocation();

  const [opening, setOpening] = useState(false);

  const avatar = '';
  const username = 'Username';

  // Link render helper
  const renderLink = (title: string) => {
    const path = navMap[title];
    const active = location.pathname === path;

    return <NLink title={title} path={path} active={active} bgSize="cover" textAlign="center" />;
  };

  // Menus
  const menus = <Stack>{Object.keys(navMap).map(renderLink)}</Stack>;

  // Trigger
  const triggerContent = (
    <Stack
      direction="row"
      alignItems="center"
      cursor="pointer"
      spacing={4}
      px={2}
      maxWidth="233px"
      // _hover={{ backgroundColor: colors.bg.light1 }}
    >
      <Avatar size="sm" src={avatar} />
      <Text fontSize="sm" fontWeight="bold" userSelect="none" isTruncated>
        {username}
      </Text>
      {opening ? <Icon as={IoMdArrowDropup} /> : <Icon as={IoMdArrowDropdown} />}
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
        <PopoverContent
          maxWidth="200px"
          _focus={{ boxShadow: 'none' }}
          boxShadow="rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
        >
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
