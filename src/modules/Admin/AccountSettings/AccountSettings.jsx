import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
} from "antd";
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userApi } from "../../../apis/user.api";
import dayjs from "dayjs";


const AccountSettings = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { currentUser } = useSelector((state) => state.user);

  const { data, isLoading, error } = useQuery({
    queryKey: ["info-user"],
    queryFn: () => userApi.getInfoUser(currentUser.id),
  });

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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: data?.email || "",
      name: data?.name || "",
      phone: data?.phone || "",
      role: data?.role || "",
      birthday: data?.birthday || null,
      gender: data?.gender,
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  // Update Info Api
  const { mutate: handleUpdateUserApi, isPending } = useMutation({
    mutationFn: (payload) => userApi.updateUser(payload),
    onSuccess: (data) => {
      console.log("🚀 ~ UserManagement ~ data:", data);
      messageApi.open({
        content: "Update thông tin thành công",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["info-user"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log("🚀 ~ UserManagement ~ error:", error?.message);
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const onSubmit = (values) => {
    const payload = {
      id: currentUser.id,
      email: values.email,
      name: values.name,
      phone: values.phone,
      birthday: values.birthday,
      gender: values.gender,
      role: values.role,
    };
    handleUpdateUserApi(payload);
  };

  useEffect(() => {
    if (data) {
      const userData = data;
      setValue("email", userData?.email);
      setValue("name", userData?.name);
      setValue("phone", userData?.phone);
      setValue("birthday", userData?.birthday);
      setValue("gender", userData?.gender);
      setValue("role", userData?.role);
    }
  }, [data]);

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
              title: "Account Settings",
              href: "",
            },
          ]}
        />
      </div>
      <h3 className="font-medium text-3xl mb-3"> Your information:</h3>

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
                  disabled={true}
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
            <Button
              loading={isPending}
              htmlType="submit"
              size="large"
              type="primary"
              className="ml-3"
            >
              <EditOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default AccountSettings
