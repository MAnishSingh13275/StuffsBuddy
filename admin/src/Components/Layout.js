import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/Components/Nav";


export default function Layout({children}) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={()=>signIn('google')} className="bg-white text-black p-2 rounded-lg">Login</button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-900 min-h-screen flex">
      <Nav/>
      <div className="bg-white flex-grow rounded-lg m-2 ml-0">
      {children}
      </div>
    </div>
  );
}
