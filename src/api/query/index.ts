import { useQuery } from 'react-query';
import { Order, Work } from '../../types';
import { getAllNfts, getAllOrders, getClasses } from '../polka';

export * from './queryClient';

const ASSETS_QUERY = 'getAssets';
const COLLECTIONS_QUERY = 'getCollections';

export const useAssetsQuery = () => {
  // ----- helpers
  const updateAssetByOrder = (asset: Work, orders: Order[]) => {
    const givenOrder = orders.find(
      (order) => order.classId === asset.classId && order.tokenId === asset.tokenId,
    );

    if (givenOrder) {
      const categoryId = givenOrder.categoryId ? Number(givenOrder.categoryId) : 3;
      return {
        ...asset,
        status: 1,
        price: givenOrder.price,
        categoryId,
      };
    }
    return { ...asset, status: 2, price: undefined, categoryId: -1 };
  };

  const queryAssetsAndMap = async () => {
    const assets = await getAllNfts();
    const orders = (await getAllOrders()) as Order[];

    if (Array.isArray(orders) && orders.length && Array.isArray(assets) && assets.length) {
      const newAssets = assets.map((asset) => updateAssetByOrder(asset, orders));
      return newAssets;
    }
    return assets;
  };

  // use query
  const { data: assetsData, isLoading, error } = useQuery<Work[]>(ASSETS_QUERY, queryAssetsAndMap, {
    staleTime: 0,
  });

  return { data: assetsData, isLoading, error };
};

export const useCollectionsQuery = () => {
  const { data, isLoading, error } = useQuery(COLLECTIONS_QUERY, getClasses, {
    staleTime: 0,
  });

  return { data, isLoading, error };
};
