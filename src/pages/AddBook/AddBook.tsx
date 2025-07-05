import { useNavigate } from "react-router";
import { useCreateBookMutation } from "../../redux/api/baseApi";
import { Genre, type IBook } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addBook, resetForm } from "../../redux/features/formSlice";
import toast from "react-hot-toast";

export const AddBook = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formData = useAppSelector((state) => state.addBookForm);

  const [createBook] = useCreateBookMutation();
  const allGenre = Object.values(Genre);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "copies" ? parseInt(value) : value;

    dispatch(
      addBook({
        field: name as keyof Partial<IBook>, 
        value: parsedValue,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook({
        ...formData,
        available: formData.copies === 0 ? false : true,
      }).unwrap();
      dispatch(resetForm());
      toast.success("Book added successfully");
      navigate("/book");
    } catch (err) {
      console.error("Failed to create book:", err);
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Add A New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "author", "isbn"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              name={field}
              required
              value={String(formData[field as keyof typeof formData] ?? "")}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium">Genre</label>
          <select
            name="genre"
            value={formData.genre || ""}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Select genre
            </option>
            {allGenre.map((genre) => (
              <option key={genre} value={genre}>
                {genre.charAt(0) + genre.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            rows={2}
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Copies</label>
          <input
            name="copies"
            type="number"
            min={0}
            value={formData.copies ?? 1}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};
