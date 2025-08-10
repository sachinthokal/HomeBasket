import { Item } from '../model/item.model';

export interface Category {
  selectedCategoryIndex: number;
  name: string;
  items?: Item[];
}
