import { notFound } from "next/navigation";
import { query, queryOne, parseJson } from "@/lib/db";
import ProductForm from "@/components/admin/shop/ProductForm";
import { updateProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await queryOne<any>("SELECT * FROM `Product` WHERE `id` = ?", [id]);
  if (!product) notFound();

  const specs = await query<any>("SELECT * FROM `ProductSpec` WHERE `productId` = ? ORDER BY `order` ASC", [id]);

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">Edit {product.name}</h1>
      <div className="mt-8">
        <ProductForm
          action={updateProduct.bind(null, product.id)}
          values={{
            ...product,
            noIndex: Boolean(product.noIndex),
            features: parseJson<string[]>(product.features, []),
            benefits: parseJson<string[]>(product.benefits, []),
            specs: specs.map((s) => ({ a: s.label, b: s.value })),
          }}
        />
      </div>
    </div>
  );
}
