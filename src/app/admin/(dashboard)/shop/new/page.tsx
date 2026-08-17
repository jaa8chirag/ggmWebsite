import ProductForm from "@/components/admin/shop/ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">New product</h1>
      <div className="mt-8">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
