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
  OrderStatus,
  PaymentStatus,
} from "../Types/DataTypes";
import { Status } from "../Types/AuthTypes";
import { AppDispatch } from "./store";
import APIAuthenticated, { APIAuthForm } from "../http";

const initialState: InitialState = {
  products: [],
  orders: [],
  categories: [],
  users: [],
  singleOrder: {} as OrderData,
  searchItem: "",
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
        (item) => item.id === action.payload.productId,
      );

      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    setDeleteCategory(
      state: InitialState,
      action: PayloadAction<DeleteCategory>,
    ) {
      const index = state.categories.findIndex(
        (item) => item.id === action.payload.categoryId,
      );

      if (index !== -1) {
        state.categories.splice(index, 1);
      }
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
    setAddProduct(state: InitialState, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    setAddCategory(state: InitialState, action: PayloadAction<Category>) {
      state.categories.push(action.payload);
    },
    setSingleOrder(state: InitialState, action: PayloadAction<OrderData>) {
      state.singleOrder = action.payload;
    },
    setSearchItem(state: InitialState, action: PayloadAction<string>) {
      state.searchItem = action.payload;
    },
  },
});

export const {
  setStatus,
  setProducts,
  setSearchItem,
  setOrders,
  setUsers,
  setCategories,
  setDeleteProduct,
  setDeleteCategory,
  setDeleteOrder,
  setDeleteUser,
  setAddProduct,
  setAddCategory,
  setSingleOrder,
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
        dispatch(setAddCategory(response.data.data));
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

export function addProduct(data: FormData) {
  return async function addProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthForm.post("admin/product", data);
      if (response) {
        dispatch(setAddProduct(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        setStatus(Status.ERROR);
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchSingleOrder(id: string) {
  return async function fetchSingleThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get(`order/admin/${id}`);
      if (response) {
        dispatch(setSingleOrder(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function changeOrderStatus(id: string, orderStatus: OrderStatus) {
  return async function changeOrderStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(`order/admin/${id}`, {
        orderStatus,
      });
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

export function changePaymentStatus(id: string, paymentStatus: PaymentStatus) {
  return async function changePaymentStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(
        `order/admin/payment/${id}`,
        { paymentStatus },
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
