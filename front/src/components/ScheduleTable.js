import { Avatar, Table, Typography, Badge } from "antd";
import { format } from "date-fns";
import {
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const columns = [
  {
    title: "Client",
    dataIndex: "name",
    key: "name",
    width: 280,
    render: (name, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar
          size={44}
          style={{
            background: "linear-gradient(135deg, #bdb890, #a8a378)",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {name?.charAt(0).toUpperCase()}
        </Avatar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong style={{ fontFamily: "Raleway", fontSize: 15 }}>
            {name}
          </Text>
          <Text
            type="secondary"
            style={{ fontFamily: "Raleway", fontSize: 13 }}
          >
            {record.email}
          </Text>
        </div>
      </div>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 150,
    render: (phone) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <PhoneOutlined style={{ color: "#bdb890" }} />
        <Text style={{ fontFamily: "Raleway" }}>{phone}</Text>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 180,
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
    render: (text) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <CalendarOutlined style={{ color: "#bdb890" }} />
        <Text style={{ fontFamily: "Raleway" }}>
          {format(new Date(text), "do MMM yyyy")}
        </Text>
      </div>
    ),
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: 120,
    render: (time) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ClockCircleOutlined style={{ color: "#bdb890" }} />
        <Text style={{ fontFamily: "Raleway" }}>{time}</Text>
      </div>
    ),
  },
  {
    title: "Attendees",
    dataIndex: "numberOfPeople",
    key: "numberOfPeople",
    width: 120,
    align: "center",
    render: (num) => (
      <Badge
        count={num}
        style={{
          background: "linear-gradient(135deg, #bdb890, #a8a378)",
          fontSize: 14,
          fontFamily: "Raleway",
          fontWeight: 500,
        }}
        showZero
      />
    ),
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    ellipsis: true,
    render: (notes) => (
      <Text
        style={{
          fontFamily: "Raleway",
          color: notes ? "#475569" : "#cbd5e1",
          fontStyle: notes ? "normal" : "italic",
        }}
      >
        {notes || "No notes"}
      </Text>
    ),
  },
];

function ScheduleTable({
  scheduleData = [],
  viewScheduleDetails,
  schedulesLoading,
  schedulesRefresh,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Table
        columns={columns}
        dataSource={scheduleData}
        loading={schedulesLoading}
        rowKey={(r) =>
          r._id || `${r.propertyId}-${r.date}-${r.time}-${r.email}`
        }
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total) => (
            <Text style={{ fontFamily: "Raleway", color: "#64748b" }}>
              Total {total} bookings
            </Text>
          ),
        }}
        size="middle"
        style={{ fontFamily: "Raleway" }}
        onRow={(record) => ({
          onClick: () => {
            viewScheduleDetails(record);
          },
          style: {
            cursor: "pointer",
            transition: "all 0.2s ease",
          },
        })}
        rowClassName="schedule-table-row"
      />
      <style>{`
        .schedule-table-row:hover {
          background: #f8fafc !important;
          box-shadow: 0 2px 8px rgba(189, 184, 144, 0.1);
        }
        .ant-table-thead > tr > th {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9) !important;
          font-family: Raleway;
          font-weight: 600;
          color: #1e293b;
          border-bottom: 2px solid #e2e8f0;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9;
        }
      `}</style>
    </div>
  );
}

export default ScheduleTable;
