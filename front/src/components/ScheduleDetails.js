import {
  Modal,
  Typography,
  Divider,
  Button,
  Card,
  Tag,
  Empty,
  Row,
  Col,
  Space,
  Image,
  Descriptions,
  Avatar,
} from "antd";
import {
  CloseOutlined,
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ExclamationCircleFilled,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { format } from "date-fns";
import { useNotification } from "../contexts/NotificationContext";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const { Title, Text, Paragraph } = Typography;

const ScheduleDetails = ({
  content,
  openScheduleModal,
  setOpenScheduleModal,
  schedulesRefresh,
}) => {
  const property = content?.propertyId;
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const updateSchedule = async (id, updateData) => {
    setLoading(true);
    try {
      const mailValues = {
        to: content?.email,
        name: content?.name,
        message: `This is to notify you that your scheduled appointment for ${
          property.address
        } has been ${updateData.status}! ${
          updateData.status === "confirmed"
            ? "We look forward to meeting with you."
            : "Reach out to us if you have any questions."
        }
        `,
        subject: `${
          updateData.status === "confirmed"
            ? "Confirmation of"
            : "Cancellation of"
        } Appointment`,
      };

      const [res, res2] = await Promise.all([
        axios.put(`update-schedule?id=${id}`, updateData),
        axios.post("email-schedule-reply", mailValues, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (res.data.success && res2.data.success) {
        openNotification(
          "success",
          "Schedule has been updated. The client has been notified.",
          "Done!"
        );

        setTimeout(async () => {
          setOpenScheduleModal(false);
          await schedulesRefresh();
        }, 1200);
      }
    } catch (error) {
      console.error("Failed to update schedule", error);
      openNotification(
        "error",
        "Failed to update schedule. Try again",
        "There was an error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={openScheduleModal}
      onCancel={() => setOpenScheduleModal(false)}
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
        overflow: "auto",
      }}
    >
      {!content ? (
        <div style={{ padding: 90, textAlign: "center" }}>
          <Empty description="No schedule selected" />
        </div>
      ) : (
        <div
          style={{
            padding: "38px",
            maxWidth: 1250,
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Title level={3} style={{ margin: 0, color: "#0f172a" }}>
                Viewing Appointment
              </Title>
              <Text type="secondary" strong style={{ fontSize: 15 }}>
                {format(new Date(content?.date), "EEEE, do MMM yyyy")} at{" "}
                {content?.time} • {content.numberOfPeople} attendee(s)
              </Text>
            </Col>
            <Col>
              <Space>
                <Button
                  type="primary"
                  size="large"
                  loading={loading}
                  style={{
                    borderRadius: 50,
                    paddingInline: 28,
                    height: 45,
                    background:
                      content.status === "confirmed" ? "#22c55e" : "#3b82f6",
                  }}
                  onClick={async () => {
                    await updateSchedule(content._id, { status: "confirmed" });
                  }}
                >
                  {content.status === "confirmed"
                    ? "Confirmed"
                    : "Confirm Schedule"}
                </Button>

                {content.status === "confirmed" && (
                  <Button
                    type="primary"
                    size="large"
                    loading={loading}
                    style={{
                      borderRadius: 50,
                      paddingInline: 28,
                      height: 45,
                      background: "orange",
                    }}
                    onClick={async () => {
                      await updateSchedule(content._id, { status: "pending" });
                    }}
                  >
                    Mark as Pending
                  </Button>
                )}

                <Button
                  danger
                  size="large"
                  loading={loading}
                  style={{
                    borderRadius: 50,
                    paddingInline: 28,
                    height: 45,
                  }}
                  onClick={async () => {
                    await updateSchedule(content._id, { status: "cancelled" });
                  }}
                >
                  {content.status === "cancelled"
                    ? "Cancelled"
                    : "Cancel Schedule"}
                </Button>
              </Space>
            </Col>
          </Row>

          <Divider style={{ margin: "22px 0" }} />

          <Row gutter={[32, 32]}>
            <Col xs={24} lg={10}>
              <Card
                title="Client Information"
                headStyle={{
                  background: "#f8fafc",
                  // Removed bottom border radius for sharper separation
                  borderRadius: "12px 12px 0 0",
                  fontWeight: 600,
                  borderBottom: "1px solid #e2e8f0", // Slightly stronger divider
                }}
                style={{
                  borderRadius: 12,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08)", // Softer, deeper shadow
                  border: "1px solid #f1f5f9",
                }}
                bodyStyle={{ padding: "0 24px 24px 24px" }} // Adjust padding for inner content
              >
                <Space
                  direction="vertical"
                  size={0}
                  style={{ width: "100%", padding: "20px 0" }}
                >
                  {/* Section 1: Name and Avatar - High Prominence */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <Avatar
                      size={64} // Larger avatar
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor: "#bdb890", // Consistent with your color theme
                        fontSize: 32,
                      }}
                    >
                      {content.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div style={{ lineHeight: 1 }}>
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        Client
                      </Text>
                      <Text
                        strong
                        style={{
                          fontSize: 22, // Larger name
                          display: "block",
                          marginTop: 4,
                        }}
                      >
                        {content.name}
                      </Text>
                    </div>
                  </div>
                </Space>

                <Divider style={{ margin: "16px 0" }} />

                {/* Section 2: Contact Details and Status using Descriptions */}
                <Descriptions
                  column={1} // Stack items vertically
                  size="middle"
                  colon={false}
                  labelStyle={{
                    color: "#64748b", // Subtle secondary text
                    fontWeight: 500,
                    paddingBottom: 4,
                  }}
                  contentStyle={{
                    paddingBottom: 12,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  <Descriptions.Item label="Status">
                    <Tag
                      color={
                        content.status === "confirmed"
                          ? "green"
                          : content.status === "pending"
                          ? "gold"
                          : "red"
                      }
                      style={{
                        fontSize: 14,
                        padding: "5px 12px",
                        borderRadius: 10,
                      }}
                    >
                      {content.status === "confirmed" ? (
                        <CheckCircleFilled style={{ color: "green" }} />
                      ) : content.status === "pending" ? (
                        <ExclamationCircleFilled style={{ color: "gold" }} />
                      ) : (
                        <CloseCircleFilled style={{ color: "red" }} />
                      )}{" "}
                      {content.status.charAt(0).toUpperCase() +
                        content.status.slice(1)}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    <Space size={3}>
                      <Text>{content.phone}</Text>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    <Space size={8}>
                      <Text>{content.email}</Text>
                    </Space>
                  </Descriptions.Item>
                </Descriptions>

                {/* Section 3: Notes - Highlighted Block */}
                {content.notes && (
                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: 10,
                      padding: 16, // Increased padding
                      marginTop: 16,
                      borderLeft: "4px solid #bdb890", // Accent line for notes
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{ display: "block", marginBottom: 4 }}
                    >
                      Notes
                    </Text>
                    <Text>{content.notes}</Text>
                  </div>
                )}
              </Card>
            </Col>

            {/* PROPERTY INFO */}
            <Col xs={24} lg={14}>
              <div style={{ position: "sticky", top: 20 }}>
                <Card
                  title="Property Information"
                  headStyle={{
                    background: "#f8fafc",
                    // Removed bottom border radius for sharper separation
                    borderRadius: "12px 12px 0 0",
                    fontWeight: 600,
                    borderBottom: "1px solid #e2e8f0", // Slightly stronger divider
                  }}
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)", // Softer, deeper shadow
                    border: "1px solid #f1f5f9",
                  }}
                  bodyStyle={{ padding: "10px 24px 24px 24px" }} // Adjust padding for inner content
                >
                  {/* Property Images */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 12,
                      padding: 18,
                      background: "#fafbfc",
                    }}
                  >
                    {(Array.isArray(property?.img)
                      ? property.img
                      : [property?.img]
                    ).map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                          borderRadius: 14,
                        }}
                      />
                    ))}
                  </div>

                  {/* Property Text */}
                  <div style={{ padding: 28 }}>
                    <Tag
                      icon={<HomeOutlined />}
                      style={{
                        background: "#10b981",
                        color: "#fff",
                        borderRadius: 20,
                        padding: "6px 18px",
                        marginBottom: 18,
                      }}
                    >
                      {property?.status}
                    </Tag>

                    <Title level={4} style={{ margin: 0, color: "#1e293b" }}>
                      {property?.propertyType}
                    </Title>

                    {/* Location */}
                    <Space
                      style={{
                        marginTop: 8,
                        marginBottom: 20,
                        color: "#64748b",
                      }}
                    >
                      <EnvironmentOutlined />
                      <Text>
                        {property?.address}, {property?.city}
                      </Text>
                    </Space>

                    {/* Summary Stats */}
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                        padding: "18px 0",
                        borderTop: "1px solid #e2e8f0",
                        borderBottom: "1px solid #e2e8f0",
                        marginBottom: 20,
                      }}
                    >
                      <div>
                        <Text strong style={{ fontSize: 18 }}>
                          {property?.bedrooms}
                        </Text>
                        <Text type="secondary" style={{ display: "block" }}>
                          Bedrooms
                        </Text>
                      </div>

                      <Divider type="vertical" />

                      <div>
                        <Text strong style={{ fontSize: 18 }}>
                          {property?.bathrooms}
                        </Text>
                        <Text type="secondary" style={{ display: "block" }}>
                          Bathrooms
                        </Text>
                      </div>

                      <Divider type="vertical" />

                      <div>
                        <Text strong style={{ fontSize: 18 }}>
                          {property?.squareFeet}
                        </Text>
                        <Text type="secondary" style={{ display: "block" }}>
                          Sq. Ft
                        </Text>
                      </div>
                    </div>

                    <Paragraph style={{ color: "#64748b" }}>
                      {property?.description}
                    </Paragraph>

                    {/* Agent */}
                    <div
                      style={{
                        background: "#f8fafc",
                        padding: 20,
                        borderRadius: 14,
                      }}
                    >
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 12 }}
                      >
                        Property Agent
                      </Text>

                      <Space direction="vertical" size={6}>
                        <Space>
                          <UserOutlined />
                          <Text>{property?.agent.name}</Text>
                        </Space>
                        <Space>
                          <PhoneOutlined />
                          <Text>{property?.agent.phone}</Text>
                        </Space>
                      </Space>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Modal>
  );
};

export default ScheduleDetails;
