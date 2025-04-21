export interface Ioffers {
  id: string;
  name: string;
  description: string[]; // دي هنحولها من packageComponents
  imgUrl: string; // imageUrl
  price: number;
  DissPrice: number; // discountRate
  pharmName: string; // pharmacyName
  imgPharm: string; // pharmacyLogo
  isFlipped: boolean;
}
