import Link from "next/link";
import { Plus } from "lucide-react";
import { query } from "@/lib/db";
import { DB_PRODUCTS } from "@/data/dbSeedData";
import DeleteButton from "@/components/admin/DeleteButton";
import { cardClass } from "@/components/admin/styles";
import { deleteProduct } from "./actions";

export default async function AdminShopPage() {
  const dbProducts = await query<any>("SELECT * FROM `Product` ORDER BY `name` ASC");
  const products = dbProducts && dbProducts.length > 0 ? dbProducts : DB_PRODUCTS;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-chalk">Shop</h1>
          <p className="mt-2 font-body text-sm text-muted">
            {products.length} products
          </p>
        </div>
        <Link
          href="/admin/shop/new"
          className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow"
        >
          <Plus size={14} /> New product
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`${cardClass} flex items-center justify-between`}
          >
            <div>
              <p className="font-mono text-xs text-muted">
                {product.category}
              </p>
              <p className="mt-1 font-display text-lg text-chalk">
                {product.name}
              </p>
              <p className="mt-1 font-mono text-xs text-flow">
                {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "Custom quote"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/shop/${product.id}/edit`}
                className="rounded-lg border border-chalk/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:border-flow hover:text-flow"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteProduct.bind(null, product.id)}
                label="product"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
