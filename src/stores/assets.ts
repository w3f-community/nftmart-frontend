import { compose, filter, head, prop } from 'ramda';
import Rekv from 'rekv';
import { Work } from '../types';

export interface FilterTypes {
  status: number;
  category: number;
  collection: number;
}

export type Collection = {
  name: string;
  id: number;
};

export interface AssetStore extends FilterTypes {
  assets: Work[];
  filteredAssets: Work[];
  collections: Collection[];
}

const store = new Rekv<AssetStore>({
  assets: [],
  filteredAssets: [],
  // filtering properties
  // status id
  status: -1,
  // category id
  category: -1,
  // collection id
  collection: -1,

  // Store collections title and id
  collections: [],
});

export default store;

const filterAssets = (assets: Work[], { status = -1, category = -1, collection = -1 }: Partial<FilterTypes>) =>
  assets
    .filter(({ status: assetStatus }) => status === -1 || assetStatus === status)
    .filter(({ categoryId }) => category === -1 || categoryId === category)
    .filter(({ collectionId }) => collection === -1 || collectionId === collection);

export const actions = {
  setCollections(collections: Collection[]) {
    store.setState({ collections })
  },
  setAssets(assets: Work[]) {
    store.setState({ assets, filteredAssets: assets });
  },
  filterAssets(filterTypes: Partial<FilterTypes>) {
    store.setState((s) => {
      const filteredAssets = filterAssets(s.assets, filterTypes);

      return {
        ...s,
        filteredAssets,
      };
    });
  },
};
