import { type Product } from "../types/index.js";
import EmptyStar from "../assets/star.svg?react";
import FilledStar from "../assets/star-filled.svg?react";

type Props = {
    products: Product[];
};

export default function ProductsList({ products }: Props) {
    return (
        <ul id="product-grid">
            {products.map(product => (
                <li key={product.id} className="card">
                    <div className="card-img-wrapper">
                        <img
                            className="card-img"
                            alt={product.name}
                            src={`https://picsum.photos/id/1${product.id}1/300/300`}
                            />
                            <h2>{product.name}</h2>
                    </div>
                    <div className="card-info">
                        <p className="stock">In Stock: {product.inStock ? "Yes" : "No"}</p>
                        <p className="category">{product.category}</p>
                        <div className="card-bottom">
                            <p className="rating">
                                <FilledStar/>
                                <EmptyStar/>
                                <EmptyStar/>
                                <EmptyStar/>
                                <EmptyStar/>
                                {/* {product.rating}/5 stars */}
                                </p>
                            <p className="price">£{product.price}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}