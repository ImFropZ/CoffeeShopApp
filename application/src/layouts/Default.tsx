import { Link } from "react-router-dom";

interface DefaultProps {
  children: React.ReactNode;
}

function Default({ children }: DefaultProps) {
  return (
    <div className="absolute inset-0 grid h-screen grid-rows-[auto,1fr]">
      <header className="flex bg-slate-500 px-10 py-2">
        <img
          src="https://avatars.githubusercontent.com/u/46731773?v=4"
          alt="Logo"
          className="h-10"
        />
        <button className="ml-auto mr-4 font-bold text-red-600">Logout</button>
      </header>
      <div className="grid h-full grid-cols-[auto,1fr]">
        <div className="h-full bg-slate-400 px-2">
          <div className="mb-10 mt-4 flex gap-3 px-2">
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
              className="w-2/3 rounded bg-slate-300 py-1 text-center font-bold hover:bg-slate-200"
            >
              Dashboard
            </Link>
            <Link
              to={"/menu"}
              className="w-2/3 rounded bg-slate-300 py-1 text-center font-bold hover:bg-slate-200"
            >
              Menu
            </Link>
            <Link
              to={"/stock"}
              className="w-2/3 rounded bg-slate-300 py-1 text-center font-bold hover:bg-slate-200"
            >
              Stock
            </Link>
            <Link
              to={"/setting"}
              className="w-2/3 rounded bg-slate-300 py-1 text-center font-bold hover:bg-slate-200"
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
