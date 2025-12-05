export type Priority = 'low' | 'medium' | 'high';

export interface Wish {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  url?: string;
  price?: number | null;
  priority: Priority;
  createdAt: number;
}

export interface WishList {
  id: string;
  name: string;
  createdAt: number;
  wishes: Wish[];
}
