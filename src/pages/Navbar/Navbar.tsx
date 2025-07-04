import { Link } from "react-router";

export const Navbar = () => {
  return (
    <div className="bg-red-700 text-white py-2">
      <div className="w-[95%] mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>Library</Link>
        </h1>
        <ul className="flex gap-5">
          <li>
            <Link to={"/book"}>Book</Link>
          </li>
          <li>
            <Link to={"/add-book"}>Add Book</Link>
          </li>
          <li>
            <Link to={"/borrow-book-summery"}>Borrow summary</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
