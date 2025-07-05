import { useParams, useNavigate } from "react-router";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { useGetSingleBookQuery } from "../../redux/api/baseApi";

export const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSingleBookQuery(id!);

  if (isLoading) return <Loading />;
  if (isError || !data)
    return <Error message="Failed to load book details or book not found." />;

  const book = data.data; 

  return (
    <div className="max-w-3xl mx-auto p-6 shadow rounded mt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 cursor-pointer"
      >
        &larr; Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="mb-2">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="mb-2">
        <strong>Genre:</strong> {book.genre}
      </p>
      <p className="mb-2">
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p className="mb-4">
        <strong>Description:</strong> {book.description}
      </p>
      <p className="mb-2">
        <strong>Copies:</strong> {book.copies}
      </p>
      <p className="mb-2">
        <strong>Availability:</strong>{" "}
        {book.available ? (
          <span className="text-green-600 font-semibold">Available</span>
        ) : (
          <span className="text-red-600 font-semibold">Unavailable</span>
        )}
      </p>
    </div>
  );
};
