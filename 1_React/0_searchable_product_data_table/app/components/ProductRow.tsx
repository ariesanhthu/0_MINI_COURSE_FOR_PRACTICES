import { Product } from "../types/product";

interface ProductRowProps {
    product: Product; // <-- Khai báo prop 'product' ở đây
    key?: string; // Key không cần khai báo trong props
}
const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
    const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
        {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
export default ProductRow;