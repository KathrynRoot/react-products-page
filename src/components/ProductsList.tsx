import { type Product } from "../types/index.js";
import EmptyStar from "../assets/star.svg?react";
import FilledStar from "../assets/star-filled.svg?react";

export default function ProductsList({ products }: {products: Product[]}) {

    return (
        <>
            <ul className="product-grid">
                {products.map((product, index) => (
                    // setPending(true);
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
                                    {Array.from({ length: products[index].rating }, (_, i) =>(
                                        <FilledStar key={i} />
                                    ))}
                                    {Array.from({ length: 5 - products[index].rating }, (_, i) =>(
                                        <EmptyStar key={i} />
                                    ))}
                                </p>
                                <p className="price">£{product.price}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}