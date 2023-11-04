import { Link } from "react-router-dom";

interface DefaultProps {
  children: React.ReactNode;
}

function Default({ children }: DefaultProps) {
  return (
    <div className="grid grid-rows-[auto,1fr] absolute inset-0">
      <header className="flex py-2 bg-slate-500 px-10">
        <img
          src="https://avatars.githubusercontent.com/u/46731773?v=4"
          alt="Logo"
          className="h-10"
        />
        <button className="ml-auto mr-4 text-red-600 font-bold">Logout</button>
      </header>
      <div className="grid grid-cols-[auto,1fr] h-full">
        <div className="bg-slate-400 h-full px-2">
          <div className="flex mb-10 mt-4 gap-3 px-2">
            <img
              src="https://avatars.githubusercontent.com/u/46731773?v=4"
              alt="#"
              className="aspect-square rounded-lg shadow"
              width={50}
              height={50}
            />
            <div>
              <h1 className="font-bold">Username</h1>
              <p>Permission</p>
            </div>
          </div>
          <nav className="flex flex-col items-center gap-5">
            <Link
              to={"/"}
              className="bg-slate-300 w-2/3 py-1 text-center font-bold rounded hover:bg-slate-200"
            >
              Dashboard
            </Link>
            <Link
              to={"/menu"}
              className="bg-slate-300 w-2/3 py-1 text-center font-bold rounded hover:bg-slate-200"
            >
              Menu
            </Link>
            <Link
              to={"/stock"}
              className="bg-slate-300 w-2/3 py-1 text-center font-bold rounded hover:bg-slate-200"
            >
              Stock
            </Link>
            <Link
              to={"/setting"}
              className="bg-slate-300 w-2/3 py-1 text-center font-bold rounded hover:bg-slate-200"
            >
              Setting
            </Link>
          </nav>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Default;
