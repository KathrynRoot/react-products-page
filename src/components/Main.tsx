import { useEffect, useMemo, useState } from 'react';
import ProductsList from "./ProductsList.js";
import { Search } from './Search.js';
import CategoryCheckboxes from "./CategoryCheckboxes.js";
import { products } from '../data/products.js';
import RangeSliders from './RangeSliders.js';
import type { Product } from '../types/index.js';
import { LoadingSymbol } from './LoadingSymbol.js';

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = [ ...new Set(products.map(product => product.category)) ];
  const [sortBy, setSortBy] = useState("price");
  const [direction, setDirection] = useState("asc");
  const [showInStock, setShowInStock] = useState(false);
  const [priceRange, setPriceRange] = useState({min: 0, max: 99});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pending, setPending] = useState(false);

    const sortedList = useMemo(() => {
    return  [...products].sort((a, b) =>
    {
        const result = sortBy === "price" ? Number(a.price) - Number(b.price) : a.name.localeCompare(b.name);
        return direction === "asc" ? result : -result;
    }); 
    }, [products, sortBy, direction]);

  function handleCategoryChange(category: string, checked: boolean) {
        setSelectedCategories(current => {
            if (checked) {
                return [...current, category];
            }
            return current.filter(item => item !== category);
        })
    }

    useEffect(() => {
        setPending(true);
        const timeout = setTimeout(() => {
            const result = sortedList.filter(product => {
                const inStock = !showInStock || product.inStock;

                const matchesPriceRange = (product.price >= priceRange.min) && (product.price <= priceRange.max);
                
                const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

                return matchesSearch && matchesCategory && inStock && matchesPriceRange;
            });
            setFilteredProducts(result);
            setPending(false);
            // console.log(pending);
        }, 500);
        return () => clearTimeout(timeout);

    }, [
        sortedList,
        showInStock,
        products,
        priceRange.min,
        priceRange.max,
        searchQuery,
        selectedCategories
    ]);

  return (
    <main>
        <div id="search">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryCheckboxes 
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}/>
            <div id="sort-by">
                <label htmlFor='sortBy'>Sort by:</label>
                    <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>

                <button id="sort-toggle" onClick={() => setDirection((prev) => prev === "asc" ? "desc" : "asc")}>
                    {direction === "asc" ? "Ascending" : "Descending"}
                </button>
            </div>
            <div id="availability">
                <button onClick={() => setShowInStock(prev => !prev)}>
                    {showInStock ? "Show All" : "Show Available"}
                </button>
            </div>
        </div>
        <div>
            <RangeSliders min={0} max={99} step={1} initialMin={0} initialMax={99} onChange={(minPrice, maxPrice) => {
                setPriceRange({
                    min: minPrice,
                    max: maxPrice,
                });
            }}
            />
        </div>
        <section id="products">
            {pending ? (
                <div className="loading">
                    <LoadingSymbol />
                </div>
            ) : (
                (filteredProducts.length === 0) ? (
                    (
                        <div className="no-results">
                            <p>Sorry, no results</p>
                        </div>
                    )
                )  : 
                <ProductsList products={filteredProducts} />
                )
             }
            
        </section>
    </main>
  )
}