import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const activeLink = "bg-white text-black p-2 rounded-l-md";
  const router = useRouter();
  const { pathname } = router;
  return (
    <aside className="min-h-screen w-[15vw]">
      <div className="flex flex-col rounded-r-3xl py-5 overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
        </div>
        <div className="flex flex-col ml-4">
          <Link
            href={"/"}
            className={
              pathname === "/"
                ? activeLink
                : "" +
                  "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white"
            }
          >
            <span className=" text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            href={"/products"}
            className={
              pathname.includes("/products")
                ? activeLink
                : "" +
                  "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white"
            }
          >
            <span className=" text-sm font-medium">Products</span>
          </Link>
          <Link
            href={"/categories"}
            className={
              pathname.includes("/categories")
                ? activeLink
                : "" +
                  "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white"
            }
          >
            <span className={"text-sm font-medium"}>Categories</span>
          </Link>
          <Link
            href={"/orders"}
            className={
              pathname.includes("/orders")
                ? activeLink
                : "" +
                  "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white"
            }
          >
            <span className={" text-sm font-medium"}>Orders</span>
          </Link>
          <Link
            href={"/settings"}
            className={
              pathname.includes("/settings")
                ? activeLink
                : "" +
                  "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-white"
            }
          >
            <span className={"text-sm font-medium"}>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
