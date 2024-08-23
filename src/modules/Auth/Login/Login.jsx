import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Typography, message, } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { userApi } from "../../../apis/user.api";
import { setUser } from "../../../redux/slices/user.slice";
import { setLocalStorage } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

const Login = () => {
  const schema = yup.object({
    email: yup
      .string()
      .trim()
      .email("*Email không đúng định dạng !")
      .required("*Email không được bỏ trống !"),
    password: yup.string().trim().required("*Mật khẩu không được bỏ trống !"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: handleLogin } = useMutation({
    mutationFn: (payload) => userApi.login(payload),
    onSuccess: (data) => {
      setLocalStorage("user", data?.user);
      setLocalStorage("token", data?.token);
      dispatch(setUser(data?.user));
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
    };
    handleLogin(payload);
  };

  const { Title } = Typography;

  return (
    <div className="container">
      {contextHolder}
      <div className="mt-3 mb-3 text-center">
        <Typography className="text-black">
          <Title level={2}>Đăng nhập Airbnb</Title>
        </Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
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

          <Col span={24}>
            <Typography className="text-sm text-black">
              Chưa có tài khoản?{" "}
              <span
                className="text-green-700 font-medium cursor-pointer"
                onClick={() => navigate(PATH.REGISTER)}
              >
                Tạo tài khoản
              </span>
            </Typography>
          </Col>

          <Col span={24}>
            <button
              className="btn-theme"
              type="submit"
            >
              Đăng nhập
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
