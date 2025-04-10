import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/admin/users`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useRegisterUserMutation,
  useGetAllUsersQuery,
} = userManagementApi;
