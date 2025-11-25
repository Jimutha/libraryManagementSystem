// This interface defines the shape of a Book object
// It must match the JSON data sent by your Spring Boot backend
export interface Book {
  id: number;
  title: string;
  author: string;

  // The backend might send the whole category object or just the name.
  // Based on your Category entity, it will likely send an object.
  category?: {
    id: number;
    name: string;
  };
}
