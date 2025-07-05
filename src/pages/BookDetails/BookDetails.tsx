import { useParams, useNavigate } from "react-router";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { useGetSingleBookQuery } from "../../redux/api/baseApi";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetSingleBookQuery(id!);

  console.log(book);
  

  if (isLoading) return <Loading />;
  if (isError || !book)
    return <Error message="Failed to load book details or book not found." />;

  return (
    <div className="max-w-3xl mx-auto p-6 shadow rounded mt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 cursor-pointer"
      >
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{book.data.title}</h1>
      <p className="mb-2">
        <strong>Author:</strong> {book.data.author}
      </p>
      <p className="mb-2">
        <strong>Genre:</strong> {book.data.genre}
      </p>
      <p className="mb-2">
        <strong>ISBN:</strong> {book.data.isbn}
      </p>
      <p className="mb-4">
        <strong>Description:</strong> {book.data.description}
      </p>
      <p className="mb-2">
        <strong>Copies:</strong> {book.data.copies}
      </p>
      <p className="mb-2">
        <strong>Availability:</strong>{" "}
        {book.data.available ? (
          <span className="text-green-600 font-semibold">Available</span>
        ) : (
          <span className="text-red-600 font-semibold">Unavailable</span>
        )}
      </p>
    </div>
  );
};

export default BookDetails;
