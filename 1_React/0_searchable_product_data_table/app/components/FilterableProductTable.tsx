"use client"

import { Product } from "../types/product";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function FilterableProductTable({products} : {products: Product[]}) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
  
    return (
      <div>
        <SearchBar 
          filterText={filterText} 
          inStockOnly={inStockOnly} 
          onFilterTextChange={setFilterText} 
          onInStockOnlyChange={setInStockOnly} />
          
        <ProductTable 
          products={products} 
          filterText={filterText}
          inStockOnly={inStockOnly} />
      </div>
    );
  }
  