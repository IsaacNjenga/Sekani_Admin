import { CloseOutlined } from "@ant-design/icons";
import { Card, Empty, Modal, Tag, Button } from "antd";
import { format } from "date-fns";

function CalendarDetailsModal({
  content,
  openCalendarDetailsModal,
  setOpenCalendarDetailsModal,
  viewScheduleDetails,
}) {
  // Extract the date from first item (all items share full date)
  const selectedDate = content?.[0]?.date?.split("T")[0];

  return (
    <Modal
      open={openCalendarDetailsModal}
      onCancel={() => setOpenCalendarDetailsModal(false)}
      footer={null}
      width="85%"
      style={{
        top: 20,
        maxWidth: 1450,
      }}
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: 20,
            color: "#334155",
            background: "rgba(255,255,255,0.9)",
            padding: 8,
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
      }
      bodyStyle={{
        padding: 0,
        background: "#f6f8fa",
        borderRadius: 18,
        maxHeight: "88vh",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 30px",
          borderBottom: "1px solid #e5e7eb",
          background: "#ffffff",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          position: "sticky",
          top: 0,
          zIndex: 3,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 24, color: "#1e293b" }}>
          Schedule for{" "}
          {format(
            new Date(selectedDate ? selectedDate : "2025-11-10"),
            "EEEE, do, MMMM yyyy"
          ) || "Selected Day"}
        </h1>
      </div>

      {/* Content Section */}
      <div
        style={{
          padding: 30,
          overflowY: "auto",
          maxHeight: "calc(88vh - 80px)",
        }}
      >
        {!content || content.length === 0 ? (
          <div style={{ padding: 90, textAlign: "center" }}>
            <Empty description="No schedules for this day" />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {content.map((item) => (
              <Card
                key={item._id || item.time}
                style={{
                  borderRadius: 14,
                  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                }}
                bodyStyle={{ padding: 20 }}
              >
                <div style={{ marginBottom: 10 }}>
                  <Tag
                    color="blue"
                    style={{
                      padding: "5px 10px",
                      borderRadius: 6,
                      fontSize: 14,
                    }}
                  >
                    {item.time}
                  </Tag>
                </div>

                <h2
                  style={{ margin: "0 0 10px", fontSize: 20, color: "#0f172a" }}
                >
                  {item.name}
                </h2>

                <p style={{ margin: "0 0 6px", color: "#475569" }}>
                  <strong>Email:</strong> {item.email}
                </p>
                <p style={{ margin: "0 0 6px", color: "#475569" }}>
                  <strong>Phone:</strong> {item.phone}
                </p>
                <p style={{ margin: "0 0 6px", color: "#475569" }}>
                  <strong>Notes:</strong> {item.notes || "None"}
                </p>
                <p style={{ margin: "0 0 16px", color: "#475569" }}>
                  <strong>No. of People:</strong> {item.numberOfPeople}
                </p>

                <Button
                  type="primary"
                  block
                  onClick={() => viewScheduleDetails(item)}
                  style={{
                    marginTop: 8,
                    borderRadius: 8,
                    padding: "8px 0",
                  }}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CalendarDetailsModal;
