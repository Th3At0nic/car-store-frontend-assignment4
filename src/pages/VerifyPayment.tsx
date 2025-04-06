// orderVerify.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyPaymentQuery } from "../redux/features/product/productManagement.api";
import LoadingSpinner from "../utils/LoadingSpinner";
import { NoDataCard } from "../utils/NoDataCard";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useVerifyPaymentQuery(orderId!, {
    skip: !orderId,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) {
    return (
      <NoDataCard
        title="❌ Something went wrong"
        description="Please check your internet connection or contact support."
      />
    );
  }

  if (data.success) {
    const payment = data.data.length ? data.data[0] : data.data;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-green-500 text-center">
            {data.message}
          </h2>
          <div className="mt-6 space-y-4">
            <p className="text-lg text-gray-800">
              <strong>Order ID:</strong>{" "}
              {/* i did this more dynamic because the value could be coming in two form, both camelCase and snake case. any one each time */}
              {payment.customerOrderId ?? payment.customer_order_id}
            </p>
            <p className="text-lg text-gray-800">
              <strong>Amount Paid:</strong> {payment.amount} BDT
            </p>
            <p className="text-lg text-gray-800">
              <strong>Payment Method:</strong> {payment.method ?? "null"}
            </p>
            <p className="text-lg text-gray-800">
              <strong>Status:</strong>{" "}
              {payment.bankStatus || payment.bank_status}
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 px-4 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mt-10">
      <h2>❌ {data.message || "Payment Failed"}</h2>
      <p>Please try again or contact support.</p>
      <button onClick={() => navigate("/")}>Contact Support</button>
    </div>
  );
};

export default VerifyPayment;
