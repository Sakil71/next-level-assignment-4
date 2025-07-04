import { useGetBooksQuery } from "../redux/api/baseApi";
import { setPage } from "../redux/features/uiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, limit } = useAppSelector((state) => state.ui);
  const { data: books } = useGetBooksQuery({ page: currentPage, limit });

  const total = books?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
