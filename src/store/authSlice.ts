import { createSlice, isAction, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import {
  AuthState,
  LoginData,
  RegisterData,
  Status,
  User,
} from "../Types/AuthTypes";
import APIAuthenticated from "../http";

const initialState: AuthState = {
  user: {} as User,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setStatus(state: AuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setToken(state: AuthState, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
    resetStatus(state: AuthState) {
      state.status = Status.LOADING;
    },
  },
});

export const { setUser, setStatus, setToken, resetStatus } = authSlice.actions;
export default authSlice.reducer;

export function userRegistration(data: RegisterData) {
  return async function userRegistrationThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await APIAuthenticated.post("register", data);
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

export function userLogin(data: LoginData) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await APIAuthenticated.post("login", data);
      if (response) {
        const token = response.data.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setToken(token));
        localStorage.setItem("token", token);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
