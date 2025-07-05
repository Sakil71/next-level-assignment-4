import { useGetBorrowedSummaryQuery } from "../../redux/api/baseApi";

export const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowedSummaryQuery();

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load data</p>;

  return (
    <div className="p-2 mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Borrow Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full mx-auto border border-gray-300 divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Book Title</th>
              <th className="px-4 py-2 text-left">ISBN</th>
              <th className="px-4 py-2 text-left">Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.summary.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 font-semibold">{index + 1}.</td>
                <td className="px-4 py-2 font-semibold">{item.book.title}</td>
                <td className="px-4 py-2">{item.book.isbn}</td>
                <td className="px-4 py-2 font-semibold">
                  {item.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
