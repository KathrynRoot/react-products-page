import { products } from "../data/products.js";

export function ProductsList({ searchQuery} : {searchQuery: string;}) {
    return (
        <ul id="product-grid">
        {
            products
                .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((product) => (
                <li key={product.id} className="card">
                    <div>
                    <h2>{product.name}</h2>
                    <img
                        alt={product.name}
                        src={`https://picsum.photos/id/1${product.id}1/200/200`}
                    />
                    </div>
                    <p>{product.category}</p>
                    <p>£{product.price}</p>
                    <p>{product.rating}/5 stars</p>
                    <p>In Stock: {product.inStock ? "Yes" : "No"}</p>
                </li>
                ))
        }
        </ul>
    )
}