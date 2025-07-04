import { useState } from "react";
import { useCreateBookMutation } from "../../redux/api/baseApi";
import { useNavigate } from "react-router";
import type { IBook } from "../../types";
import { Genre } from "../../types"; 
import toast from "react-hot-toast";

export const AddBook = () => {
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<IBook>>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const allGenre = Object.values(Genre);   

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook({
        ...formData,
        available: formData.copies === 0 ? false : true,
      }).unwrap();
      navigate("/book");
      toast.success("Book added successfull");
    } catch (err) {
      console.error("Failed to create book:", err);
      toast.error("Failed to added book");
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
              value={String(formData[field as keyof IBook] ?? "")}
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
