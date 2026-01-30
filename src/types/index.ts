export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isPrescription: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category =
  | 'All'
  | 'Pain Relief'
  | 'Antibiotic'
  | 'Supplement'
  | 'Allergy'
  | 'Gastro';
