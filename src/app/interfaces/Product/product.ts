export interface IPagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}


export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  quantity: number;
  sku: string;
  createdAt: string;
  active: boolean;
  deleted: boolean;
}

export interface IAddProduct {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  quantity: number;
  sku: string;
}