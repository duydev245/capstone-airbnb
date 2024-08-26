import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, message, Popconfirm, Table, Typography, Upload } from 'antd';
import {
  DeleteOutlined,
  PlusSquareOutlined,
  EditOutlined
} from "@ant-design/icons";
import React from 'react'
import dayjs from 'dayjs';
import { roomApi } from '../../../apis/room.api';

const RoomManagement = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-booking"],
    queryFn: () => roomApi.getListRoom(),
  });
  console.log("🚀 ~ RoomManagement ~ data:", data)

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
        return (
          <img
            src={record.hinhAnh}
            alt={record.tenViTri}
            className="w-full h-[140px] rounded-sm object-cover"
          />
        )
      },
    },
    // tenPhong
    {
      title: "Name",
      key: "tenPhong",
      dataIndex: "tenPhong",
    },
    // moTa
    {
      title: "Description",
      key: "moTa",
      render: (record) => {
        return (
          <Typography.Paragraph
            ellipsis={{
              rows: 4,
            }}
            className="w-[150px]"
          >
            {record.moTa}
          </Typography.Paragraph>
        );
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
              title: "Room Management",
              href: "",
            },
          ]}
        />

        <Button
          size="large"
          type="primary"
          onClick={() => {
            alert('add room');
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
        pagination={false}
        loading={isLoading}
      />
    </>
  )
}

export default RoomManagement
