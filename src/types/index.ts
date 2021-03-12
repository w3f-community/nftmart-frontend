export interface Work {
  id: number;
  name: string;
  picUrl?: string;
  status: number;
  address: string;
  describe: string;
  metadata: string;
  externalLinks: string;
  price: number;
  latestPrice?: number;
  categoryId: number;
  collectionId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
}
