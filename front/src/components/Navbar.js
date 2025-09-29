import React, { useState } from "react";
import { Button, FloatButton, Layout, Menu, theme, Typography } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/images/logo3.png";
import {
  AppstoreOutlined,
  CustomerServiceFilled,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function Navbar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(location.pathname);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: AppstoreOutlined },
    { label: "Properties", path: "/properties", icon: HomeOutlined },
    { label: "Analytics", path: "/analytics", icon: CustomerServiceFilled },
  ];

  return (
    <>
      <FloatButton
        description=""
        tooltip={collapsed ? "Open" : "Collapse"}
        type="primary"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed((prev) => !prev)}
        style={{
          left: 24,
          bottom: 24,
          right: "auto",
          fontSize: "14px",
          position: "fixed",
          zIndex: 1000,
        }}
      />
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          onBreakpoint={(broken) => setCollapsed(broken)}
          width={250}
          style={{
            padding: 6,
            background:
              "linear-gradient(to bottom, #000000d6 0%, #232527ff 100%)",
          }}
        >
          <div style={{ margin: "4px 0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      width: collapsed ? "65px" : "105px",
                      height: collapsed ? "65px" : "105px",
                      borderRadius: "50%",
                      border: "1px solid #fec76f ",
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                </div>
                <div
                  style={{ display: collapsed ? "none" : "flex", margin: 0 }}
                >
                  <Title
                    style={{
                      color: "whitesmoke",
                      fontFamily: "Raleway",
                      margin: 0,
                      transition: "all 0.3s ease-in-out",
                    }}
                    level={2}
                  >
                    Sekani Admin
                  </Title>
                </div>
              </div>
              <div
                style={{
                  display: collapsed ? "none" : "flex",
                  justifyContent: "center",
                  fontSize: "3rem",
                }}
              ></div>
            </div>

            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[current]}
              onClick={handleClick}
              inlineCollapsed={collapsed}
              style={{
                fontFamily: "Raleway",
                border: "none",
                background: "transparent",
              }}
              items={navItems.map(({ key, icon, label, path }) => ({
                key: path || key,
                icon: React.createElement(icon, {
                  style: {
                    fontSize: collapsed ? "1.5rem" : "1.7rem",
                    color: "whitesmoke",
                    margin: "7px 0px",
                  },
                }),
                label: (
                  <Link
                    to={path}
                    style={{
                      fontSize: "18px",
                      color: "whitesmoke",
                    }}
                  >
                    {label}
                  </Link>
                ),
                style: {
                  textAlign: "left",
                  margin: collapsed ? "14px 4.1px" : "19px 4.1px",
                },
              }))}
            />
          </div>
        </Sider>{" "}
        <Layout>
          <Header
            style={{
              padding: 0,
            }}
          >
            <Menu
              theme="dark"
              mode="horizontal"
              //selectedKeys={[current]}
              //onClick={handleClick}
              style={{
                justifyContent: "right",
                fontWeight: "light",
                fontFamily: "Raleway",
                background: " whitesmoke",
              }}
            >
              {/* {menuItems.map((item) => (
                <Menu.Item
                  key={item?.path || item?.key}
                  icon={
                    <span
                      style={{
                        borderRadius: "50%",
                        border: "1px solid #fff",
                        padding: "7px",
                        margin: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                  }
                  style={{ color: "whitesmoke", fontSize: "0.9rem" }}
                >
                  <Link
                    to={item.path}
                    style={{
                      textDecoration: "none",
                      color: "whitesmoke",
                    }}
                  >
                    {item.label}
                  </Link>
                </Menu.Item>
              ))} */}
              <Menu.Item>
                <div>
                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    //onClick={handleLogout}
                  />
                </div>
              </Menu.Item>
            </Menu>
          </Header>

          <Content
            style={{
              margin: "0px",
              padding: 20,
              minHeight: "100vh",
              background: '#ff4411',
              borderRadius: 0,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Navbar;
