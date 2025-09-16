export interface Item {
  id: number;     
  item_name: string;
  qty: number;
  unit: string;
  category: string;
  created_at?: string;  
  purchased: boolean;
}
