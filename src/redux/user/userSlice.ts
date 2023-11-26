import {
  getProfile,
  login as authLogin,
  logout as authLogout,
} from "@/lib/axios/auth";
import { roleSchema } from "@/schema";
import { loginSchema } from "@/schema/auth";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as z from "zod";

type User = {
  isLogin: boolean;
  username: string;
  email: string | null;
  picture: {
    url: string;
  };
  role: z.infer<typeof roleSchema>;
};

const initialState: User = {
  isLogin: false,
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
    await authLogin(data);
    initUser();
  },
);

export const logout = createAsyncThunk("user/logout", async () => {
  await authLogout();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      const { email, isLogin, picture, username } = action.payload;

      state.username = username;
      state.email = email;
      state.picture = picture;
      state.isLogin = isLogin;
    },
  },
  extraReducers(builders) {
    builders.addCase(initUser.fulfilled, (state, action) => {
      const { email, role, username } = action.payload;

      state.username = username;
      state.email = email;
      state.isLogin = true;
      state.role = role;
    });
    builders.addCase(initUser.rejected, (state) => {
      state.isLogin = false;
    });
    builders.addCase(login.fulfilled, (state) => {
      state.isLogin = true;
    });
    builders.addCase(login.rejected, (state) => {
      state.isLogin = false;
    });
    builders.addCase(logout.fulfilled, (state) => {
      state.isLogin = false;
    });
    builders.addCase(logout.rejected, (state) => {
      state.isLogin = false;
    });
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
