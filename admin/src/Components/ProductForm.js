import Layout from "@/Components/Layout";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductForm = ({
  _id,
  images: currentImages,
  title: currentTitle,
  desc: currentDesc,
  price: currentPrice,
}) => {
  const [title, setTitle] = useState(currentTitle || "");
  const [desc, setDesc] = useState(currentDesc || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [images, setImages] = useState(currentImages || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, desc, price, images };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }

  const handleUploadSuccess = (result) => {
    setImages(result.info.secure_url);
    console.log(result.info.secure_url);
  };

  return (
    <div className="text-black">
      <div className="m-5  bg-white">
        <form onSubmit={saveProduct}>
          <div className="flex flex-col my-5 gap-4">
            <div>
              <label
                htmlFor="Product_Name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                id="Product_Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="Product_image"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Image
              </label>

              <div className="flex gap-5">
                <CldUploadWidget
                  onSuccess={handleUploadSuccess}
                  uploadPreset="Ecomm-Uploads"
                >
                  {({ open }) => {
                    function handleOnClick(e) {
                      e.preventDefault();
                      open();
                    }

                    return (
                      <Button className="button" onClick={handleOnClick}>
                        Upload an Image
                      </Button>
                    );
                  }}
                </CldUploadWidget>

                {images && (
                  <CldImage
                    width="400"
                    height="400"
                    src={images}
                    sizes="100vw"
                    alt="Description of my image"
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="Product_Desc"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                type="textarea"
                value={desc}
                onChange={(ev) => setDesc(ev.target.value)}
                id="Product_Desc"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description"
                required
              />
            </div>
            <div>
              <label
                htmlFor="Product_Price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                id="Product_Price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Price"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
