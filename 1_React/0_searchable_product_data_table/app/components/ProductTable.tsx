"use client"

import { Product } from "../types/product";

import { JSX } from "react";

import ProductRow from "./ProductRow";
import ProductCategoryRow from "./ProductCategoryRow";

interface ProductTableProps {
    products: Product[];
    filterText: string;
    inStockOnly: boolean;
}

export default function ProductTable({products, filterText, inStockOnly}: ProductTableProps) {
    let rows: JSX.Element[] = [];
    let lastCategory: string = "";
    products.forEach((product : Product) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }

        if(inStockOnly && !product.stocked) {
            return;
        }

        if (product.category != lastCategory){
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
            );
        }
        rows.push(
            <ProductRow
              product={product}
              key={product.name} />
          );
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>   
            </thead>
            <tbody>{rows}</tbody>
        </table>
        );
}
