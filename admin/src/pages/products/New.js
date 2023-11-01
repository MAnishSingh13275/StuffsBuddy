import Layout from "@/Components/Layout";
import ProductForm from "@/Components/ProductForm";

const New = () => {
  return (
    <Layout>
        <h1 className="text-black font-bold text-2xl m-2">New Product</h1>
      <ProductForm />
    </Layout>
  );
};

export default New;
