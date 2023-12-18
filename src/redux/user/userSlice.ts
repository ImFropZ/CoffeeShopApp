import {
  getProfile,
  login as authLogin,
  updateProfile as authUpdateProfile,
} from "@/lib/axios/auth";
import { roleSchema } from "@/schema";
import { loginSchema } from "@/schema/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as z from "zod";

type User = {
  isLogin: boolean;
  username: string;
  email: string | null;
  picture: {
    url: string;
  };
  role: z.infer<typeof roleSchema>;
  fullName: string;
};

const initialState: User = {
  isLogin: false,
  fullName: "",
  username: "",
  email: "",
  picture: {
    url: "",
  },
  role: "USER",
};

export const initUser = createAsyncThunk("user/me", async () => {
  const user = await getProfile();
  return user;
});

export const login = createAsyncThunk(
  "user/login",
  async (data: z.infer<typeof loginSchema>) => {
    const { accessToken, tokenType } = await authLogin(data);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("tokenType", tokenType);
    return await getProfile();
  },
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data: FormData) => {
    const user = await authUpdateProfile(data);
    return user;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenType");
      state.isLogin = false;
    },
  },
  extraReducers(builders) {
    builders.addCase(initUser.fulfilled, (state, action) => {
      const { fullName, email, role, username, picture } = action.payload;

      state.fullName = fullName;
      state.username = username;
      state.email = email;
      state.isLogin = true;
      state.role = role;
      state.picture.url = picture.url;
    });
    builders.addCase(initUser.rejected, (state) => {
      state.isLogin = false;
    });
    builders.addCase(login.fulfilled, (state, action) => {
<<<<<<< HEAD
      const { fullName, email, role, username, picture } = action.payload;
      state.isLogin = true;

      state.fullName = fullName;
      state.username = username;
      state.email = email;
      state.isLogin = true;
      state.role = role;
      state.picture.url = picture.url;
=======
      state.isLogin = true;

      state.fullName = action.payload.fullName;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
>>>>>>> cf82b8e98c0da99b8d85a2d6b775d0b170072f1c
    });
    builders.addCase(login.rejected, (state) => {
      state.isLogin = false;
    });
    builders.addCase(updateProfile.fulfilled, (state, action) => {
      const { fullName, email, role, username, picture } = action.payload;

      state.fullName = fullName;
      state.username = username;
      state.email = email;
      state.role = role;
      state.picture.url = picture.url;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
