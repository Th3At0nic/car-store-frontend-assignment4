import { TQueryParam } from "../../../types";
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
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/admin/users`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    changeUserStatus: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useRegisterUserMutation,
  useGetAllUsersQuery,
  useChangeUserStatusMutation,
} = userManagementApi;
