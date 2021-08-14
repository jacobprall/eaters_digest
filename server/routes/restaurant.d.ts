export interface Body {
  body: IRestaurant;
}

export interface IRestaurant {
  restaurant_name: string;
  city: string;
  cuisine?: string;
  description?: string;
  price?: number;
  visit_date?: Date;
  rating: number;
  favorite: boolean;
}