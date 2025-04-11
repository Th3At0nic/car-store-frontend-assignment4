import {
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "../../redux/features/user/userManagement.api";
import { Table, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TUser } from "../../types";
import LoadingSpinner from "../../utils/LoadingSpinner";

const AllUsers = () => {
  const { data: allUsersData, isLoading } = useGetAllUsersQuery(undefined);
  const [changeUserStatus] = useChangeUserStatusMutation();

  const handleToggleUserStatus = async (userId: string) => {
    const result = await changeUserStatus(userId);
    console.log("usr stts result: ", result);
  };

  const tableData = allUsersData?.data?.map((user: TUser) => ({
    key: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    deactivated: user.deactivated,
  }));

  const columns: ColumnsType<TUser> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={role === "admin" ? "geekblue" : "green"}
          className="capitalize"
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "deactivated",
      render: (_, record) => (
        <Tag color={record.deactivated ? "red" : "green"}>
          {record.deactivated ? "Deactivated" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        if (record.role === "admin") {
          return <span className="text-gray-400 italic">Not allowed</span>;
        }

        return (
          <Button
            size="small"
            type={record.deactivated ? "primary" : "default"}
            danger={!record.deactivated}
            onClick={() => handleToggleUserStatus(record.key)}
          >
            {record.deactivated ? "Activate" : "Deactivate"}
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-center" style={{ marginBottom: "30px" }}>
        <h2 className="text-3xl font-semibold">All Users</h2>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table
          dataSource={tableData || []}
          columns={columns}
          pagination={{ pageSize: 10 }}
          bordered
        />
      )}
    </div>
  );
};

export default AllUsers;
