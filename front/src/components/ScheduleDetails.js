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
} from "antd";
import {
  CloseOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";

const { Title, Text, Paragraph } = Typography;

const ScheduleDetails = ({
  content,
  openScheduleModal,
  setOpenScheduleModal,
}) => {
  const property = content?.propertyId;

  return (
    <Modal
      open={openScheduleModal}
      onCancel={() => setOpenScheduleModal(false)}
      footer={null}
      width="85%"
      style={{ top: 20, maxWidth: 1450 }}
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: 22,
            color: "#fff",
            background: "rgba(0,0,0,0.65)",
            padding: 10,
            borderRadius: "50%",
          }}
        />
      }
      bodyStyle={{
        padding: 0,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
        borderRadius: 16,
        maxHeight: "88vh",
        overflow: "auto",
      }}
    >
      {!content ? (
        <div style={{ padding: 80, textAlign: "center" }}>
          <Empty description="No schedule selected" />
        </div>
      ) : (
        <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                Viewing Appointment
              </Title>
              <Text type="secondary" strong>
                {format(new Date(content.date), "EEEE, do, MMM yyyy")} at{" "}
                {content.time} • {content.numberOfPeople} attendee(s)
              </Text>
            </Col>
            <Col>
              <Space>
                <Button type="primary" size="large">
                  Confirm
                </Button>
                <Button danger size="large">
                  Cancel
                </Button>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 32]}>
            <Col xs={24} lg={10}>
              <Card title="Client Information">
                <Space direction="vertical" size={16} style={{ width: "100%" }}>
                  <div>
                    <Text type="secondary">Name</Text>
                    <br />
                    <Text strong style={{ fontSize: 18 }}>
                      {content.name}
                    </Text>
                  </div>
                  <div>
                    <Text type="secondary">Contact</Text>
                    <br />
                    <Space>
                      <PhoneOutlined />
                      <Text>{content.phone}</Text>
                    </Space>
                    <br />
                    <Space style={{ marginTop: 4 }}>
                      <MailOutlined />
                      <Text>{content.email}</Text>
                    </Space>
                  </div>
                  {content.notes && (
                    <div>
                      <Text type="secondary">Notes</Text>
                      <br />
                      <Text italic>{content.notes}</Text>
                    </div>
                  )}
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={14}>
              <div style={{ position: "sticky", top: 20 }}>
                {/* Property Card */}
                <Card
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    border: "none",
                  }}
                  title={"Property Information"}
                  bodyStyle={{ padding: 0 }}
                >
                  {/* Property Images */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 8,
                      padding: 16,
                      background: "#f8fafc",
                    }}
                  >
                    {(Array.isArray(property?.img)
                      ? property.img
                      : [property?.img]
                    ).map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt={`Property ${i + 1}`}
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          borderRadius: 12,
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ padding: 24 }}>
                    {/* Status Tag */}
                    <Tag
                      icon={<HomeOutlined />}
                      style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 20,
                        padding: "6px 16px",
                        fontSize: 14,
                        fontFamily: "Raleway",
                        fontWeight: 600,
                        marginBottom: 16,
                      }}
                    >
                      {property?.status}
                    </Tag>

                    {/* Property Title */}
                    <Title
                      level={4}
                      style={{
                        fontFamily: "Raleway",
                        marginBottom: 8,
                        color: "#1e293b",
                      }}
                    >
                      {property?.propertyType}
                    </Title>

                    {/* Location */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 16,
                      }}
                    >
                      <EnvironmentOutlined
                        style={{ color: "#bdb890", fontSize: 16 }}
                      />
                      <Text
                        style={{
                          fontFamily: "Raleway",
                          color: "#64748b",
                        }}
                      >
                        {property?.address}, {property?.city}
                      </Text>
                    </div>

                    {/* Property Details */}
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        padding: "16px 0",
                        borderTop: "1px solid #e2e8f0",
                        borderBottom: "1px solid #e2e8f0",
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <Text
                          strong
                          style={{
                            fontFamily: "Raleway",
                            fontSize: 18,
                            color: "#1e293b",
                            display: "block",
                          }}
                        >
                          {property?.bedrooms}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Raleway",
                            fontSize: 12,
                            color: "#94a3b8",
                          }}
                        >
                          Bedrooms
                        </Text>
                      </div>
                      <Divider
                        type="vertical"
                        style={{ height: "auto", margin: 0 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            fontFamily: "Raleway",
                            fontSize: 18,
                            color: "#1e293b",
                            display: "block",
                          }}
                        >
                          {property?.bathrooms}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Raleway",
                            fontSize: 12,
                            color: "#94a3b8",
                          }}
                        >
                          Bathrooms
                        </Text>
                      </div>
                      <Divider
                        type="vertical"
                        style={{ height: "auto", margin: 0 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            fontFamily: "Raleway",
                            fontSize: 18,
                            color: "#1e293b",
                            display: "block",
                          }}
                        >
                          {property?.squareFeet}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Raleway",
                            fontSize: 12,
                            color: "#94a3b8",
                          }}
                        >
                          Sq. Ft
                        </Text>
                      </div>
                    </div>

                    {/* Description */}
                    <Paragraph
                      style={{
                        fontFamily: "Raleway",
                        color: "#64748b",
                        fontSize: 14,
                        marginBottom: 20,
                      }}
                    >
                      {property?.description}
                    </Paragraph>

                    {/* Agent Info */}
                    <div
                      style={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        padding: 20,
                        borderRadius: 12,
                        marginBottom: 16,
                      }}
                    >
                      <Text
                        strong
                        style={{
                          fontFamily: "Raleway",
                          fontSize: 14,
                          color: "#475569",
                          display: "block",
                          marginBottom: 12,
                        }}
                      >
                        Property Agent
                      </Text>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 8,
                        }}
                      >
                        <UserOutlined
                          style={{ color: "#bdb890", fontSize: 16 }}
                        />
                        <Text
                          style={{ fontFamily: "Raleway", color: "#1e293b" }}
                        >
                          {property?.agent.name}
                        </Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <PhoneOutlined
                          style={{ color: "#bdb890", fontSize: 16 }}
                        />
                        <Text
                          style={{ fontFamily: "Raleway", color: "#1e293b" }}
                        >
                          {property?.agent.phone}
                        </Text>
                      </div>
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
