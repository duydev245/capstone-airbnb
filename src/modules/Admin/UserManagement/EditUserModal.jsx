import { Button, Col, Form, Input, Modal, Row, Select, Typography, Radio, DatePicker } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { userApi } from "../../../apis/user.api";
import { useQuery } from "@tanstack/react-query";

const EditUserModal = ({
    isOpen,
    isPending,
    onCloseModal,
    onSubmit,
    idEdit
}) => {

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
        role: yup
            .string()
            .required("*Loại người dùng không được bỏ trống ! "),
    });

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            name: "",
            phone: "",
            role: "",
            birthday: null,
            gender: true,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const { data } = useQuery({
        queryKey: ["info-user", idEdit],
        queryFn: () => userApi.getInfoUser(idEdit),
        enabled: !!idEdit,
    });

    useEffect(() => {
        if (data) {
            setValue("email", data.email);
            setValue("password", data.password);
            setValue("name", data.name);
            setValue("phone", data.phone);
            setValue("birthday", data.birthday);
            setValue("gender", data.gender);
            setValue("role", data.role);
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
                    Edit user
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
                    {/* Role */}
                    <Col span={24}>
                        <label className="text-base block">
                            <span className="text-red-600">* </span>
                            Loại người dùng:
                        </label>
                        {errors.role && (
                            <span className="mt-1 text-base text-red-500">
                                {" "}
                                {errors.role.message}
                            </span>
                        )}
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className="mt-1"
                                    status={errors.role ? "error" : ""}
                                    style={{ width: `100%`, height: 45, display: "block" }}
                                    options={[
                                        { value: "USER", label: "User" },
                                        { value: "ADMIN", label: "Admin" },
                                    ]}
                                />
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
                            Update user
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default EditUserModal
