import { useMemo, useState } from "react";
import { Calendar, Typography, Card, Tooltip } from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CalendarDetailsModal from "./CalendarDetailsModal";

const { Text } = Typography;

const toISODate = (item) => {
  const raw = item.date;
  if (!raw) return "";

  // Already in YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  // ISO string -> return date part WITHOUT timezone conversion
  if (typeof raw === "string" && raw.includes("T")) {
    return raw.substring(0, 10); // safer than split("T")
  }

  // Do NOT convert Date objects using toISOString
  // Instead extract date in local context
  if (raw instanceof Date) {
    return (
      raw.getFullYear() +
      "-" +
      String(raw.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(raw.getDate()).padStart(2, "0")
    );
  }

  return "";
};

function ScheduleCalendar({ scheduleData, viewScheduleDetails }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openCalendarDetailsModal, setOpenCalendarDetailsModal] =
    useState(false);

  const viewEvents = (payload) => {
    setLoading(true);
    setContent(payload);
    setOpenCalendarDetailsModal(true);
    setTimeout(() => setLoading(false), 120);
  };

  const eventsByDate = useMemo(() => {
    const map = {};
    (scheduleData || []).forEach((item) => {
      const key = toISODate(item);
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }, [scheduleData]);

  const dateCellRender = (value) => {
    const y = value.year();
    const m = String(value.month() + 1).padStart(2, "0");
    const d = String(value.date()).padStart(2, "0");
    const key = `${y}-${m}-${d}`;

    const list = eventsByDate[key] || [];
    if (list.length === 0) return null;

    const visible = list.slice(0, 2);

    return (
      <div style={{ padding: "4px 6px" }}>
        {visible.map((ev, idx) => {
          const isDatePast = (dateString) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const eventDate = new Date(dateString);
            eventDate.setHours(0, 0, 0, 0);

            return eventDate < today;
          };

          const bgColor = isDatePast(ev.date)
            ? "grey"
            : ev.status === "confirmed"
            ? "linear-gradient(135deg, #bdb890, green)"
            : ev.status === "pending"
            ? "linear-gradient(135deg, #bdb890, orange)"
            : "linear-gradient(135deg, #bdb890, red)";

          return (
            <div key={idx}>
              <Tooltip
                title={`${ev.time} — ${ev.name} (${ev.numberOfPeople} people)`}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 6,
                    cursor: "pointer",
                    padding: "6px 8px",
                    background: bgColor,
                    borderRadius: 8,
                    transition: "all 0.2s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    viewScheduleDetails(ev);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(189, 184, 144, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <ClockCircleOutlined
                    style={{
                      fontSize: 11,
                      color: "#fff",
                      opacity: 0.9,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "Raleway",
                      fontWeight: 600,
                      color: "#fff",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 1,
                    }}
                  >
                    {ev.time}
                  </span>
                  <UserOutlined
                    style={{
                      fontSize: 10,
                      color: "#fff",
                      opacity: 0.8,
                    }}
                  />
                </div>
              </Tooltip>
            </div>
          );
        })}

        {list.length > 2 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              viewEvents(list);
            }}
            style={{
              fontSize: 11,
              fontFamily: "Raleway",
              fontWeight: 600,
              color: "#bdb890",
              cursor: "pointer",
              padding: "4px 8px",
              background: "rgba(189, 184, 144, 0.1)",
              borderRadius: 6,
              textAlign: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(189, 184, 144, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(189, 184, 144, 0.1)";
            }}
          >
            +{list.length - 2} more
          </div>
        )}
      </div>
    );
  };

  const onSelect = (value) => {
    const y = value.year();
    const m = String(value.month() + 1).padStart(2, "0");
    const d = String(value.date()).padStart(2, "0");
    const key = `${y}-${m}-${d}`;
    const list = eventsByDate[key] || [];

    if (list.length > 0) {
      viewEvents(list);
    }
  };

  const headerRender = ({ value, onChange }) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = value.month();
    const year = value.year();

    return (
      <div
        style={{
          padding: "20px 24px",
          background: "linear-gradient(135deg, #bdb890, #a8a378)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CalendarOutlined style={{ fontSize: 24, color: "#fff" }} />
          <div>
            <Text
              strong
              style={{
                fontSize: 24,
                fontFamily: "Raleway",
                color: "#fff",
                display: "block",
                lineHeight: 1.2,
              }}
            >
              {monthNames[month]} {year}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Raleway",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Click on dates to view scheduled viewings
            </Text>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => {
              const newValue = value.clone().month(month - 1);
              onChange(newValue);
            }}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "Raleway",
              fontWeight: 600,
              fontSize: 14,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
          >
            ← Prev
          </button>
          <button
            onClick={() => {
              const newValue = value.clone().month(month + 1);
              onChange(newValue);
            }}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "Raleway",
              fontWeight: 600,
              fontSize: 14,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
          >
            Next →
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Calendar
          cellRender={dateCellRender}
          onSelect={onSelect}
          headerRender={headerRender}
          style={{
            fontFamily: "Raleway",
          }}
        />

        {/* Legend */}
        <div
          style={{
            padding: "16px 24px",
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <Text
            strong
            style={{
              fontFamily: "Raleway",
              color: "#64748b",
              fontSize: 14,
            }}
          >
            Legend:
          </Text>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #bdb890, green)",
                }}
              />
              <Text
                style={{
                  fontFamily: "Raleway",
                  fontSize: 13,
                  color: "#475569",
                }}
              >
                Confirmed viewing
              </Text>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {" "}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #bdb890, orange)",
                }}
              />
              <Text
                style={{
                  fontFamily: "Raleway",
                  fontSize: 13,
                  color: "#475569",
                }}
              >
                Pending viewing
              </Text>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #bdb890, red)",
                }}
              />
              <Text
                style={{
                  fontFamily: "Raleway",
                  fontSize: 13,
                  color: "#475569",
                }}
              >
                Cancelled viewing
              </Text>
            </div>
          </div>
        </div>

        <style>{`
        /* Calendar cell styling */
        .ant-picker-calendar-date {
          border-radius: 8px !important;
          transition: all 0.2s ease !important;
        }
        
        .ant-picker-calendar-date:hover {
          background: #f8fafc !important;
        }
        
        .ant-picker-calendar-date-today {
          border: 2px solid #bdb890 !important;
        }
        
        .ant-picker-cell-selected .ant-picker-calendar-date {
          background: rgba(189, 184, 144, 0.1) !important;
        }
        
        /* Date number styling */
        .ant-picker-calendar-date-value {
          font-family: Raleway !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          color: #1e293b !important;
        }
        
        /* Weekend styling */
        .ant-picker-cell-week .ant-picker-calendar-date-value {
          color: #64748b !important;
        }
        
        /* Header weekday names */
        .ant-picker-calendar-header {
          background: #fff !important;
          padding: 12px 0 !important;
          border-bottom: 1px solid #e2e8f0 !important;
        }
        
        .ant-picker-content thead th {
          font-family: Raleway !important;
          font-weight: 600 !important;
          color: #475569 !important;
          font-size: 13px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }
        
        /* Disabled dates (past/other month) */
        .ant-picker-cell-disabled .ant-picker-calendar-date-value {
          color: #cbd5e1 !important;
        }
        
        .ant-picker-cell-disabled {
          opacity: 0.5 !important;
        }
        
        /* Cell content area */
        .ant-picker-calendar-date-content {
          height: auto !important;
          min-height: 60px !important;
        }
      `}</style>
      </Card>

      <CalendarDetailsModal
        openCalendarDetailsModal={openCalendarDetailsModal}
        setOpenCalendarDetailsModal={setOpenCalendarDetailsModal}
        viewScheduleDetails={viewScheduleDetails}
        content={content}
        loading={loading}
      />
    </>
  );
}

export default ScheduleCalendar;
