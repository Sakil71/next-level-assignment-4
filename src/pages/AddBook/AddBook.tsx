import { useState } from "react";
import { useCreateBookMutation } from "../../redux/api/baseApi";
import { useNavigate } from "react-router";
import type { IBook } from "../../types";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    } catch (err) {
      console.error("Failed to create book:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Add A New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "author", "genre", "isbn"].map((field) => (
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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};


