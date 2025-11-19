import {
  CloseOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Card, Empty, Modal, Tag, Avatar, Typography } from "antd";
import { format } from "date-fns";

const { Title, Text } = Typography;

function CalendarDetailsModal({
  content,
  openCalendarDetailsModal,
  setOpenCalendarDetailsModal,
  viewScheduleDetails,
}) {
  // Extract the date from first item (all items share full date)
  const selectedDate = content?.[0]?.date?.split("T")[0];

  // Sort items by time
  const sortedContent = content?.sort((a, b) => {
    const timeA = a.time?.split(":").join("");
    const timeB = b.time?.split(":").join("");
    return timeA - timeB;
  });

  return (
    <Modal
      open={openCalendarDetailsModal}
      onCancel={() => setOpenCalendarDetailsModal(false)}
      footer={null}
      width="90%"
      style={{
        top: 20,
        maxWidth: 1400,
      }}
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: 20,
            color: "#fff",
            background: "rgba(0,0,0,0.5)",
            padding: 8,
            borderRadius: "50%",
          }}
        />
      }
      bodyStyle={{
        padding: 0,
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderRadius: 16,
        maxHeight: "90vh",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #bdb890, #a8a378)",
          padding: "32px 40px",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(40px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarOutlined style={{ fontSize: 28, color: "#fff" }} />
            </div>
            <div>
              <Title
                level={2}
                style={{
                  margin: 0,
                  color: "#fff",
                  fontFamily: "Raleway",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {format(
                  new Date(selectedDate || "2025-11-10"),
                  "EEEE, do MMMM yyyy"
                )}
              </Title>
              <Text
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 16,
                  fontFamily: "Raleway",
                }}
              >
                {content?.length || 0} viewing{content?.length !== 1 ? "s" : ""}{" "}
                scheduled
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        style={{
          padding: 32,
          overflowY: "auto",
          maxHeight: "calc(90vh - 140px)",
        }}
      >
        {!content || content.length === 0 ? (
          <div
            style={{
              padding: 80,
              textAlign: "center",
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <CalendarOutlined
              style={{ fontSize: 64, color: "#cbd5e1", marginBottom: 16 }}
            />
            <Empty
              description={
                <div>
                  <Title
                    level={4}
                    style={{
                      fontFamily: "Raleway",
                      color: "#64748b",
                      marginBottom: 8,
                    }}
                  >
                    No Schedules
                  </Title>
                  <Text style={{ fontFamily: "Raleway", color: "#94a3b8" }}>
                    There are no viewings scheduled for this day
                  </Text>
                </div>
              }
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 24,
            }}
          >
            {sortedContent.map((item, idx) => (
              <Card
                key={item._id || `${item.time}-${idx}`}
                style={{
                  borderRadius: 16,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  background: "#fff",
                }}
                bodyStyle={{ padding: 0 }}
                hoverable
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(189, 184, 144, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
                }}
                onClick={() => viewScheduleDetails(item)}
              >
                {/* Card Header */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                    padding: "20px 18px",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Tag
                      icon={<ClockCircleOutlined />}
                      style={{
                        background: "linear-gradient(135deg, #bdb890, #a8a378)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 20,
                        padding: "6px 16px",
                        fontSize: 15,
                        fontFamily: "Raleway",
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(189, 184, 144, 0.3)",
                      }}
                    >
                      {item.time}
                    </Tag>

                    <Tag
                      style={{
                        background: "linear-gradient(135deg, #bdb890, #a8a378)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 20,
                        padding: "6px 16px",
                        fontSize: 15,
                        fontFamily: "Raleway",
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(189, 184, 144, 0.3)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        viewScheduleDetails(item);
                      }}
                    >
                      View Details
                    </Tag>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <Avatar
                      size={48}
                      style={{
                        background: "linear-gradient(135deg, #bdb890, #a8a378)",
                        fontSize: 20,
                        fontWeight: 600,
                      }}
                    >
                      {item.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          fontFamily: "Raleway",
                          color: "#1e293b",
                        }}
                      >
                        {item.name}
                      </Title>
                      <Text
                        style={{
                          fontFamily: "Raleway",
                          color: "#64748b",
                          fontSize: 13,
                        }}
                      >
                        Property Viewing
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {/* Email */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "8px 12px",
                        background: "#f8fafc",
                        borderRadius: 10,
                      }}
                    >
                      <MailOutlined
                        style={{
                          color: "#bdb890",
                          fontSize: 16,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#94a3b8",
                            fontFamily: "Raleway",
                            display: "block",
                          }}
                        >
                          Email
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Raleway",
                            color: "#475569",
                            fontSize: 14,
                          }}
                        >
                          {item.email}
                        </Text>
                      </div>
                    </div>

                    {/* Phone */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "8px 12px",
                        background: "#f8fafc",
                        borderRadius: 10,
                      }}
                    >
                      <PhoneOutlined
                        style={{
                          color: "#bdb890",
                          fontSize: 16,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#94a3b8",
                            fontFamily: "Raleway",
                            display: "block",
                          }}
                        >
                          Phone
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Raleway",
                            color: "#475569",
                            fontSize: 14,
                          }}
                        >
                          {item.phone}
                        </Text>
                      </div>
                    </div>

                    {/* Attendees */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "8px 12px",
                        background: "#f8fafc",
                        borderRadius: 10,
                      }}
                    >
                      <TeamOutlined
                        style={{
                          color: "#bdb890",
                          fontSize: 16,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#94a3b8",
                            fontFamily: "Raleway",
                            display: "block",
                          }}
                        >
                          Attendees
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Raleway",
                            color: "#475569",
                            fontSize: 14,
                          }}
                        >
                          {item.numberOfPeople}{" "}
                          {item.numberOfPeople === 1 ? "person" : "people"}
                        </Text>
                      </div>
                    </div>

                    {/* Notes */}
                    {item.notes && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "8px 12px",
                          background: "#f8fafc",
                          borderRadius: 10,
                        }}
                      >
                        <MessageOutlined
                          style={{
                            color: "#bdb890",
                            fontSize: 16,
                            marginTop: 2,
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#94a3b8",
                              fontFamily: "Raleway",
                              display: "block",
                            }}
                          >
                            Notes
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Raleway",
                              color: "#475569",
                              fontSize: 14,
                            }}
                          >
                            {item.notes}
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CalendarDetailsModal;
