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
    }),
  }),
});

export const {
  useOrderCarMutation,
  useVerifyPaymentQuery,
  useGetMyOrdersQuery,
  useGetAnOrderQuery,
  useGetMyPaymentHistoryQuery,
} = orderAndPaymentManagementApi;
