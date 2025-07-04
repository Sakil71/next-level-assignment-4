import { setSearchTerm } from "../redux/features/uiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

export const Searching = () => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.ui);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <input
      type="search"
      className="px-2 py-1 border rounded placeholder-shown:text-sm"
      name="search"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};
