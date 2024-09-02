import React, { useEffect } from 'react'
import dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';

const InfoModal = (
    {
        data,
        isOpen,
        onCloseModal,
        isPending,
        handleUpdateUserApi,
    }
) => {
    const schema = yup.object({
        email: yup
            .string()
            .trim()
            .required("*Email không được bỏ trống !")
            .email("*Email không hợp lệ !"),
        name: yup.string().trim().required("*Họ và tên không được bỏ trống !"),
        phone: yup
            .string()
            .trim()
            .required("*Số điện thoại không được bỏ trống !")
            .matches(/^[0-9]+$/, "*Số điện thoại không được là kí tự !")
            .min(9, "*Số điện thoại phải trên 9 kí tự !")
            .max(15, "*Số điện thoại không được quá 15 kí tự !"),
        birthday: yup
            .string()
            .nullable()
            .required("*Ngày Sinh Nhật không được bỏ trống ! "),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: data?.email || "",
            name: data?.name || "",
            phone: data?.phone || "",
            birthday: data?.birthday || null,
            gender: data?.gender,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    useEffect(() => {
        if (data && isOpen) {
            setValue("email", data?.email);
            setValue("name", data?.name);
            setValue("phone", data?.phone);
            setValue("birthday", data?.birthday);
            setValue("gender", data?.gender);
        } else if (!isOpen) {
            reset();
        }
    }, [data, isOpen, setValue, reset]);

    const onSubmit = (values) => {
        const payload = {
            id: data.id,
            email: values.email,
            name: values.name,
            phone: values.phone,
            birthday: values.birthday,
            gender: values.gender,
        };
        // console.log("🚀 ~ onSubmit ~ payload:", payload)
        handleUpdateUserApi(payload);
    };

    return (
        <Modal
            open={isOpen}
            title={
                <Typography className="text-xl font-medium">
                    Chỉnh sửa hồ sơ
                </Typography>
            }
            centered
            onCancel={onCloseModal}
            footer={null}
            width={700}
        >
            <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[48, 24]}>
                    {/* Email */}
                    <Col span={24}>
                        <label className="text-base text-black">
                            <span className="text-red-600">* </span>
                            Email:
                        </label>
                        {errors?.email && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.email.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name="email"
                            control={control}

                            render={({ field }) => {
                                return (
                                    <Input
                                        {...field}
                                        type="text"
                                        size="large"
                                        className="mt-1"
                                        placeholder="Vui lòng nhập email..."
                                        status={errors.email ? "error" : ""}
                                    />
                                );
                            }}
                        />
                    </Col>
                    {/* Họ và tên */}
                    <Col span={24}>
                        <label className="text-base text-black">
                            <span className="text-red-600">* </span>
                            Họ và tên:
                        </label>
                        {errors?.name && (
                            <span className="mt-1 text-base text-red-500">
                                {" "}
                                {errors.name.message}
                            </span>
                        )}
                        <Controller
                            name="name"
                            control={control}

                            render={({ field }) => {
                                return (
                                    <Input
                                        {...field}
                                        type="text"
                                        size="large"
                                        className="mt-1"
                                        placeholder="Vui lòng nhập họ và tên..."
                                        status={errors.name ? "error" : ""}
                                    />
                                );
                            }}
                        />
                    </Col>
                    {/* Số điện thoại */}
                    <Col span={24}>
                        <label className="text-base text-black">
                            <span className="text-red-600">* </span>
                            Số điện thoại:
                        </label>
                        {errors?.phone && (
                            <span className="mt-1 text-base text-red-500">
                                {" "}
                                {errors.phone.message}
                            </span>
                        )}
                        <Controller
                            name="phone"

                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input
                                        {...field}
                                        type="text"
                                        size="large"
                                        className="mt-1"
                                        placeholder="Vui lòng nhập số điện thoại..."
                                        status={errors.phone ? "error" : ""}
                                    />
                                );
                            }}
                        />
                    </Col>
                    {/* Ngày Sinh Nhật */}
                    <Col span={12}>
                        <label className="block text-base text-black">
                            <span className="text-red-600">* </span>
                            Ngày Sinh Nhật:
                        </label>
                        {errors.birthday && (
                            <span className="mt-1 text-base text-red-500">
                                {" "}
                                {errors.birthday.message}
                            </span>
                        )}
                        <Controller
                            name="birthday"
                            control={control}

                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    size="large"
                                    className="mt-1 w-full"
                                    placeholder="DD/MM/YYYY"
                                    status={errors.birthday ? "error" : ""}
                                    format={"DD/MM/YYYY"}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(date) =>
                                        field.onChange(date ? date : null)
                                    }
                                />
                            )}
                        />
                    </Col>
                    {/* Gender */}
                    <Col span={12}>
                        <label className="block text-base text-black">
                            <span className="text-red-600">* </span>
                            Giới Tính:</label>
                        <Controller
                            name="gender"

                            control={control}
                            render={({ field }) => (
                                <Radio.Group {...field} className="mt-1" defaultValue={false}>
                                    <Radio value={true}>Male</Radio>
                                    <Radio value={false}>Female</Radio>
                                </Radio.Group>
                            )}
                        />
                    </Col>

                    <Col span={24} className="flex justify-end">
                        <Button size="large" type="default" onClick={onCloseModal}>
                            Cancel
                        </Button>
                        <Button
                            loading={isPending}
                            htmlType="submit"
                            size="large"
                            type="primary"
                            className="ml-3"
                        >
                            Cập nhật
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default InfoModal
