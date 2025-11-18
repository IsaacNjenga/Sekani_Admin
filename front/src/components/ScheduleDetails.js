import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Divider,
  Button,
  List,
  Card,
  Avatar,
  Tag,
  Carousel,
  Empty,
  Row,
  Col,
  Space,
} from "antd";
import {
  CloseOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  TeamOutlined,
  DollarOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// Mock property database (in real app, fetch by propertyId)
const properties = {
  1: {
    _id: 1,
    address: "15 Peponi Road, Westlands",
    city: "Nairobi",
    state: "Nairobi County",
    zip: "00800",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    yearBuilt: 2018,
    propertyType: "Maisonette",
    listingType: "For Sale",
    furnished: false,
    paymentOptions: ["Cash", "Mortgage"],
    description:
      "Luxurious four-bedroom maisonette with a private garden in the secure, leafy suburbs of Westlands. Features modern, high-end finishes and all bedrooms are en-suite.",
    amenities: [
      "Private Garden",
      "Backup Generator",
      "Borehole",
      "Servant's Quarters (SQ)",
    ],
    nearby: ["Sarit Centre", "Westgate Mall", "Nairobi International School"],
    status: "Available",
    img: [
      "https://images.unsplash.com/photo-1694457269860-b7926c29e008?w=900",
      "https://images.unsplash.com/photo-1560185127-59e4420e2c93?w=900",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900",
    ],
    agent: { name: "Mary Wanjiku", phone: "+254712345678" },
    reviews: [
      { name: "Susan K", rating: 4.5, review: "Great place to live" },
      {
        name: "John N",
        rating: 4.8,
        review: "Excellent location and finishes!",
      },
    ],
  },
  // ... add more properties as needed
};

function prettyDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const ScheduleDetails = ({
  content,
  openScheduleModal,
  setOpenScheduleModal,
  loading = false,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!content) {
      setSelectedItem(null);
      return;
    }

    if (content.name) {
      // Single booking
      const property = properties[content.propertyId] || null;
      setSelectedItem({ ...content, property });
    } else if (content.items?.length === 1) {
      const property = properties[content.items[0].propertyId] || null;
      setSelectedItem({ ...content.items[0], property });
    } else {
      setSelectedItem(null);
    }
  }, [content]);

  const isDateGroup = content && content.items && content.items.length > 0;

  // For grouped view — enrich all items with property data
  const enrichedItems = isDateGroup
    ? content.items.map((item) => ({
        ...item,
        property: properties[item.propertyId] || null,
      }))
    : [];

  const currentBooking = selectedItem || (isDateGroup ? null : content);
  const property = currentBooking?.property;

  return (
    <Modal
      open={openScheduleModal}
      onCancel={() => setOpenScheduleModal(false)}
      footer={null}
      width="95%"
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
        overflow: "hidden",
      }}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      {!content ? (
        <div style={{ padding: 80, textAlign: "center" }}>
          <Empty description="No schedule selected" />
        </div>
      ) : isDateGroup ? (
        // === MULTIPLE BOOKINGS ON SAME DATE ===
        <div
          style={{ padding: "24px 32px", height: "88vh", overflowY: "auto" }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 8 }}
          >
            <div>
              <Title level={3} style={{ margin: 0 }}>
                <CalendarOutlined /> Bookings for {prettyDate(content.date)}
              </Title>
              <Text type="secondary">
                {content.items.length} appointment(s)
              </Text>
            </div>
            <Button onClick={() => setOpenScheduleModal(false)}>Close</Button>
          </Row>

          <Divider style={{ margin: "16px 0" }} />

          <Row gutter={32}>
            {/* Left: List of bookings */}
            <Col span={10}>
              <List
                dataSource={enrichedItems}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      padding: 16,
                      marginBottom: 12,
                      background: "#fff",
                      borderRadius: 12,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      cursor: "pointer",
                      border:
                        selectedItem?._id === item._id ||
                        selectedItem?.email === item.email
                          ? "2px solid #1890ff"
                          : "2px solid transparent",
                    }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} size={48} />}
                      title={
                        <Space>
                          <Text strong>{item.name}</Text>
                          <Text type="secondary">{item.time}</Text>
                        </Space>
                      }
                      description={
                        <>
                          <div>
                            <PhoneOutlined /> {item.phone}
                          </div>
                          <div style={{ marginTop: 4 }}>
                            <HomeOutlined />{" "}
                            {item.property?.address ||
                              "Property ID: " + item.propertyId}
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>

            {/* Right: Selected booking + property details */}
            <Col span={14}>
              {selectedItem ? (
                <div>
                  <Title level={4}>{selectedItem.name}'s Appointment</Title>
                  <Text type="secondary">
                    <CalendarOutlined /> {selectedItem.date} at{" "}
                    {selectedItem.time} • <TeamOutlined />{" "}
                    {selectedItem.numberOfPeople} people
                  </Text>

                  {property && (
                    <Card
                      style={{ marginTop: 16 }}
                      cover={
                        <Carousel autoplay arrows>
                          {property.img.map((src, i) => (
                            <div key={i}>
                              <img
                                alt={`Property ${i + 1}`}
                                src={src}
                                style={{
                                  width: "100%",
                                  height: 300,
                                  objectFit: "cover",
                                  borderRadius: "12px 12px 0 0",
                                }}
                              />
                            </div>
                          ))}
                        </Carousel>
                      }
                    >
                      <Card.Meta
                        title={
                          <Space align="center">
                            <Text strong style={{ fontSize: 18 }}>
                              {property.address}
                            </Text>
                            <Tag color="green">For Sale</Tag>
                          </Space>
                        }
                        description={
                          <>
                            <Space size={16} wrap>
                              <span>
                                <strong>{property.bedrooms}</strong> bd
                              </span>
                              <span>
                                <strong>{property.bathrooms}</strong> ba
                              </span>
                              <span>
                                <strong>{property.squareFeet}</strong> sqft
                              </span>
                              <span>
                                <DollarOutlined /> KSh{" "}
                                {property.price.toLocaleString()}
                              </span>
                            </Space>
                          </>
                        }
                      />

                      <Divider />

                      <Paragraph>{property.description}</Paragraph>

                      <div style={{ margin: "16px 0" }}>
                        <Text strong>Amenities:</Text>
                        <Space wrap style={{ marginTop: 8 }}>
                          {property.amenities.map((a) => (
                            <Tag
                              icon={<CheckCircleFilled />}
                              color="success"
                              key={a}
                            >
                              {a}
                            </Tag>
                          ))}
                        </Space>
                      </div>

                      <Space style={{ marginTop: 24 }}>
                        <Button type="primary" size="large">
                          Confirm Booking
                        </Button>
                        <Button danger size="large">
                          Cancel Booking
                        </Button>
                        <Button
                          size="large"
                          onClick={() => setSelectedItem(null)}
                        >
                          Back to List
                        </Button>
                      </Space>
                    </Card>
                  )}
                </div>
              ) : (
                <Card style={{ textAlign: "center", padding: 40 }}>
                  <Title level={5}>👈 Select a booking</Title>
                  <Paragraph type="secondary">
                    Click on any appointment from the list to view full details
                    and property photos.
                  </Paragraph>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        // === SINGLE BOOKING VIEW ===
        <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                Viewing Appointment
              </Title>
              <Text type="secondary">
                {content.date} at {content.time} • {content.numberOfPeople}{" "}
                attendee(s)
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
                <Button onClick={() => setOpenScheduleModal(false)}>
                  Close
                </Button>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={32}>
            <Col span={10}>
              <Card title="Client Information" bordered={false}>
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

            <Col span={14}>
              {property && (
                <Card
                  title={
                    <Space>
                      <HomeOutlined />
                      Property: {property.address}
                    </Space>
                  }
                  cover={
                    <Carousel autoplay>
                      {property.img.map((src, i) => (
                        <img
                          key={i}
                          alt="property"
                          src={src}
                          style={{
                            width: "100%",
                            height: 320,
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </Carousel>
                  }
                >
                  <Paragraph>{property.description}</Paragraph>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Text strong>{property.bedrooms} Bedrooms</Text>
                    </Col>
                    <Col span={8}>
                      <Text strong>{property.bathrooms} Bathrooms</Text>
                    </Col>
                    <Col span={8}>
                      <Text strong>{property.squareFeet} sqft</Text>
                    </Col>
                  </Row>

                  <Divider style={{ margin: "12px 0" }} />

                  <Text strong>Price: </Text>
                  <Text style={{ fontSize: 24, color: "#52c41a" }}>
                    KSh {property.price.toLocaleString()}
                  </Text>

                  <div style={{ marginTop: 16 }}>
                    <Text strong>Amenities: </Text>
                    <Space wrap>
                      {property.amenities.map((a) => (
                        <Tag key={a} color="blue">
                          {a}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      )}
    </Modal>
  );
};

export default ScheduleDetails;
