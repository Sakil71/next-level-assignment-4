import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router";
import { Searching } from "../../components/Searching";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="text-black shadow">
      <div className="w-[95%] mx-auto flex justify-between items-center py-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" onClick={closeMenu}>
            📚 <span className="text-xl">Library</span>
          </Link>
        </h1>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li>
            <Link to="/book">Book</Link>
          </li>
          <li>
            <Link to="/add-book">Add Book</Link>
          </li>
          <li>
            <Link to="/borrow-book-summery">Borrow Summary</Link>
          </li>
        </ul>

        <Searching></Searching>

        {/* Mobile menu icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <MdClose /> : <MdMenu />}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-3 px-6 pb-4 text-black shadow">
          <li>
            <Link to="/book" onClick={closeMenu}>
              Book
            </Link>
          </li>
          <li>
            <Link to="/add-book" onClick={closeMenu}>
              Add Book
            </Link>
          </li>
          <li>
            <Link to="/borrow-book-summery" onClick={closeMenu}>
              Borrow Summary
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
