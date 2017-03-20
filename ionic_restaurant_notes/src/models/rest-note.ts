// restaurant notes based on structure of djangoREST api
// https://api.github.com/users/
export interface RestNote {
  url: string;
  created?: string;
  title: string;
  note_text: string;
  restaurant_id: string;
  favorite_dish: string;
}
