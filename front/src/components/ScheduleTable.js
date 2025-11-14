import React from "react";
import { Table } from "antd";
import { scheduleData } from "../assets/data/data";

const columns = [
  { title: "name", dataIndex: "name", key: "name" },
  { title: "email", dataIndex: "email", key: "email" },
  { title: "phone", dataIndex: "phone", key: "phone" },
  { title: "date", dataIndex: "date", key: "date" },
  { title: "time", dataIndex: "time", key: "time" },
  {
    title: "No. of people",
    dataIndex: "numberOfPeople",
    key: "numberOfPeople",
  },
  { title: "Notes", dataIndex: "notes", key: "notes" },
];
function ScheduleTable() {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={scheduleData}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        size="small"
        style={{ fontFamily: "Raleway" }}
      />
    </div>
  );
}

export default ScheduleTable;
