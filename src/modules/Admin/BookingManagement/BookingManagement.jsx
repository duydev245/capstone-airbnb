import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, message, Popconfirm, Table, Typography, Upload } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React from 'react'
import { bookingApi } from '../../../apis/booking.api';
import dayjs from 'dayjs';

const BookingManagement = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-booking"],
    queryFn: () => bookingApi.getListBooking(),
  });

  const dataSource = data || [];

  const columns = [
    // ID
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    // ngayDi
    {
      title: "Departure date",
      key: "ngayDi",
      dataIndex: "ngayDi",
      render: (date) => {
        return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
      },
    },
    // ngayDen
    {
      title: "Arrival date",
      key: "ngayDen",
      dataIndex: "ngayDen",
      render: (date) => {
        return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
      },
    },
    // soLuongKhach
    {
      title: "Guest Quantity",
      key: "soLuongKhach",
      dataIndex: "soLuongKhach",
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
              }}
              loading={false}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this location?"
              onConfirm={() => {
                alert(record.id)
              }}
              onCancel={() => { }}
              placement="left"
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger disabled={false}>
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
      </div>

      <h3 className="font-medium text-3xl mb-3">List Booking</h3>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={isLoading}
      />

    </>
  )
}

export default BookingManagement
