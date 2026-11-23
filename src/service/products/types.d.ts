interface ProductList {
  products: ProductData[];
  total: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  images: string[];
  thumbnail: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}
