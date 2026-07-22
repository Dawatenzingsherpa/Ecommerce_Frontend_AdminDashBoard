import { ChangeEvent, FormEvent, useState } from "react";
import { Category } from "../../Types/DataTypes";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { createCategory } from "../../store/dataSlice";
import { useNavigate } from "react-router";
import { Status } from "../../Types/AuthTypes";

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.data);
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>({
    categoryName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(category as Category));
    if (status === Status.SUCCESS) {
      alert("category created successfully");
      navigate("/");
    }
  };
  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Create Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div>
            <label
              htmlFor="categoryName"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category Name
            </label>

            <input
              id="categoryName"
              type="text"
              placeholder="Enter category name"
              name="categoryName"
              value={category.categoryName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-white dark:focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-white/[0.1] dark:text-gray-300 dark:hover:bg-white/[0.05]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
