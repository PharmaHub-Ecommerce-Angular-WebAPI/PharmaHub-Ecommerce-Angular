export interface Iproduct {
  id: string;
  name: string;
  imgUrl: string;
  description: string[]; // packageComponents
  pharmName: string;
  imgPharm: string;
  price: number;
  isFlipped: boolean;
  discountRate?: number;
  
}
