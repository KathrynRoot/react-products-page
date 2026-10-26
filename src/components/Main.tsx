import { useState } from 'react';
import ProductsList from "./ProductsList.js";
import { Search } from './Search.js';
import CategoryCheckboxes from "./CategoryCheckboxes.js";
import { products } from '../data/products.js';

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = [ ...new Set(products.map(product => product.category)) ];
  const [sortBy, setSortBy] = useState("price");
  const [direction, setDirection] = useState("asc");

  const sortedList = [...products].sort((a, b) =>
    {
      const result = sortBy === "price" ? Number(a.price) - Number(b.price) : a.name.localeCompare(b.name);
      return direction === "asc" ? result : -result;    
    }); 

  function handleCategoryChange(category: string, checked: boolean) {
        setSelectedCategories(current => {
            if (checked) {
                return [...current, category];
            }
            return current.filter(item => item !== category);
        })
    }

  const filteredProducts = [...sortedList]
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

      return matchesSearch && matchesCategory;
    })
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
        </div>
        <section id="products">
            <ProductsList products={filteredProducts} />
        </section>
    </main>
  )
}