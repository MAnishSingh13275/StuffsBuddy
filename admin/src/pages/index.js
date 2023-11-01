import Layout from "@/Components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (<Layout>
    <div className="text-black">
      <div className="flex justify-between">
        <h2>Hello, {session?.user?.name} </h2>
        <div>
          <img src={session?.user?.image} alt="" className="w-6 h-6" />
        </div>
      </div>
    </div>
  </Layout>);
}
