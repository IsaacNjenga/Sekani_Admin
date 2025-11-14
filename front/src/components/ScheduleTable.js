// src/components/ScheduleTable.jsx
import React from "react";
import { Table, Button } from "antd";

function ScheduleTable({ scheduleData = [], viewScheduleDetails }) {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", dataIndex: "time", key: "time" },
    {
      title: "No. of people",
      dataIndex: "numberOfPeople",
      key: "numberOfPeople",
    },
    { title: "Notes", dataIndex: "notes", key: "notes" },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (text, record) => (
        <Button size="small" onClick={() => viewScheduleDetails(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={scheduleData}
        rowKey={(r) => r._id || `${r.propertyId}-${r.date}-${r.time}-${r.email}`}
        pagination={{ pageSize: 10 }}
        size="small"
        style={{ fontFamily: "Raleway" }}
      />
    </div>
  );
}

export default ScheduleTable;
