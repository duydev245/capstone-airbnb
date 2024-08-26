import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, message, Popconfirm, Table, Upload } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
  UploadOutlined
} from "@ant-design/icons";
import React, { useState } from 'react'
import { locationApi } from '../../../apis/location.api';
import { useOpenModal } from '../../../hooks/useOpenModal';
import AddLocationModal from './AddLocationModal';
import EditLocationModal from './EditLocationModal';

const LocationManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [idEdit, setIdEdit] = useState(0);

  const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal();
  const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useOpenModal();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-location"],
    queryFn: () => locationApi.getLocation(),
  });

  // Add location
  const { mutate: handleAddLocationApi, isPending: isCreating } = useMutation({
    mutationFn: (payload) => locationApi.addLocation(payload),
  });

  // Update location
  const { mutate: handleUpdateLocationApi, isPending: isUpdating } = useMutation({
    mutationFn: (payload) => locationApi.updateLocation(payload),
  });

  // Delete user
  const { mutate: handleDeleteLocationApi, isPending: isDeleting } = useMutation({
    mutationFn: (id) => locationApi.deleteLocation(id),
    onSuccess: () => {
      messageApi.open({
        content: "Xóa vị trí thành công",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["list-location"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log("🚀 ~ LocationManagement ~ error:", error)
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  //Upload hình Ảnh
  const { mutate: handleUpload } = useMutation({
    mutationFn: (payload) => locationApi.uploadImgLocation(payload.idLocation, payload.formData),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["list-location"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log("🚀 ~ LocationManagement ~ error:", error)
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const dataSource = data || [];

  const columns = [
    // ID
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    // hinhAnh
    {
      title: "Image",
      key: "hinhAnh",
      render: (record) => {
        return record.hinhAnh && (
          <img
            src={record.hinhAnh}
            alt={record.tenViTri}
            className="w-[200px] h-[140px] rounded-sm object-cover"
          />
        );
      },
    },
    // tenViTri
    {
      title: "Location name",
      key: "tenViTri",
      dataIndex: "tenViTri",
    },
    // tinhThanh
    {
      title: "City / Province",
      key: "user-email",
      dataIndex: "tinhThanh",
    },
    // quocGia
    {
      title: "Nation",
      key: "quocGia",
      dataIndex: "quocGia",
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
              description="Are you sure to delete this location?"
              onConfirm={() => { handleDeleteLocationApi(record.id) }}
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

  const handleSubmit = (values) => {
    const payload = {
      id: idEdit ? idEdit : 0,
      tenViTri: values.tenViTri,
      tinhThanh: values.tinhThanh,
      quocGia: values.quocGia,
    };

    if (idEdit) {
      handleUpdateLocationApi(payload, {
        onSuccess: () => {
          messageApi.open({
            content: "Cập nhật vị trí thành công",
            type: "success",
            duration: 3,
          });
          if (typeof values.hinhAnh !== "string") {
            const formData = new FormData();
            formData.append("formFile", values.hinhAnh);

            handleUpload({ idLocation: idEdit, formData });
          }
          closeEditModal();
          queryClient.refetchQueries({
            queryKey: ["list-location"],
            type: "active",
          });
        },
        onError: (error) => {
          console.log("🚀 ~ LocationManagement ~ error:", error)
          messageApi.open({
            content: error?.message,
            type: "error",
            duration: 3,
          });
        },
      });
    } else {
      handleAddLocationApi(payload, {
        onSuccess: (data) => {
          messageApi.open({
            content: "Thêm vị trí thành công",
            type: "success",
            duration: 3,
          });
          const idLocation = data?.id;
          if (values.hinhAnh && idLocation) {
            const formData = new FormData();
            formData.append("formFile", values.hinhAnh);
            handleUpload({ idLocation, formData });
          }
          closeAddModal();
          queryClient.refetchQueries({
            queryKey: ["list-location"],
            type: "active",
          });
        },
        onError: (error) => {
          console.log("🚀 ~ LocationManagement ~ error:", error)
          messageApi.open({
            content: error?.message,
            type: "error",
            duration: 3,
          });
        },
      });
    }
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
              title: "Location Management",
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
          <PlusSquareOutlined />
        </Button>
      </div>

      <h3 className="font-medium text-3xl mb-3">List Location</h3>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={isLoading}
      />

      <AddLocationModal
        key={"add"}
        isOpen={isOpenAddModal}
        isPending={isCreating}
        onCloseModal={closeAddModal}
        onSubmit={handleSubmit}
      />

      <EditLocationModal
        key={"edit"}
        idEdit={idEdit}
        isOpen={isOpenEditModal}
        isPending={false}
        onCloseModal={closeEditModal}
        onSubmit={handleSubmit}
      />

    </>
  )
}

export default LocationManagement
