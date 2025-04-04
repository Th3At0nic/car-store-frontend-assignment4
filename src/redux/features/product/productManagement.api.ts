import { TQueryParam, TResponseRedux } from "../../../types";
import { TCar } from "../../../types/bannerTypes";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/cars",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["cars"],
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getCarDetails: builder.query({
      query: (carId) => {
        return {
          url: `/cars/${carId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TCar>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    orderCar: builder.mutation({
      query: (data) => {
        return {
          url: "/orders/create-order",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetCarDetailsQuery,
  useOrderCarMutation,
} = productManagementApi;
