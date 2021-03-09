export const TYPES = {
  ClassId: 'u32',
  TokenId: 'u64',
  CurrencyId: 'u32',
  CurrencyIdOf: 'CurrencyId',
  Amount: 'i128',
  AmountOf: 'Amount',
  // Metadata: 'Vec<u8>',
  ClassIdOf: 'ClassId',
  TokenIdOf: 'TokenId',
  ClassInfoOf: {
    metadata: 'Vec<u8>',
    totalIssuance: 'TokenId',
    owner: 'AccountId',
    data: 'ClassData',
  },
  TokenInfoOf: { metadata: 'Vec<u8>', owner: 'AccountId', data: 'TokenData' },
  ClassData: {
    deposit: 'Balance',
    properties: 'Properties',
    name: 'Vec<u8>',
    description: 'Vec<u8>',
  },
  TokenData: { deposit: 'Balance' },
  Properties: 'u8',
  ActiveIndex: 'u32',
  CategoryId: 'u32',
};

export const NAV_MAP: Record<string, string> = {
  'nav.home': '/',
  'nav.explore': '/explore',
  'nav.list-sale': '/explore?status=listing',
  'nav.latest-create': '/explore?status=new',
  'nav.latest-strike': '/explore?status=recent',
};

export const USER_LINKS: Record<string, string> = {
  'quick-area.wallet': '/wallet',
  'quick-area.works': '/collections',
  'quick-area.works.create': '/create',
  'quick-area.profile.edit': '/profile',
};

// TODO: Change to env variables
export const DBURL = 'http://localhost:8888/graphql';
export const IPFS_POST_SERVER = 'http://59.110.115.146:5001';
export const IPFS_GET_SERVER = 'http://59.110.115.146:8000';
export const NODE_URL = 'ws://8.136.111.191:9944';

// 	 Token can be transferred
// 	Transferable = 0b00000001
// 	 Token can be burned
// 	Burnable = 0b00000010

export const TOKEN_TRANSFERABLE_BURNABLE = 0b00000011;
