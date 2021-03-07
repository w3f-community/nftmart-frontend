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
};

export const DBURL = '';
export const IPFS_POST_SERVER = 'http://59.110.115.146:5001';
export const IPFS_GET_SERVER = 'http://59.110.115.146:8000';
export const NODE_URL = 'ws://8.136.111.191:9944';

// 	 Token can be transferred
// 	Transferable = 0b00000001
// 	 Token can be burned
// 	Burnable = 0b00000010

export const TOKEN_TRANSFERABLE_BURNABLE = 0b00000011;
