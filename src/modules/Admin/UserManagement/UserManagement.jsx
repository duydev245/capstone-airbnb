import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  message,
  Popconfirm,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { userApi } from "../../../apis/user.api";
import { useOpenModal } from "../../../hooks/useOpenModal";
import AddOrEditUserModal from "./AddOrEditUserModal";

const UserManagement = () => {
  const [dataEdit, setDataEdit] = useState(undefined);

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { isOpen, openModal, closeModal } = useOpenModal();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-user"],
    queryFn: () => userApi.getListUser(),
  });

  // Add user
  const { mutate: handleAddUserApi, isPending: isCreating } = useMutation({
    mutationFn: (payload) => userApi.addUser(payload),
    onSuccess: (data) => {
      console.log("🚀 ~ UserManagement ~ data:", data);
      messageApi.open({
        content: "Thêm user thành công",
        type: "success",
        duration: 3,
      });
      closeModal();
      queryClient.refetchQueries({
        queryKey: ["list-user"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log("🚀 ~ UserManagement ~ error:", error?.message);
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // Update User
  // const { mutate: handleUpdateUserApi, isPending: isUpdating } = useMutation({
  //   mutationFn: (payload: FormData) => userApi.updateUser(payload),
  //   onSuccess: (data) => {
  //     console.log("🚀 ~ UserManagement ~ data:", data);
  //     messageApi.open({
  //       content: "Update user thành công",
  //       type: "success",
  //       duration: 3,
  //     });
  //     closeModal();
  //     queryClient.refetchQueries({
  //       queryKey: ["list-user", { currentPage }],
  //       type: "active",
  //     });
  //   },
  //   onError: (error: any) => {
  //     console.log("🚀 ~ UserManagement ~ error:", error?.message);
  //     messageApi.open({
  //       content: error?.message,
  //       type: "error",
  //       duration: 3,
  //     });
  //   },
  // });

  // Delete user
  const { mutate: handleDeleteUserApi, isPending: isDeleting } = useMutation({
    mutationFn: (idUser) => userApi.deleteUser(idUser),
    onSuccess: () => {
      messageApi.open({
        content: "Xóa user thành công",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["list-user"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log("🚀 ~ UserManagement ~ error:", error);
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const columns = [
    // Account ID
    {
      title: "Account ID",
      key: "user-account",
      dataIndex: "id",
    },
    // name
    {
      title: "Full Name",
      key: "full-name",
      dataIndex: "name",
    },
    // Email
    {
      title: "Email",
      key: "user-email",
      dataIndex: "email",
    },
    // Gender
    {
      title: "Gender",
      key: "user-gender",
      dataIndex: "gender",
      render: (_, { gender }) => {
        return gender ? <Tag>Male</Tag> : <Tag>Female</Tag>;
      },
    },
    // Birthday
    {
      title: "Birthday",
      key: "User-birthday",
      dataIndex: "birthday",
    },
    // role
    {
      title: "Type User",
      key: "type-user",
      dataIndex: "role",
      render: (_, { role }) => (
        <Tag>{role}</Tag>
      ),
    },
    // Action
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                setDataEdit(record);
                openModal();
              }}
              loading={false}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this user?"
              onConfirm={() => { handleDeleteUserApi(record.id) }}
              onCancel={() => { }}
              placement="left"
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger disabled={isDeleting}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const dataSource = data || [];

  const handleSubmit = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone,
      birthday: values.birthday,
      gender: values.gender,
      role: values.role,
    };
    // dataEdit ? handleUpdateUserApi(formData) :
    handleAddUserApi(payload);
  };

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "User Management",
              href: "",
            },
          ]}
        />

        <Button
          size="large"
          type="primary"
          onClick={() => {
            setDataEdit(undefined)
            openModal();
          }}
        >
          <UserAddOutlined />
        </Button>
      </div>

      <h3 className="font-medium text-3xl mb-3">List User</h3>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={true}
        loading={isLoading}
      />

      <AddOrEditUserModal
        key={dataEdit ? "edit" : "add"}
        dataEdit={dataEdit}
        isOpen={isOpen}
        isPending={isCreating }
        onCloseModal={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default UserManagement;
