import { useState } from 'react';
import './App.css';
import { Header } from './components/Header.js';
import ProductsList from "./components/ProductsList.js";
import { Search } from './components/Search.js';
import { Footer } from './components/Footer.js';
import CategoryCheckboxes from "./components/CategoryCheckboxes.js";
import { products } from './data/products.js';


export default function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = [ ...new Set(products.map(product => product.category)) ];
  function handleCategoryChange(category: string, checked: boolean) {
        setSelectedCategories(current => {
            if (checked) {
                return [...current, category];
            }
            return current.filter(item => item !== category);
        })
    }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

    return matchesSearch && matchesCategory;
  })

  return (
    <main>
      <Search searchQuery ={searchQuery} setSearchQuery={setSearchQuery} />
      <CategoryCheckboxes 
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}/>
      <section id="products">
        <ProductsList products={filteredProducts} />
      </section>
    </main>
  )
}