import { Button, Col, Form, Input, Modal, Row, Typography, Upload } from 'antd'
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { locationApi } from '../../../apis/location.api';
import { useQuery } from '@tanstack/react-query';

const EditLocationModal = ({ isOpen, onCloseModal, onSubmit, isPending, idEdit }) => {

  const schema = yup.object({
    tenViTri: yup.string()
      .trim()
      .required("*Tên vị trí không được bỏ trống !"),
    tinhThanh: yup.string()
      .trim()
      .required("*Tỉnh thành không được bỏ trống !")
      .matches(/^[^\d]*$/, "*Tỉnh thành không được chứa số !"),
    quocGia: yup.string()
      .trim()
      .required("*Quốc gia không được bỏ trống !")
      .matches(/^[^\d]*$/, "*Quốc gia không được chứa số !"),
    hinhAnh: yup
      .mixed()
      .nullable()
      .required("*Hình ảnh không được bỏ trống !"),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: undefined,
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });
  
  const [imageUpload, setImageUpload] = useState(undefined);
  const watchHinhAnh = watch("hinhAnh");
  console.log("🚀 ~ EditLocationModal ~ imageUpload:", imageUpload)
  console.log("🚀 ~ EditLocationModal ~ watchHinhAnh:", watchHinhAnh)
  console.log("🚀 ~ EditLocationModal ~ errors:", errors)
  
  const getErrorMessage = (error) => {
    if (!error) return undefined;
    if (typeof error === "string") return error;
    if ("message" in error) return error.message;
    return undefined;
  };

  const { data } = useQuery({
    queryKey: ["info-location", idEdit],
    queryFn: () => locationApi.getInfoLocation(idEdit),
    enabled: !!idEdit,
  });


  useEffect(() => {
    setValue("hinhAnh", imageUpload);
  }, [imageUpload])

  useEffect(() => {
    if (data) {
      setValue("id", data.id);
      setValue("tenViTri", data.tenViTri);
      setValue("tinhThanh", data.tinhThanh);
      setValue("quocGia", data.quocGia);
      setImageUpload(data.hinhAnh);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, []);

  return (
    <Modal
      open={isOpen}
      title={
        <Typography className="text-2xl font-medium">
          Edit Location
        </Typography>
      }
      centered
      onCancel={() => {
        onCloseModal();
        data?.hinhAnh && setImageUpload(data.hinhAnh);
      }}
      footer={null}
      width={700}
    >
      <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 24]}>

          {/* id */}
          <Col span={24}>
            <label className="text-base text-black">
              <span className="text-red-600">* </span>
              Mã Vị Trí:
            </label>
            <Controller
              name="id"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    disabled={!!idEdit}
                  />
                );
              }}
            />
          </Col>

          {/* tenViTri */}
          <Col span={24}>
            <label className="text-base text-black">
              <span className="text-red-600">* </span>
              Tên Vị Trí:
            </label>
            {errors?.tenViTri && (
              <span className="mt-1 text-base text-red-500">
                {" "}
                {errors.tenViTri.message}
              </span>
            )}
            <Controller
              name="tenViTri"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập tên vị trí..."
                    status={errors.tenViTri ? "error" : ""}
                  />
                );
              }}
            />
          </Col>

          {/* tinhThanh */}
          <Col span={24}>
            <label className="text-base text-black">
              <span className="text-red-600">* </span>
              Tỉnh Thành:
            </label>
            {errors?.tinhThanh && (
              <span className="mt-1 text-base text-red-500">
                {" "}
                {errors.tinhThanh.message}
              </span>
            )}
            <Controller
              name="tinhThanh"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập tỉnh thành..."
                    status={errors.tinhThanh ? "error" : ""}
                  />
                );
              }}
            />
          </Col>

          {/* quocGia */}
          <Col span={24}>
            <label className="text-base text-black">
              <span className="text-red-600">* </span>
              Quốc gia:
            </label>
            {errors?.quocGia && (
              <span className="mt-1 text-base text-red-500">
                {" "}
                {errors.quocGia.message}
              </span>
            )}
            <Controller
              name="quocGia"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập quốc gia..."
                    status={errors.quocGia ? "error" : ""}
                  />
                );
              }}
            />
          </Col>

          {/* hinhAnh */}
          <Col span={24}>
            <label className="text-base text-black">
              <span className="text-red-600">* </span>
              Hình Ảnh:
            </label>
            {errors.hinhAnh && (
              <span className="mt-1 text-base text-red-500">
                {" "}
                {getErrorMessage(errors.hinhAnh)}
              </span>
            )}
            <Controller
              control={control}
              name="hinhAnh"
              render={({ field: { onChange, ...field } }) => {
                return (
                  <Upload
                    {...field}
                    multiple={false}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader w-fit"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={({ file }) => {
                      onChange(file);
                    }}
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      {watchHinhAnh || imageUpload ? (
                        <div className="relative w-full h-full">
                          <img
                            className="w-[105px] h-[105px] rounded-lg"
                            src={
                              imageUpload ||
                              (watchHinhAnh instanceof File
                                ? URL.createObjectURL(watchHinhAnh)
                                : undefined)
                            }
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          />

                          <div
                            className="absolute top-1 right-1 cursor-pointer text-red-500 text-base"
                            onClick={(event) => {
                              event.stopPropagation();
                              setValue("hinhAnh", undefined);
                              setImageUpload(undefined);
                            }}
                          >
                            <DeleteOutlined />
                          </div>
                        </div>
                      ) : (
                        <>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </>
                      )}
                    </button>
                  </Upload>
                );
              }}
            />
          </Col>

          <Col span={24} className="flex justify-end">
            <Button size="large" type="default" onClick={() => {
              onCloseModal();
              data?.hinhAnh && setImageUpload(data.hinhAnh);
            }}>
              Cancel
            </Button>
            <Button
              loading={isPending}
              htmlType="submit"
              size="large"
              type="primary"
              className="ml-3"
            >
              Update location
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default EditLocationModal
