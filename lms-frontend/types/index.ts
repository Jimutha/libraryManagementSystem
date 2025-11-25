export interface Book {
  id: number;
  title: string;
  author: string;
  // The backend might send the whole category object, or just the name.
  // Let's handle the object structure based on your Entity.
  category: {
    id: number;
    name: string;
  };
}
