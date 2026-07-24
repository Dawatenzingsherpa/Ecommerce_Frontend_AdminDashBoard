import { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput.tsx";
import { addProduct, fetchCategory } from "../../../store/dataSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hook.ts";

export default function AddProductForm() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    description: "",
    productTotalStockQty: "",
    categoryId: "",
  });

  const [productImage, setProductImage] = useState<File | null>(null);

  const categoryOptions = categories.map((category) => ({
    value: category.id as string,
    label: category.categoryName,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      categoryId: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("description", formData.description);
    data.append("productTotalStockQty", formData.productTotalStockQty);
    data.append("categoryId", formData.categoryId);

    if (productImage) {
      data.append("image", productImage);
    }

    dispatch(addProduct(data));
  };

  return (
    <ComponentCard title="Add Product">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Product Name</Label>
          <Input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <Label>Product Price</Label>
          <Input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </div>

        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3"
            placeholder="Enter description"
          />
        </div>

        <div>
          <Label>Total Stock Quantity</Label>
          <Input
            type="number"
            name="productTotalStockQty"
            value={formData.productTotalStockQty}
            onChange={handleChange}
            placeholder="Enter stock quantity"
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select
            options={categoryOptions}
            placeholder="Select category"
            onChange={handleCategoryChange}
          />
        </div>

        <div>
          <Label>Product Image</Label>

          <FileInput onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </ComponentCard>
  );
}
