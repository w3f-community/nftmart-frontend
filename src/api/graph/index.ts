import { globalStore } from 'rekv';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { DBURL } from '../../constants';

export const newClient = (opt = {}) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    ...opt,
  });
  return client;
};

export const getClient = () => {
  const client = newClient({ uri: DBURL });
  return client;
};

const GET_COLLECTIONS = gql`
  query {
    collections
  }
`;

const GET_ITEMS = gql`
  query {
    assets(page: 1) {
      assets {
        id
        Name
        Status
        PicUrl
        categoryId
        price
      }
      hasMore
    }
  }
`;

// export query result for collections , use fetchMore to load more paginations
export const GetItems = (vars = {}) => {
  return useQuery(GET_ITEMS, {
    variables: { offset: 0, limit: 20, ...vars },
  });
};

// export query result for collections , use fetchMore to load more paginations
export const GetCollections = (vars = {}) => {
  return useQuery(GET_COLLECTIONS, {
    variables: { offset: 0, limit: 20, ...vars },
  });
};
