export interface Item {
  id: number;     
  name: string;
  qty: number;
  unit: string;
  category: string;
  created_at?: string;  
  purchased: boolean;
}
