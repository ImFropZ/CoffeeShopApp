import { Link } from "react-router-dom";

interface DefaultProps {
  children: React.ReactNode;
}

function Default({ children }: DefaultProps) {
  return (
    <div className="absolute inset-0 grid h-screen grid-rows-[auto,1fr]">
      <header className="flex bg-gray-700 p-3 shadow">
        <img src="assets/logo/logo_name@3x.png" alt="Logo" className="h-10" />
        <button className="ml-auto mr-4 font-bold text-red-600">Logout</button>
      </header>
      <div className="grid h-full grid-cols-[auto,1fr]">
        <div className="h-full border-r-2 bg-slate-100 px-2">
          <div className="my-4 flex gap-3 px-2">
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
          <nav className="flex flex-col items-center gap-5 border-t-2 border-slate-700 pt-5">
            <Link
              to={"/"}
              className="w-4/5 rounded bg-slate-200 py-2 text-center font-bold text-slate-800 hover:bg-slate-300"
            >
              Dashboard
            </Link>
            <Link
              to={"/menu"}
              className="w-4/5 rounded bg-slate-200 py-2 text-center font-bold text-slate-800 hover:bg-slate-300"
            >
              Menu
            </Link>
            <Link
              to={"/stock"}
              className="w-4/5 rounded bg-slate-200 py-2 text-center font-bold text-slate-800 hover:bg-slate-300"
            >
              Stock
            </Link>
            <Link
              to={"/setting"}
              className="w-4/5 rounded bg-slate-200 py-2 text-center font-bold text-slate-800 hover:bg-slate-300"
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
