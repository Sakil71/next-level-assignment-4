import { Link } from "react-router";

export const Navbar = () => {
  return (
    <div className="bg-green-600 text-white py-2">
      <div className="w-[95%] mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          <Link to={"/"}>📚 <span className="text-2xl">Library</span></Link>
        </h1>
        <ul className="flex gap-5 font-medium">
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
