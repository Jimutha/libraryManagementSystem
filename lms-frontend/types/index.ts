export interface Book {
  id: number;
  title: string;
  author: string;
  category: {
    id: number;
    name: string;
  };
}
