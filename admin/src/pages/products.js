import Layout from "@/Components/Layout";
import { Button, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  };

  return (
    <Layout>
      <div className="text-black">
        <div className="m-5">
          <Link href={"/products/New"} className="">
            <button className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
              <div className="absolute inset-0 w-3 bg-gray-900 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-white">
                Add New Product
              </span>
            </button>
          </Link>
        </div>

        <div>
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Product Name
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, key) => (
                <tr key={product._id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    {product.title}
                  </td>

                  <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Actions
                    </span>

                    <div>
                      <Link
                        href={"/products/edit/" + product._id}
                        className="text-blue-400 hover:text-blue-600 underline mx-2"
                      >
                        Edit
                      </Link>
                      <Button
                        onClick={async () => {
                          await axios.delete("api/products?id=" + product._id, {
                            data: {
                              id: product._id,
                            },
                          });
                          getData();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
