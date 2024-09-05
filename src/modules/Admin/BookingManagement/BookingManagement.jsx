import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, message, Popconfirm, Table, Typography, Upload } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import React, { useState } from 'react'
import { bookingApi } from '../../../apis/booking.api';
import dayjs from 'dayjs';
import AddBookingModal from './AddBookingModal';
import { useOpenModal } from '../../../hooks/useOpenModal';
import EditBookingModal from './EditBookingModal';

const BookingManagement = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [idUser, setIdUser] = useState(0);
  console.log('idUser: ', idUser);
  const [idBooked, setIdBooked] = useState(0);
  console.log('idBooked: ', idBooked);
  const queryClient = useQueryClient();
  const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal()
  const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useOpenModal();
  const { data: listBooking, isLoading, error } = useQuery({
    queryKey: ["list-booking"],
    queryFn: () => bookingApi.getListBooking(),
  });
  console.log('listBooking: ', listBooking);

  // Add booking
  const { mutate: handleAddBooking, isPending: isCreating } = useMutation({
    mutationFn: (payload) => bookingApi.postBookingRoom(payload),
    onSuccess: (payload) => {
      console.log('payload: ', payload);
      queryClient.refetchQueries({
        queryKey: ["list-booking"],
        type: 'active'
      });
      messageApi.open({
        content: " Thêm vé đặt thành công",
        type: 'success',
        duration: 3,
      })
      closeAddModal();
    },
    onError: (error) => {
      console.log('error: ', error);
      messageApi.open({
        content: " Thêm vé đặt thất bại",
        type: 'error',
        duration: 3,
      })
      closeAddModal();
    }

  })

  // Edit booked
  const { mutate: handleUpdateBooked, isPending: isUpdating } = useMutation({
    mutationFn: (payload) => bookingApi.updateBookedRoom(payload),
    onSuccess: (payload) => {
      console.log('data: ', payload);
      queryClient.refetchQueries({
        queryKey: ["list-booking"],
        type: 'active'
      });
      messageApi.open({
        content: "Cập nhật vé đặt thành công",
        type: "success",
        duration: 3,
      });
      closeEditModal();
      setIdUser("")
      setIdBooked("")
    },
    onError: (error) => {
      console.log('error: ', error);
      messageApi.open({
        content: "Cập nhật vé đặt thất bại",
        type: "error",
        duration: 3,
      });
      closeEditModal()
    }

  })

  // Delete Booked
  const { mutate: handleDeleteBooked, isPending: isDeleting } = useMutation({
    mutationFn: (idBooked) => bookingApi.deleteBookedRoom(idBooked),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["list-booking"],
        type: 'active'
      });
      messageApi.open({
        content: " Xóa lịch đặt phòng thành công",
        type: 'success',
        duration: 3,
      })
    },
    onError: (error) => {
      console.log('error: ', error);
      messageApi.open({
        content: " Xóa lịch đặt phòng thất bại",
        type: 'success',
        duration: 3,
      })
    }
  })

  const handleSubmit = (values) => {

    const payload = {
      id: idBooked ? idBooked : 0,
      maPhong: values.maPhong,
      maNguoiDung: values.maNguoiDung,
      ngayDen: values.ngayDen,
      ngayDi: values.ngayDi,
      soLuongKhach: values.soLuongKhach,
    }
    console.log(payload)

    if (idUser && idBooked) {
      handleUpdateBooked(payload)
    } else {
      handleAddBooking(payload)
    }
  }

  const dataSource = listBooking || [];

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  const columns = [
    // ID
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    // maNguoiDung
    {
      title: "Guest id",
      key: "maNguoiDung",
      dataIndex: "maNguoiDung",
    },
    // maPhong
    {
      title: "Room id",
      key: "maPhong",
      dataIndex: "maPhong",
    },
    // soLuongKhach
    {
      title: "Guest Quantity",
      key: "soLuongKhach",
      dataIndex: "soLuongKhach",
    },
    // ngayDen
    {
      title: "Check-in date",
      key: "ngayDen",
      dataIndex: "ngayDen",
      render: (date) => {
        return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
      },
    },
    // ngayDi
    {
      title: "Check-out date",
      key: "ngayDi",
      dataIndex: "ngayDi",
      render: (date) => {
        return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
      },
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
                setIdUser(record.maNguoiDung)
                setIdBooked(record.id)
                openEditModal()
              }}
              loading={false}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this booked?"
              onConfirm={() => {
                handleDeleteBooked(record.id)
              }}
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
              title: "Booking Management",
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

      <h3 className="font-medium text-3xl mb-3">List Booking</h3>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={true}
        loading={isLoading}
      />

      <AddBookingModal
        key={"add"}
        isOpen={isOpenAddModal}
        onCloseModal={closeAddModal}
        isPending={isCreating}
        onSubmit={handleSubmit}
      />

      <EditBookingModal
        key={"edit"}
        isOpen={isOpenEditModal}
        idUser={idUser}
        idBooked={idBooked}
        onCloseModal={closeEditModal}
        isPending={isUpdating}
        onSubmit={handleSubmit}
        setIdUser={setIdUser}
        setIdBooked={setIdBooked}
      />

    </>
  )
}

export default BookingManagement
