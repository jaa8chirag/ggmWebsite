import { notFound } from "next/navigation";
import { query, queryOne, parseJson } from "@/lib/db";
import { DB_PRODUCTS } from "@/data/dbSeedData";
import ProductForm from "@/components/admin/shop/ProductForm";
import { updateProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product = await queryOne<any>("SELECT * FROM `Product` WHERE `id` = ? OR `slug` = ?", [id, id]);

  if (!product) {
    const seedMatch = DB_PRODUCTS.find((p) => p.id === id || p.slug === id);
    if (seedMatch) {
      product = { ...seedMatch };
    }
  }

  if (!product) notFound();

  const targetId = product.id || id;
  const specs = await query<any>("SELECT * FROM `ProductSpec` WHERE `productId` = ? ORDER BY `order` ASC", [targetId]);

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">Edit {product.name}</h1>
      <div className="mt-8">
        <ProductForm
          action={updateProduct.bind(null, targetId)}
          values={{
            ...product,
            noIndex: Boolean(product.noIndex),
            features: parseJson<string[]>(product.features, product.features || []),
            benefits: parseJson<string[]>(product.benefits, product.benefits || []),
            specs: (specs && specs.length > 0) ? specs.map((s) => ({ a: s.label, b: s.value })) : [],
          }}
        />
      </div>
    </div>
  );
}
