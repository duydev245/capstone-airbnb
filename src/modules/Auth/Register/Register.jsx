import { useMutation } from "@tanstack/react-query";
import { Col, DatePicker, Form, Input, Radio, Row, Typography, message, } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { userApi } from "../../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const Register = () => {
  const schema = yup.object({
    email: yup
      .string()
      .trim()
      .required("*Email không được bỏ trống")
      .email("*Email không hợp lệ"),
    password: yup
      .string()
      .trim()
      .required("*Mật khẩu không được bỏ trống"),
    confirmPassword: yup
      .string()
      .trim()
      .required("*Xác nhận mật khẩu không được bỏ trống")
      .oneOf([yup.ref("password")], "Xác Nhận Mật Khẩu Sai"),
    name: yup.string().trim().required("*Họ và tên không được bỏ trống"),
    phone: yup
      .string()
      .trim()
      .required("*Số điện thoại không được bỏ trống")
      .matches(/^[0-9]+$/, "*Số điện thoại không được là kí tự")
      .min(9, "*Số điện thoại phải trên 9 kí tự")
      .max(15, "*Số điện thoại không được quá 15 kí tự"),
    birthday: yup
      .string()
      .nullable()
      .required("*Ngày sinh nhật không được bỏ trống"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      birthday: null,
      gender: true,
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: handleRegister } = useMutation({
    mutationFn: (payload) => userApi.register(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: "Đăng ký thành công",
        type: "success",
        duration: 3,
      });
      setTimeout(() => navigate(PATH.LOGIN, { state: { userData: data } }), (1500))
    },
    onError: (error) => {
      messageApi.open({
        content: error.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const onSubmit = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone,
      birthday: values.birthday,
      gender: values.gender,
      role: "USER",
    };
    handleRegister(payload);
  };

  const { Title } = Typography;
  return (
    <div className="container">
      {contextHolder}
      <div className="mt-3 mb-3 text-center">
        <Typography className="text-black">
          <Title level={2}>Đăng ký tài khoản airbnb</Title>
        </Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[40, 3]}>
          {/* Email */}
          <Col span={24}>
            <label className="text-base text-black">*Email:</label>
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
            {errors?.email && (
              <>
                {" "}
                <span className="mt-1 text-base text-red-500">
                  {errors.email.message}
                </span>
              </>
            )}
          </Col>
          {/* Mật khẩu */}
          <Col span={24}>
            <label className="text-base text-black">*Mật khẩu:</label>
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
            {errors?.password && (
              <span className="mt-1 text-base text-red-500">
                {" "}
                {errors.password.message}
              </span>
            )}
          </Col>
          {/* Xác nhận mật khẩu */}
          <Col span={24}>
            <label className="text-base text-black">*Xác nhận mật khẩu:</label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => {
                return (
                  <Input.Password
                    {...field}
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập lại mật khẩu..."
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    status={errors.confirmPassword ? "error" : ""}
                  />
                );
              }}
            />
            {errors?.confirmPassword && (
              <>
                {" "}
                <span className="mt-1 text-base text-red-500">
                  {errors.confirmPassword.message}
                </span>
              </>
            )}
          </Col>
          {/* Họ và tên */}
          <Col span={24}>
            <label className="text-base text-black">*Họ và tên:</label>
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
            {errors?.name && (
              <span className="mt-1 text-base text-red-500">
                {" "}
                {errors.name.message}
              </span>
            )}
          </Col>
          {/* Số điện thoại */}
          <Col span={24}>
            <label className="text-base text-black">*Số điện thoại:</label>
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
            {errors?.phone && (
              <span className="mt-1 text-base text-red-500">
                {" "}
                {errors.phone.message}
              </span>
            )}
          </Col>
          {/* Ngày Sinh Nhật */}
          <Col span={12}>
            <label className="block text-base text-black">*Ngày sinh nhật:</label>
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
            {errors.birthday && (
              <span className="mt-1 text-base text-red-500">
                {" "}
                {errors.birthday.message}
              </span>
            )}
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

          <Col span={24} className="mt-3">
            <Typography className="text-sm text-black">
              Đã có tài khoản?{" "}
              <span
                className="text-blue-400 font-medium cursor-pointer"
                onClick={() => navigate(PATH.LOGIN)}
              >
                Đăng nhập
              </span>
            </Typography>
          </Col>

          <Col span={24}>
            <button
              className="btn-theme"
              type="submit"
            >
              Đăng ký
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
