import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee } from "../../types/Employee";

type PaginatedResponse = {
  employees: Employee[];
  page: number;
  totalPages: number;
  totalEmployees: number;
};

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query<PaginatedResponse, { page: number }>({
      query: ({ page }) => ({
        url: `/employee?page=${page}&limit=10`,
        method: "GET",
      }),
      providesTags: ["Employees"],
    }),

    addEmployee: builder.mutation<void, Partial<Employee>>({
      query: (employeeData) => ({
        url: "/employee",
        method: "POST",
        body: employeeData,
      }),
      invalidatesTags: ["Employees"],
    }),

    editEmployee: builder.mutation<void, Partial<Employee> & { id: number }>({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: ({ id, created_at, updated_at, ...employeeData }) => ({
        url: `/employee/${id}`,
        method: "PUT",
        body: employeeData,
      }),
      invalidatesTags: ["Employees"],
    }),

    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
