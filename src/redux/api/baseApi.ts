import { RootState } from "./../store";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logoutUser, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { TError } from "../../types";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://car-store-backend-assignment2.vercel.app/api", // http://localhost:5000
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs, // 'args' type (URL string or an object with method, headers, body, etc.)
  unknown, // Return type (usually inferred)
  FetchBaseQueryError // Error type
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    setTimeout(() => {
      toast.error("not found", {
        duration: 2000,
      });
    }, 1000);
  }

  if (result?.error?.status === 409) {
    setTimeout(() => {
      toast.error(
        (result.error as TError)?.data?.message || "Duplicate Error",
        {
          duration: 2000,
        }
      );
    }, 1000);
  }

  if (result?.error?.status === 401) {
    if (
      (result?.error as TError).data.message === "This Email is not Registered."
    ) {
      toast.error((result?.error as TError).data.message + "  SIGN UP", {
        duration: 4000,
      });
    } else {
      // Request a new token
      const refreshResult = await fetch(
        "https://car-store-backend-assignment2.vercel.app/api/auth/refresh-token", //http://localhost:5000
        {
          method: "POST",
          credentials: "include",
        }
      ).then((response) => response.json());

      if (refreshResult?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;

        api.dispatch(
          setUser({
            user,
            token: refreshResult.data.accessToken,
          })
        );

        // calling the base query again to auto reload the page/query to capture the result after accessing the new access token and authorization, it doesn't visually reloads the page, it update the state internally without reloading the page
        result = await baseQuery(args, api, extraOptions);
      } else {
        setTimeout(() => {
          toast.error("Session expired. Please log in again.", {
            duration: 2000,
          });
          api.dispatch(logoutUser());
        }, 2100);
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["cars", "orders", "payment", "users", "revenue"],
  endpoints: () => ({}),
});
