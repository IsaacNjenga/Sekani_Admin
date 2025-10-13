import React, { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  FloatButton,
  Layout,
  Menu,
  Tooltip,
  Typography,
} from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/images/logo3.png";
import {
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  PlusCircleOutlined,
  PoweroffOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import "../assets/css/navbar.css";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function getItem(label, path, key, icon, children) {
  return { key, icon, path, children, label };
}

const items = [
  getItem("Dashboard", "/", 1, AppstoreOutlined),
  getItem("Properties", "", 2, HomeOutlined, [
    getItem("View Properties", "/properties", 3, HomeOutlined),
    getItem("Create Property", "/create-property", 4, PlusCircleOutlined),
  ]),
  getItem("Emails", "/emails", 5, MailOutlined),
  getItem("Sent Emails", "/sent-mails", 5, SendOutlined),
];

function Navbar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(location.pathname);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  // const navItems = [
  //   { label: "Dashboard", path: "/", icon: AppstoreOutlined },
  //   { label: "Properties", path: "/properties", icon: HomeOutlined },
  //   { label: "Analytics", path: "/analytics", icon: CustomerServiceFilled },
  // ];

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
                  style={{
                    display: collapsed ? "none" : "flex",
                    margin: 0,
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <Title
                    style={{
                      color: "whitesmoke",
                      fontFamily: "Raleway",
                      margin: 0,
                    }}
                    level={2}
                  >
                    Sekani Admin
                  </Title>
                  {user && (
                    <Divider
                      style={{
                        borderColor: "white",
                        width: "80%",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Text
                        style={{
                          color: "whitesmoke",
                          fontFamily: "Raleway",
                          margin: 0,
                        }}
                      >
                        {user?.username}
                      </Text>
                    </Divider>
                  )}
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
              items={items.map(({ key, icon, label, path, children }) => ({
                key: path || key,
                icon: React.createElement(icon, {
                  style: {
                    fontSize: collapsed ? "1.5rem" : "1.7rem",
                    color: "whitesmoke",
                    margin: "7px 0",
                  },
                }),
                label: path ? (
                  <Link
                    to={path}
                    style={{
                      fontSize: "18px",
                      color: "whitesmoke",
                    }}
                  >
                    {label}
                  </Link>
                ) : (
                  <Text
                    style={{
                      fontSize: "18px",
                      color: "whitesmoke",
                      fontFamily: "Raleway",
                    }}
                  >
                    {label}
                  </Text>
                ),
                children: children?.map((child) => ({
                  key: child.path || child.key,
                  icon: React.createElement(child.icon, {
                    style: {
                      fontSize: collapsed ? "1.5rem" : "1.7rem",
                      color: "whitesmoke",
                      margin: "7px 0px",
                    },
                  }),
                  label: (
                    <Link
                      to={child.path}
                      style={{
                        fontSize: "16px",
                        color: "whitesmoke",
                        background: "transparent",
                        fontFamily: "Raleway",
                      }}
                    >
                      {child.label}
                    </Link>
                  ),
                })),
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
              background:
                "linear-gradient(to left, #ffffffd6 0%, #ffffffff 100%)",
              borderBottom: "1px solid #ccc",
            }}
          >
            <>
              <div style={{ float: "right", marginRight: 20 }}>
                <Avatar
                  src={user?.avatar}
                  size="medium"
                  style={{ marginRight: 15 }}
                />
                <Tooltip title="Logout">
                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    danger
                    shape="circle"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You will be logged out.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes",
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          await logout();
                        } else {
                          return;
                        }
                      });
                    }}
                  />
                </Tooltip>
              </div>
            </>
          </Header>

          <Content
            style={{
              margin: "0px",
              padding: 20,
              minHeight: "100vh",
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
