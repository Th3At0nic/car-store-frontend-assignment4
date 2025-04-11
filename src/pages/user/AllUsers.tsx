import {
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "../../redux/features/user/userManagement.api";
import { Table, Button, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { TError, TQueryParam, TUser } from "../../types";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { toast } from "sonner";
import { useState } from "react";

type TDataType = {
  key: React.Key;
  name: string;
  role: string;
  email: string;
  deactivated: boolean;
};

const AllUsers = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: allUsersData,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery(params);

  const [changeUserStatus] = useChangeUserStatusMutation();

  const handleToggleUserStatus = async (userId: string) => {
    const result = await changeUserStatus(userId);
    if (result?.data?.success) {
      toast.success(result.data.message);
    } else if (result?.error) {
      toast.error((result?.error as TError)?.data.message);
    }
  };

  const tableData = allUsersData?.data?.map((user: TUser) => ({
    key: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    deactivated: user.deactivated,
  }));

  const columns: ColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "User",
          value: "user",
        },
      ],
    },
    {
      title: "Status",
      key: "deactivated",
      render: (_, record) => (
        <Tag color={record.deactivated ? "red" : "green"}>
          {record.deactivated ? "Deactivated" : "Active"}
        </Tag>
      ),
      filters: [
        {
          text: "Active",
          value: "false",
        },
        {
          text: "Deactivated",
          value: "true",
        },
      ],
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

  const onChange: TableProps<TDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.deactivated?.forEach((item) =>
        queryParams.push({ name: "deactivated", value: item })
      );

      filters.role?.forEach((item) =>
        queryParams.push({ name: "role", value: item })
      );
      setParams(queryParams);
    }
  };

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
          loading={{ spinning: isFetching, size: "large" }}
          columns={columns}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
          bordered
        />
      )}
    </div>
  );
};

export default AllUsers;
