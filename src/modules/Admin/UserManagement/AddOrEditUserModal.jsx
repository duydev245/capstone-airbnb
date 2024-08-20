import { Button, Col, Form, Input, Modal, Row, Select, Typography, Radio, DatePicker } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";


const AddOrEditUserModal = ({
    isOpen,
    isPending,
    onCloseModal,
    dataEdit,
    onSubmit,
}) => {
    const schema = yup.object({
        email: yup
            .string()
            .trim()
            .required("*Email không được bỏ trống !")
            .email("*Email không hợp lệ !"),
        password: yup
            .string()
            .trim()
            .required("*Mật khẩu không được bỏ trống !"),
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
            password: "",
            confirmPassword: "",
            name: "",
            phone: "",
            role: "",
            birthday: null,
            gender: true,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    useEffect(() => {
        if (dataEdit) {
            setValue("email", dataEdit.email);
            setValue("password", dataEdit.password);
            setValue("name", dataEdit.name);
            setValue("phone", dataEdit.phone);
            setValue("birthday", dataEdit.birthday);
            setValue("gender", dataEdit.gender);
            setValue("role", dataEdit.maLoaiNguoiDung);
        }
    }, [dataEdit, setValue]);

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
                    {dataEdit ? "Edit user" : "Add user"}
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
                        <label className="text-base text-black">*Email:</label>
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
                    {/* Mật khẩu */}
                    <Col span={24}>
                        <label className="text-base text-black">*Mật khẩu:</label>
                        {errors?.password && (
                            <span className="mt-1 text-base text-red-500">
                                {" "}
                                {errors.password.message}
                            </span>
                        )}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input.Password
                                        {...field}
                                        type="password"
                                        size="large"
                                        className="mt-1"
                                        placeholder="Vui lòng nhập mật khẩu..."
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                        status={errors.password ? "error" : ""}
                                    />
                                );
                            }}
                        />
                    </Col>
                    {/* Họ và tên */}
                    <Col span={24}>
                        <label className="text-base text-black">*Họ và tên:</label>
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
                        <label className="text-base text-black">*Số điện thoại:</label>
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
                        <label className="block text-base text-black">*Ngày Sinh Nhật:</label>
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
                                    placeholder="YYYY-MM-DD"
                                    status={errors.birthday ? "error" : ""}
                                    format={"YYYY-MM-DD"}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(date) =>
                                        field.onChange(date ? date.format("YYYY-MM-DD") : null)
                                    }
                                />
                            )}
                        />
                    </Col>
                    {/* Gender */}
                    <Col span={12}>
                        <label className="block text-base text-black">*Giới Tính:</label>
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
                            *Loại người dùng
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
                                    disabled={!!dataEdit}
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
                            {dataEdit ? "Edit user" : "Add user"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddOrEditUserModal;
