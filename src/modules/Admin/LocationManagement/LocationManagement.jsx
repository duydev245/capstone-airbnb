import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, message, Popconfirm, Table, Upload } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
  UploadOutlined
} from "@ant-design/icons";
import React from 'react'
import { locationApi } from '../../../apis/location.api';
import { useOpenModal } from '../../../hooks/useOpenModal';
import AddLocationModal from './AddLocationModal';

const LocationManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal();
  const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useOpenModal();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-location"],
    queryFn: () => locationApi.getLocation(),
  });

  // Add location
  const { mutate: handleAddLocationApi, isPending: isCreating } = useMutation({
    mutationFn: (payload) => locationApi.addLocation(payload),
    onSuccess: (data) => {
      console.log("🚀 ~ LocationManagement ~ data:", data)
      messageApi.open({
        content: "Thêm vị trí thành công",
        type: "success",
        duration: 3,
      });
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
    onSuccess: (data) => {
      messageApi.open({
        content: "Upload hình thành công",
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

  const props = {
    name: 'formFile',
    onChange(info, record) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const formData = new FormData();
        formData.append("formFile", info.file.originFileObj);

        console.log("🚀 ~ onChange ~ formData:", formData)
        // handleUpload({ idLocation: record.id, formData });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleOnChange = (data, record) => {    
    const formData = new FormData();
    formData.append("hinhAnh", data);

    // Or use this method for a clearer log
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    handleUpload({ idLocation: record.id, formData });
  }


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
        return record.hinhAnh ? (
          <img
            src={record.hinhAnh}
            alt={record.tenViTri}
            className="w-[120px] h-[140px] rounded-sm object-cover"
          />
        ) : (
          <Upload beforeUpload={() => false} onChange={({ file }) => handleOnChange(file, record)}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
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
                alert(record.id)
                console.log(record);

                // setDataEdit(record);
                // openModal();
              }}
              loading={false}
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
      tenViTri: values.tenViTri,
      tinhThanh: values.tinhThanh,
      quocGia: values.quocGia,
      hinhAnh: values.hinhAnh,
    };
    console.log("🚀 ~ handleSubmit ~ payload:", payload)
    handleAddLocationApi(payload)
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
        isOpen={isOpenAddModal}
        isPending={isCreating}
        onCloseModal={closeAddModal}
        onSubmit={handleSubmit}
      />

    </>
  )
}

export default LocationManagement
