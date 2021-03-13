import { useQuery } from 'react-query';
import { Work } from '../../types';
import { getAllNfts } from '../polka';

export * from './queryClient';

const ASSETS_QUERY = 'getAssets';

export const useAssetsQuery = () => {
  const { data, isLoading, error } = useQuery<Work[]>(ASSETS_QUERY, () => getAllNfts(), {
    staleTime: 0,
  });

  return { data, isLoading, error };
};
