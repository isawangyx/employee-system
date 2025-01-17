import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UserCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  username: string;
  password: string;
  departmentId: number;
};

type AuthResponse = {
  token: string;
  type: "Bearer";
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080", // Replace with your actual backend base URL
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, UserCredentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<void, RegisterData>({
      query: (registerData) => ({
        url: "/register",
        method: "POST",
        body: registerData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
