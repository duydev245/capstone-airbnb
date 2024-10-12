import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, message, Popconfirm, Table, Typography } from 'antd';
import {
  DeleteOutlined,
  PlusSquareOutlined,
  EditOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined
} from "@ant-design/icons";
import React, { useState } from 'react'
import { roomApi } from '../../../apis/room.api';
import AddRoomModal from './AddRoomModal';
import { useOpenModal } from '../../../hooks/useOpenModal';
import EditRoomModal from './EditRoomModal';

const RoomManagement = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const [idEdit, setIdEdit] = useState(0);
  const [values, setFormValues] = useState();

  const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal();
  const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useOpenModal();

  const queryClient = useQueryClient();

  const { data: listRooms, isLoading, error } = useQuery({
    queryKey: ["list-rooms"],
    queryFn: () => roomApi.getListRoom(),
  });

  //Add Room
  const { mutate: handleAddRoomApi, isPending: isCreating } = useMutation({
    mutationFn: (payload) => roomApi.addRoom(payload),
    onSuccess: (payload) => {

      queryClient.refetchQueries({
        queryKey: ["list-rooms"],
        type: 'active'
      });

      messageApi.open({
        content: "Thêm phòng thành công",
        type: "success",
        duration: 3,
      });

      const idRoom = payload?.id;

      if (values.hinhAnh && idRoom) {
        const formData = new FormData();
        formData.append("formFile", values.hinhAnh);
        handleUploadImg({ idRoom, formData });
      }

      closeAddModal();
    },

    onError: (error) => {
      console.log('error: ', error);
      messageApi.open({
        content: "Thêm phòng thất bại",
        type: "error",
        duration: 3,
      });
      closeAddModal();
    }
  })

  //Edit Room
  const { mutate: handleUpdateRoomApi, isPending: isUpdating } = useMutation({
    mutationFn: (payload) => roomApi.updateRoom(payload),
    onSuccess: () => {
      messageApi.open({
        content: "Cập nhật vị trí thành công",
        type: "success",
        duration: 3,
      });
      if (typeof values.hinhAnh !== "string") {
        const formData = new FormData();
        formData.append("formFile", values.hinhAnh);

        handleUploadImg({ idRoom: idEdit, formData });
      }
      closeEditModal();
      queryClient.refetchQueries({
        queryKey: ["list-rooms"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log(error)
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  })

  //Delete Room 
  const { mutate: handleDeleteRoomApi, isPending: isDeleting } = useMutation({
    mutationFn: (idRoom) => roomApi.deleteRoom(idRoom),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["list-rooms"],
        type: 'active'
      });
      messageApi.open({
        content: "Xóa phòng thành công",
        type: "success",
        duration: 3,
      });
    },
    onError: (error) => {
      console.log('error: ', error);
      messageApi.open({
        content: "Xóa phòng thất bại",
        type: "error",
        duration: 3,
      });
    }
  })

  // Upload Img
  const { mutate: handleUploadImg } = useMutation({
    mutationFn: (payload) => roomApi.uploadImgRoom(payload.idRoom, payload.formData),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["list-rooms"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log('error: ', error);
    }
  })

  const handleSubmit = (values) => {
    console.log('values: ', values);
    setFormValues(values)
    const payload = {
      id: idEdit ? idEdit : 0,
      maViTri: values.maViTri,
      tenPhong: values.tenPhong,
      moTa: values.moTa,
      khach: values.khach,
      giuong: values.giuong,
      phongNgu: values.phongNgu,
      phongTam: values.phongTam,
      tivi: values.tivi,
      wifi: values.wifi,
      mayGiat: values.mayGiat,
      banLa: values.banLa,
      dieuHoa: values.dieuHoa,
      bep: values.bep,
      doXe: values.doXe,
      hoBoi: values.hoBoi,
      giaTien: values.giaTien,
    }

    if (idEdit) {
      handleUpdateRoomApi(payload);
    } else {
      handleAddRoomApi(payload);
    }
  }

  const dataSource = listRooms || [];

  const columns = [
    // ID
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    // hinhAnh
    {
      width: 500,
      title: "Image",
      key: "hinhAnh",
      render: (record) => {
        return (
          <img
            src={record.hinhAnh}
            alt={record.tenViTri}
            className="w-full rounded-sm object-cover"
          />
        )
      },
    },
    // MaViTri
    {
      title: "Location Code",
      width: 100,
      key: "maViTri",
      render: (record) => {
        return (
          <Typography className=''>
            {record.maViTri}
          </Typography>
        )
      }
    },
    // tenPhong
    {
      title: "Name",
      key: "tenPhong",
      dataIndex: "tenPhong",
      width: 200,
    },
    // moTa
    {
      title: "Description",
      key: "moTa",
      width: 300,
      render: (record) => {
        return (
          <Typography.Paragraph
            ellipsis={{
              rows: 3,
            }}
          >
            {record.moTa}
          </Typography.Paragraph>
        );
      },
    },
    // Option
    {
      title: "Option",
      width: 200,
      render: (record) => {
        return (
          <Typography>
            <ul className=''>
              <li>khách: {record.khach}</li>
              <li>giường: {record.giuong}</li>
              <li>phòng ngủ: {record.phongNgu}</li>
              <li>phòng tắm: {record.phongTam}</li>
            </ul>
          </Typography>
        )
      },
    },
    //Amenities
    {
      title: "Amenities",
      width: 200,
      render: (record) => {
        return (
          <Typography>
            <ul>
              <li>Tivi: {record.tivi ? (<CheckSquareOutlined style={{ color: 'green' }} />) : (<CloseSquareOutlined style={{ color: 'red' }} />)}</li>
              <li>Wifi: {record.wifi ? (<CheckSquareOutlined style={{ color: 'green' }} />) : (<CloseSquareOutlined style={{ color: 'red' }} />)}</li>
              <li>Máy giặt: {record.mayGiat ? (<CheckSquareOutlined style={{ color: 'green' }} />) : (<CloseSquareOutlined style={{ color: 'red' }} />)}</li>
              <li>Bàn là: {record.banLa ? (<CheckSquareOutlined style={{ color: 'green' }} />) : (<CloseSquareOutlined style={{ color: 'red' }} />)}</li>
              <li>Điều hòa: {record.dieuHoa ? (<CheckSquareOutlined style={{ color: 'green' }} />) : (<CloseSquareOutlined style={{ color: 'red' }} />)}</li>
              <li>Bếp: {record.bep ? (<CheckSquareOutlined style={{ color: 'green' }} />) : (<CloseSquareOutlined style={{ color: 'red' }} />)}</li>
              <li>Đỗ xe: {record.doXe ? (<CheckSquareOutlined style={{ color: 'green' }} />) : (<CloseSquareOutlined style={{ color: 'red' }} />)}</li>
              <li>Hồ bơi: {record.hoBoi ? (<CheckSquareOutlined style={{ color: 'green' }} />) : (<CloseSquareOutlined style={{ color: 'red' }} />)}</li>
            </ul>
          </Typography>
        )
      },
    },
    // Price
    {
      width: 150  ,
      title: "Price",
      key: "giaTien",
      render: (record) => {
        return (
          <Typography>
            {record.giaTien} $
          </Typography>
        )
      }
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
                openEditModal()
              }}
              loading={isUpdating}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete room"
              description="Are you sure to delete this room?"
              onConfirm={() => handleDeleteRoomApi(record.id)}
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
              title: "Room Management",
              href: "",
            },
          ]}
        />

        <Button
          size="large"
          type="primary"
          onClick={() => {
            openAddModal()
          }}
        >
          <PlusSquareOutlined />
        </Button>
      </div>

      <h3 className="font-medium text-3xl mb-3">List Room</h3>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={true}
        loading={isLoading}
      />

      <AddRoomModal
        key={"add"}
        isOpen={isOpenAddModal}
        onCloseModal={closeAddModal}
        isPending={isCreating}
        onSubmit={handleSubmit}
      />
      <EditRoomModal
        key={"edit"}
        idEdit={idEdit}
        isOpen={isOpenEditModal}
        setIdEdit={setIdEdit}
        isPending={false}
        onCloseModal={closeEditModal}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default RoomManagement
