// import { useState } from 'react'
// import { products } from "./data/products.js";
import { useState } from 'react';
import './App.css';
import { Header } from './components/Header.js';
import { ProductsList } from "./components/ProductsList.js";
import { Search } from './components/Search.js';
import { Footer } from './components/Footer.js';
import { Categories } from './components/Categories.js';

export default function App() {
  // const [count, setCount] = useState(0);

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

  return (
    <main>
      <Search searchQuery ={searchQuery} setSearchQuery={setSearchQuery} />
      <Categories />
      <section id="products">
        <ProductsList searchQuery={searchQuery} />
      </section>
    </main>
  )
}
