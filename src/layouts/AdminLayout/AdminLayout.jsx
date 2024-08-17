import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import React, { FC, useState } from "react";
import { PATH } from "../../routes/path";
import { useLocation, useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../utils";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogOut = () => {
    removeLocalStorage("user");
    window.location.reload();
  };


  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-center flex items-center h-[80px] justify-center cursor-pointer">
          <img src="/logo.png" width={40} onClick={() => navigate(PATH.HOME)} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onSelect={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              key: PATH.ADMIN_USER,
              icon: <UserOutlined />,
              label: "User Management",
            },
            {
              key: PATH.ADMIN_MOVIE,
              icon: <VideoCameraOutlined />,
              label: "Movie Management",
            },
            {
              key: PATH.ADMIN_CINEMA,
              icon: <BankOutlined />,
              label: "Cinema Management",
            },
            {
              key: PATH.ADMIN_ACCOUNT_SETTINGS,
              icon: <SettingOutlined />,
              label: "Account Settings",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex items-center justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Button
            onClick={handleLogOut}
            className="mx-5 font-medium"
            size="large"
            type="default"
            danger
          >
            Log Out
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "scroll",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
