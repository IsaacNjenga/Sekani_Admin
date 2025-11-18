import { Avatar, Table, Typography, Tag, Input } from "antd";
import { format } from "date-fns";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  CloseCircleFilled,
  SwitcherFilled,
  SwitcherOutlined,
  UserOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import { useState } from "react";
import "../assets/css/scheduleTable.css";
import useFetchAllSchedules from "../hooks/fetchAllSchedules";

const { Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Client",
    dataIndex: "name",
    key: "name",
    width: 250,
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
    width: 160,
    align: "center",
    render: (phone) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <PhoneFilled style={{ color: "#bdb890" }} />
        <Text strong style={{ fontFamily: "Raleway" }}>
          {phone}
        </Text>
      </div>
    ),
  },
  {
    title: "Date & Time",
    dataIndex: "date",
    key: "date",
    width: 150,
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
    render: (date, record) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CalendarOutlined style={{ color: "#bdb890" }} />
          <Text strong style={{ fontFamily: "Raleway" }}>
            {format(new Date(date), "do MMM yyyy")}
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ClockCircleOutlined style={{ color: "#bdb890" }} />
          <Text style={{ fontFamily: "Raleway" }}>{record.time}</Text>
        </div>
      </div>
    ),
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    align: "center",
    render: (text) => (
      <Text
        style={{
          fontFamily: "Raleway",
        }}
      >
        {text?.charAt(0).toUpperCase() + text.slice(1)}
      </Text>
    ),
  },
  {
    title: "Attendees",
    dataIndex: "numberOfPeople",
    key: "numberOfPeople",
    width: 100,
    align: "center",
    render: (num) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <UserOutlined style={{ color: "#bdb890" }} />
        <Text>{num}</Text>
      </div>
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

const tabs = [
  {
    key: "all",
    label: "All",
    color: "purple",
    color2: "#cbcbfdff",
    icon: SwitcherFilled,
    icon2: SwitcherOutlined,
  },
  {
    key: "confirmed",
    label: "Confirmed",
    color: "green",
    color2: "#cff8e8",
    icon: CheckCircleFilled,
    icon2: CheckCircleOutlined,
  },
  {
    key: "pending",
    label: "Pending",
    color: "orange",
    color2: "#f7eebe",
    icon: ExclamationCircleFilled,
    icon2: ExclamationCircleOutlined,
  },
  {
    key: "cancelled",
    label: "Cancelled",
    color: "red",
    color2: "#fad2cf",
    icon: CloseCircleFilled,
    icon2: CloseCircleOutlined,
  },
];

const TableView = ({ datasource, schedulesLoading, viewScheduleDetails }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={datasource}
        loading={schedulesLoading}
        rowKey={(r) =>
          r._id || `${r.propertyId}-${r.date}-${r.time}-${r.email}`
        }
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total) => (
            <Text style={{ fontFamily: "Raleway", color: "#64748b" }}>
              Total bookings: {total}
            </Text>
          ),
        }}
        size="large"
        style={{ fontFamily: "Raleway", width: "100%" }}
        onRow={(record) => ({
          onClick: () => {
            viewScheduleDetails(record);
          },
          style: {
            cursor: "pointer",
            transition: "all 0.2s ease",
          },
        })}
        rowClassName={(record) => {
          if (record.status === "confirmed") return "row-confirmed";
          if (record.status === "pending") return "row-pending";
          if (record.status === "cancelled") return "row-cancelled";
          return "";
        }}
      />
    </>
  );
};

function ScheduleTable({ viewScheduleDetails }) {
  const [activeTabKey, setActiveTabKey] = useState(1);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const { allSchedules, schedulesLoading } = useFetchAllSchedules();

  const renderContent = () => {
    switch (activeTabKey) {
      case 1:
        return (
          <TableView
            datasource={searchValue ? schedule : allSchedules}
            schedulesLoading={schedulesLoading}
            viewScheduleDetails={viewScheduleDetails}
          />
        );
      case 2:
        return (
          <TableView
            datasource={
              searchValue
                ? schedule.filter((item) => item.status === "confirmed")
                : allSchedules.filter((item) => item.status === "confirmed")
            }
            schedulesLoading={schedulesLoading}
            viewScheduleDetails={viewScheduleDetails}
          />
        );
      case 3:
        return (
          <TableView
            datasource={
              searchValue
                ? schedule.filter((item) => item.status === "pending")
                : allSchedules.filter((item) => item.status === "pending")
            }
            schedulesLoading={schedulesLoading}
            viewScheduleDetails={viewScheduleDetails}
          />
        );
      case 4:
        return (
          <TableView
            datasource={
              searchValue
                ? schedule.filter((item) => item.status === "cancelled")
                : allSchedules.filter((item) => item.status === "cancelled")
            }
            schedulesLoading={schedulesLoading}
            viewScheduleDetails={viewScheduleDetails}
          />
        );
      default:
        return null;
    }
  };

  const handleSearch = (e) => {
    setLoading(true);
    try {
      const value = e.target.value.toLowerCase().trim();
      setSearchValue(value);
      if (!value) {
        setSchedule([]);
        return;
      }

      const filteredSearchData = allSchedules.filter((item) => {
        // Combine searchable text
        const textToSearch = [
          item._id,
          item.total?.toString(),
          item.name,
          item.email,
          item.date,
          item.time,
          item.attendees,
          item.note,
          //...(item.order?.map((p) => `${p.name} ${p.email}`) || []),
        ]
          .filter(Boolean)
          .join(" ") // combine all fields
          .toLowerCase();

        return textToSearch.includes(value);
      });

      setSchedule(filteredSearchData);
    } catch (error) {
      console.warn("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ marginTop: 20 }}>
        <Search
          placeholder="Search..."
          size="large"
          loading={loading}
          enterButton
          onChange={handleSearch}
          style={{ width: "100%", height: 50 }}
        />
      </div>

      <div
        style={{
          display: "flex",
          margin: "10px 0",
          marginTop: 20,
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((btn) => (
          <Tag
            color={activeTabKey === btn.key ? btn.color : ""}
            key={btn.key}
            onClick={() => setActiveTabKey(btn.key)}
            style={{
              fontSize: 14,
              padding: "10px 14px",
              cursor: "pointer",
              fontFamily: "Raleway",
              borderRadius: 20,
              transition: "0.2s",
              background: activeTabKey === btn.key ? btn.color : btn.color2,
              color: activeTabKey === btn.key ? "white" : "#333",
            }}
          >
            {activeTabKey === btn.key ? <btn.icon /> : <btn.icon2 />}{" "}
            <span style={{ marginLeft: 6 }}>{btn.label}</span>
          </Tag>
        ))}
      </div>

      <div
        style={{
          width: "100%",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default ScheduleTable;
