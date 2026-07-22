import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Category,
  InitialState,
  OrderData,
  Product,
  User,
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
  },
});

export const { setStatus, setProducts, setOrders, setUsers, setCategories } =
  dataSlice.actions;
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
