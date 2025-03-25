import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllCars: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: "/cars",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["cars"],
    //   transformResponse: (response: TResponseRedux<any>) => {
    //     return {
    //       data: response?.data,
    //       meta: response?.meta,
    //     };
    //   },
    // }),
    // getAStudent: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `/students/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TStudent>) => {
    //     return {
    //       data: response?.data,
    //       meta: response?.meta,
    //     };
    //   },
    // }),
    // addStudent: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/create-student",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["students"],
    // }),
    // updateStudent: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/students/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["students"],
    // }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = userManagementApi;
