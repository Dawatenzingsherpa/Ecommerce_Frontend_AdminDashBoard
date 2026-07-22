import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { useEffect } from "react";
import {
  fetchCategory,
  fetchOrders,
  fetchProducts,
  fetchUsers,
} from "../../../store/dataSlice";
import { OrderStatus } from "../../../Types/DataTypes";

export default function BasicTableOne() {
  const dispatch = useAppDispatch();
  const { products, orders, categories, users } = useAppSelector(
    (state) => state.data,
  );
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchCategory());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  User
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Role
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  User ID
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Joined
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Updated
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                >
                  {/* User */}
                  <TableCell className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {user.username.charAt(0).toUpperCase()}
                      </div>

                      {/* User Info */}
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {user.username}
                        </p>

                        <p className="text-theme-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="px-5 py-4">
                    <Badge
                      size="sm"
                      color={user.role === "admin" ? "primary" : "success"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  {/* User ID */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {user.id.slice(0, 8)}...
                  </TableCell>

                  {/* Joined */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {new Date(user.createdAt as string).toLocaleDateString()}
                  </TableCell>

                  {/* Updated */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {new Date(user.updatedAt as string).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600">
                        Edit
                      </button>

                      <button className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Product
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Price
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Stock
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Owner
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Created
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {products.map((product) => (
                <TableRow key={product?.id}>
                  {/* Product */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg border bg-gray-100">
                        <img
                          src={product?.imageUrl}
                          alt={product?.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white">
                          {product?.productName}
                        </p>

                        <p className="max-w-xs truncate text-gray-500 text-theme-xs dark:text-gray-400">
                          {product?.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    <Badge size="sm" color="primary">
                      {product?.Category.categoryName}
                    </Badge>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="px-5 py-4 text-theme-sm font-medium text-gray-700 dark:text-white">
                    ${product?.productPrice.toLocaleString()}
                  </TableCell>

                  {/* Stock */}
                  <TableCell className="px-5 py-4">
                    <Badge
                      size="sm"
                      color={
                        product?.productTotalStockQty > 20
                          ? "success"
                          : product?.productTotalStockQty > 5
                            ? "warning"
                            : "error"
                      }
                    >
                      {product?.productTotalStockQty} pcs
                    </Badge>
                  </TableCell>

                  {/* Owner */}
                  <TableCell className="px-5 py-4 text-theme-sm">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {product?.User.username}
                      </p>

                      <p className="text-gray-500 text-theme-xs">
                        {product?.User.email}
                      </p>
                    </div>
                  </TableCell>

                  {/* Created */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {new Date(product?.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Order ID
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Username
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Phone Number
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Shipping Address
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Total Amount
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Payment ID
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  PIDX
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Payment Method
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Payment Status
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Order Status
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Created
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Updated
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                >
                  {/* Order ID */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {order.id}
                  </TableCell>

                  {/* Username */}
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-900/30">
                        {order.User?.username?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {order.User?.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.User?.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Phone */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {order.phoneNumber}
                  </TableCell>

                  {/* Shipping Address */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {order.shippingAddress}
                  </TableCell>

                  {/* Total */}
                  <TableCell className="px-5 py-4 font-medium text-gray-800 dark:text-white">
                    Rs. {order.totalAmount}
                  </TableCell>

                  {/* Payment ID */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {order.paymentId}
                  </TableCell>

                  {/* PIDX */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {order.Payment?.pidx}
                  </TableCell>

                  {/* Payment Method */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {order.Payment?.paymentMethod}
                  </TableCell>

                  {/* Payment Status */}
                  <TableCell className="px-5 py-4 text-center">
                    <Badge
                      color={
                        order.Payment?.paymentStatus === "paid"
                          ? "success"
                          : "warning"
                      }
                      size="sm"
                    >
                      {order.Payment?.paymentStatus}
                    </Badge>
                  </TableCell>

                  {/* Order Status */}
                  <TableCell className="px-5 py-4 text-center">
                    <Badge
                      color={
                        order.orderStatus === OrderStatus.Delivered
                          ? "success"
                          : order.orderStatus === OrderStatus.Pending
                            ? "warning"
                            : order.orderStatus === OrderStatus.Cancelled
                              ? "error"
                              : "info"
                      }
                      size="sm"
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>

                  {/* Created */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {new Date(order.createdAt as string).toLocaleDateString()}
                  </TableCell>

                  {/* Updated */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {new Date(order.updatedAt as string).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600">
                        Edit
                      </button>

                      <button className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Category ID
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Created
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Updated
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-center font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {categories.map((category) => (
                <TableRow
                  key={category.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                >
                  {/* Category */}
                  <TableCell className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg dark:bg-blue-900/30">
                        📦
                      </div>

                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {category.categoryName}
                        </p>

                        <p className="text-theme-xs text-gray-500">
                          Product Category
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* ID */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {category?.id}
                  </TableCell>

                  {/* Created */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {new Date(
                      category?.createdAt as string,
                    ).toLocaleDateString()}
                  </TableCell>

                  {/* Updated */}
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {new Date(
                      category?.updatedAt as string,
                    ).toLocaleDateString()}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-5 py-4 text-center">
                    <Badge color="success" size="sm">
                      Active
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600">
                        Edit
                      </button>

                      <button className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
