import { useGetMyPaymentHistoryQuery } from "../../redux/features/orderAndPayment/orderAndPaymentManagement.api";
import { Table, Tag, Typography } from "antd";
import dayjs from "dayjs";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { NoDataCard } from "../../utils/NoDataCard";

const { Title } = Typography;

const UserPaymentHistory = () => {
  const { data: paymentHistory, isLoading } =
    useGetMyPaymentHistoryQuery(undefined);

  const columns = [
    {
      title: "Invoice No",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Amount (BDT)",
      dataIndex: "payableAmount",
      key: "payableAmount",
      render: (amount: number) => `৳${amount.toFixed(2)}`,
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (method: string) => (
        <Tag color="geekblue" className="capitalize">
          {method}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "bankStatus",
      key: "bankStatus",
      render: (status: string) => (
        <Tag color={status === "Success" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Paid At",
      dataIndex: "paidAt",
      key: "paidAt",
      render: (date: string) => dayjs(date).format("MMM D, YYYY - h:mm A"),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md min-h-[60vh]">
      <Title level={3} className="mb-6 text-center">
        My Payment History
      </Title>

      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <LoadingSpinner />
        </div>
      ) : paymentHistory?.data?.length > 0 ? (
        <Table
          dataSource={paymentHistory.data}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          bordered
          className="overflow-x-auto"
        />
      ) : (
        <div className="flex justify-center items-center h-[200px]">
          <NoDataCard title="Empty" description="No Payment History Found" />
        </div>
      )}
    </div>
  );
};

export default UserPaymentHistory;
