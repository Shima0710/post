export interface Post {
  id: string;
  text: string;
  date: string;
  responses: Response[];
  liked: boolean;
}

export interface Response {
  id: string;
  text: string;
  date: string;
  liked: boolean;
}
