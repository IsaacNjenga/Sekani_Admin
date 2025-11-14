import React, { createContext, useContext } from "react";
import { notification } from "antd";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, title) => {
    api[type]({
      message: <span style={{ fontFamily: "Raleway" }}>{title}</span>,
      description: <span style={{ fontFamily: "Raleway" }}>{message}</span>,
      placement: "topRight",
      duration: 3,
    });
  };

  return (
    <NotificationContext.Provider value={openNotification}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
