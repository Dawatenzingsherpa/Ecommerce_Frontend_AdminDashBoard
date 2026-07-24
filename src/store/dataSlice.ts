import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Category,
  DeleteCategory,
  DeleteProduct,
  DeleteOrder,
  InitialState,
  OrderData,
  Product,
  User,
  DeleteUser,
} from "../Types/DataTypes";
import { Status } from "../Types/AuthTypes";
import { AppDispatch } from "./store";
import APIAuthenticated from "../http";

const initialState: InitialState = {
  products: [],
  orders: [],
  categories: [],
  users: [],
  status: Status.LOADING,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setStatus(state: InitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProducts(state: InitialState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setOrders(state: InitialState, action: PayloadAction<OrderData[]>) {
      state.orders = action.payload;
    },
    setUsers(state: InitialState, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setCategories(state: InitialState, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    setDeleteProduct(
      state: InitialState,
      action: PayloadAction<DeleteProduct>,
    ) {
      const index = state.products.findIndex(
        (item) => (item.id = action.payload.productId),
      );
      state.products.splice(index, 1);
    },
    setDeleteCategory(
      state: InitialState,
      action: PayloadAction<DeleteCategory>,
    ) {
      const index = state.categories.findIndex(
        (item) => (item.id = action.payload.categoryId),
      );
      state.categories.splice(index, 1);
    },
    setDeleteOrder(state: InitialState, action: PayloadAction<DeleteOrder>) {
      const index = state.orders.findIndex(
        (item) => item.id === action.payload.orderId,
      );

      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },
    setDeleteUser(state: InitialState, action: PayloadAction<DeleteUser>) {
      const index = state.users.findIndex(
        (item) => item.id === action.payload.userId,
      );

      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
  },
});

export const {
  setStatus,
  setProducts,
  setOrders,
  setUsers,
  setCategories,
  setDeleteProduct,
  setDeleteCategory,
  setDeleteOrder,
  setDeleteUser,
} = dataSlice.actions;
export default dataSlice.reducer;

export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("admin/user");
      if (response) {
        dispatch(setUsers(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchProducts() {
  return async function fetchProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("admin/product");
      if (response) {
        dispatch(setProducts(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchOrders() {
  return async function fetchOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("order/admin");
      if (response) {
        dispatch(setOrders(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCategory() {
  return async function fetchCategoriesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("admin/category");
      if (response) {
        dispatch(setCategories(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function createCategory(category: Category) {
  return async function createCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("admin/category", category);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteProduct(productId: DeleteProduct["productId"]) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete(
        "admin/product/" + productId,
      );
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteCategory(categoryId: DeleteCategory["categoryId"]) {
  return async function deleteCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete(
        "admin/category/" + categoryId,
      );
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteOrder(orderId: DeleteOrder["orderId"]) {
  return async function deleteOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("order/admin/" + orderId);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteUser(userId: DeleteUser["userId"]) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("/admin/user/" + userId);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
