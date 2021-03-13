export interface Work {
  tokenId: number;
  name: string;
  bannerUrl?: string;
  status: number;
  address: string;
  description: string;
  metadata: string;
  externalLinks: string;
  price?: number | string;
  latestPrice?: number;
  categoryId: number;
  classId: number;
  createdAt: string;
  updatedAt: string;
  owner: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Order {
  classId: number;
  tokenId: number;
  price: string;
  owner: string;
  categoryId: number;
}
