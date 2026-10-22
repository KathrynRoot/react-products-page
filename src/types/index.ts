export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    inStock: boolean;
    imagePath: string;
};

export type Checkbox = {
    id: number;
    name: string;
    checked: boolean;
};