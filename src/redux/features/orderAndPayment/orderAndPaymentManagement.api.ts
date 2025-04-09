import { TOrder, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const orderAndPaymentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderCar: builder.mutation({
      query: (data) => {
        return {
          url: "/orders/create-order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["orderStatus", "payment"],
    }),
    verifyPayment: builder.query({
      query: (orderId: string) => {
        return {
          url: `/payment/verifyPayment?order_id=${orderId}`,
          method: "GET",
        };
      },
    }),
    getMyOrders: builder.query({
      query: () => {
        return {
          url: "/orders",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getAnOrder: builder.query({
      query: (orderId: string) => {
        return {
          url: `/orders/${orderId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TOrder>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getMyPaymentHistory: builder.query({
      query: () => {
        return {
          url: `payment/history`,
          method: "GET",
        };
      },
      providesTags: ["payment"],
    }),
    getAllOrders: builder.query({
      query: () => {
        return {
          url: `/admin/orders`,
          method: "GET",
        };
      },
      providesTags: ["orderStatus"],
    }),
    updateOrderStatus: builder.mutation({
      query: (args) => {
        return {
          url: `/admin/orders/${args.orderId}`,
          method: "PATCH",
          body: args.updateStatusData,
        };
      },
      invalidatesTags: ["orderStatus", "payment"],
    }),
  }),
});

export const {
  useOrderCarMutation,
  useVerifyPaymentQuery,
  useGetMyOrdersQuery,
  useGetAnOrderQuery,
  useGetMyPaymentHistoryQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderAndPaymentManagementApi;
