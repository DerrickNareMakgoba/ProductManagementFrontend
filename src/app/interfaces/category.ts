export interface ICategory {
  id: number;
  name: string;
  description: string;
  active: boolean;
  deleted: boolean;
}

export interface IAddCategory {
  name: string;
  description: string;
  parentCategoryId: number;
}