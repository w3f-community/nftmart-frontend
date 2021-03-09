import { filter } from 'ramda';
import Rekv from 'rekv';
import { Work } from '../types';

export interface FilterTypes {
  status: number;
  category: number;
  collection: number;
}

export interface AssetStore extends FilterTypes {
  assets: Work[];
  filteredAssets: Work[];
}

const store = new Rekv<AssetStore>({
  assets: [],
  filteredAssets: [],
  status: -1,
  category: -1,
  collection: -1,
});

export default store;

export const actions = {
  setAssets(assets: Work[]) {
    store.setState({ assets });
  },
  filterAssets({ status, category, collection }: Partial<FilterTypes>) {
    store.setState((s) => {
      let filteredAssets = s.assets;

      if (status) {
        filteredAssets = filter((work) => work.Status === status, filteredAssets);
      }

      if (category) {
        filteredAssets = filter((work) => work.categoryId === category, filteredAssets);
      }

      if (collection) {
        filteredAssets = filter((work) => work.collectionId === collection, filteredAssets);
      }

      return {
        ...s,
        filteredAssets,
      };
    });
  },
};
