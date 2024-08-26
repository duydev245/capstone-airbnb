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
  UserAddOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useState } from "react";
import { userApi } from "../../../apis/user.api";
import { useOpenModal } from "../../../hooks/useOpenModal";
import dayjs from 'dayjs';
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

const UserManagement = () => {
  const [idEdit, setIdEdit] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal();
  const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useOpenModal();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-user"],
    queryFn: () => userApi.getListUser(),
  });

  // Add user
  const { mutate: handleAddUserApi, isPending: isCreating } = useMutation({
    mutationFn: (payload) => userApi.addUser(payload),
    onSuccess: (data) => {
      console.log("🚀 ~ Add User ~ data:", data)
      messageApi.open({
        content: "Thêm user thành công",
        type: "success",
        duration: 3,
      });
      closeAddModal();
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
  const { mutate: handleUpdateUserApi, isPending: isUpdating } = useMutation({
    mutationFn: (payload) => userApi.updateUser(payload),
    onSuccess: (data) => {
      console.log("🚀 ~ Update User ~ data:", data);
      messageApi.open({
        content: "Update thông tin thành công",
        type: "success",
        duration: 3,
      });
      closeEditModal();
      setIdEdit('');
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
      render: (date) => {
        return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
      },
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
                setIdEdit(record.id)
                openEditModal();
              }}
              loading={isUpdating}
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
      id: idEdit ? idEdit : 0,
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone,
      birthday: values.birthday,
      gender: values.gender,
      role: values.role,
    };
    idEdit ? handleUpdateUserApi(payload) : handleAddUserApi(payload);
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
            openAddModal();
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

      <AddUserModal
        key={"add"}
        isOpen={isOpenAddModal}
        isPending={isCreating}
        onCloseModal={closeAddModal}
        onSubmit={handleSubmit}
      />

      <EditUserModal
        key={"edit"}
        idEdit={idEdit}
        isOpen={isOpenEditModal}
        isPending={isUpdating}
        onCloseModal={closeEditModal}
        onSubmit={handleSubmit}
      />

    </>
  );
};

export default UserManagement;
