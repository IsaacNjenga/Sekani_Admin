import {
  Carousel,
  Col,
  Image,
  Modal,
  Row,
  Typography,
  Tag,
  Space,
  Rate,
  Card,
  Avatar,
  Button,
  Tabs,
} from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  UserOutlined,
  StarFilled,
  DeleteOutlined,
  CloseOutlined,
  EditOutlined,
  PictureOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import VideoCarousel from "./VideoCarousel";

const { Title, Text, Paragraph } = Typography;

function PropertyModal({ openModal, setOpenModal, loading, content, token }) {
  const navigate = useNavigate();

  const averageRating =
    content?.reviews?.length > 0
      ? (
          content.reviews.reduce((sum, r) => sum + r.rating, 0) /
          content.reviews.length
        ).toFixed(1)
      : 0;

  return (
    <Modal
      footer={
        <div style={{ gap: 10, display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              borderRadius: 18,
              padding: "8px 16px",
              border: "1px solid #00000000",
              color: "#fff",
            }}
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/update-property/${content?._id}`)}
          >
            Edit Property
          </Button>
          <Button
            style={{
              borderRadius: 18,
              padding: "8px 16px",
              border: "1px solid #00000000",
              color: "#fff",
            }}
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "lightgreen",
                cancelButtonColor: "red",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const res = await axios.delete(
                    `delete-property?id=${content?._id}`,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  if (res.data.success) {
                    Swal.fire({
                      icon: "success",
                      title: "Property Deleted Successfully!",
                    });
                    setOpenModal(false);
                  }
                }
              });
            }}
          >
            Delete Property
          </Button>
        </div>
      }
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width="95%"
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: 24,
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
        overflow: "hidden",
      }}
      style={{ top: 20 }}
      styles={{
        body: {
          maxHeight: "80vh",
          overflowY: "auto",
        },
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#000",
          height: "100vh",
          width: "auto",
        }}
      >
        <div style={{ width: "100%" }}>
          <Tabs
            defaultActiveKey="images"
            centered
            style={{
              background: "rgba(0,0,0,0.8)",
            }}
            tabBarStyle={{
              marginBottom: 0,
              background: "rgba(0,0,0,0.8)",
            }}
            items={[
              {
                key: "images",
                label: (
                  <span style={{ color: "#fff", fontFamily: "Raleway" }}>
                    <PictureOutlined /> Photos
                  </span>
                ),
                children: (
                  <div
                    style={{
                      height: "50vh",
                      minHeight: 300,
                      maxHeight: 400,
                      margin: "auto",
                      width: "50%",
                    }}
                  >
                    <Carousel
                      autoplay
                      autoplaySpeed={4000}
                      arrows
                      dots
                      dotPosition="top"
                      style={{
                        height: "auto",
                        margin: "auto",
                        width: "50%",
                      }}
                    >
                      {(Array.isArray(content?.img)
                        ? content.img
                        : [content?.img]
                      ).map((img, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#000",
                            height: "90vh",
                            overflow: "hidden",
                            margin: "auto",
                            width: "50%",
                            alignContent: "center",
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={img}
                            alt={`Property ${index + 1}`}
                            preview={{
                              mask: "⛶ Click to view",
                            }}
                            style={{
                              width: "100%",
                              height: "90vh",
                              objectFit: "contain",
                              objectPosition: "center",
                              marginTop: 0,
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                ),
              },
              {
                key: "videos",
                label: (
                  <span style={{ color: "#fff", fontFamily: "Raleway" }}>
                    <PlayCircleOutlined /> Videos
                  </span>
                ),
                children: (
                  <div
                    style={{
                      height: "50vh",
                      minHeight: 300,
                    }}
                  >
                    {content?.vid?.length === 0 ||
                    content?.vid === undefined ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "auto",
                          height: "auto",
                          width: "50%",
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            textAlign: "center",
                            fontFamily: "Raleway",
                            fontSize: "1.6rem",
                          }}
                        >
                          You have not added any videos. Click the edit button
                          to add some.
                        </Text>
                      </div>
                    ) : (
                      <VideoCarousel content={content?.vid} />
                    )}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: 40 }}>
        <Row gutter={[32, 32]}>
          {/* Left Column - Main Info */}
          <Col xs={24} lg={16}>
            {/* Property Title & Location */}
            <div
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 20,
                marginBottom: 24,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <HomeOutlined
                  style={{
                    fontSize: 32,
                    color: "#bdb890",
                  }}
                />
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    fontFamily: "Raleway",
                    background: "linear-gradient(135deg, #1e293b, #334155)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {content?.propertyType}
                  {content?.bedrooms > 0 &&
                    ` • ${content?.bedrooms} BR / ${content?.bathrooms} BA`}
                </Title>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <EnvironmentOutlined
                  style={{ fontSize: 20, color: "#bdb890" }}
                />
                <Text
                  style={{
                    fontFamily: "Raleway",
                    fontSize: 16,
                    color: "#64748b",
                  }}
                >
                  {content?.address}, {content?.city}, {content?.county}
                </Text>
              </div>
              <div style={{ marginTop: 10, marginBottom: 0 }}>
                <Tag
                  icon={<CheckCircleOutlined />}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    padding: "8px 20px",
                    borderRadius: 24,
                    border: "none",
                    background:
                      content?.status === "Available"
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : content?.status === "Pending"
                        ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {content?.status}
                </Tag>
              </div>
              {/* Quick Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 16,
                  marginTop: 24,
                }}
              >
                {content?.squareFeet && (
                  <StatCard
                    icon={<HomeOutlined />}
                    label="Size"
                    value={`${content.squareFeet} sq. ft`}
                  />
                )}
                {content?.yearBuilt && (
                  <StatCard
                    icon={<CalendarOutlined />}
                    label="Price"
                    value={`KES. ${content.price?.toLocaleString()}`}
                  />
                )}
                {content?.rating > 0 && (
                  <StatCard
                    icon={<StarFilled />}
                    label="Rating"
                    value={`${averageRating} / 5`}
                  />
                )}
              </div>
            </div>

            {/* Description */}
            <div
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 20,
                marginBottom: 24,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Title
                level={4}
                style={{
                  fontFamily: "Raleway",
                  color: "#1e293b",
                  marginBottom: 16,
                }}
              >
                About This Property
              </Title>
              <Paragraph
                style={{
                  fontFamily: "Raleway",
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#475569",
                }}
              >
                {content?.description}
              </Paragraph>
            </div>

            {/* Amenities */}
            {content?.amenities?.length > 0 && (
              <div
                style={{
                  background: "#fff",
                  padding: 32,
                  borderRadius: 20,
                  marginBottom: 24,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Raleway",
                    color: "#1e293b",
                    marginBottom: 16,
                  }}
                >
                  Amenities & Features
                </Title>
                <Space wrap size={[12, 12]}>
                  {content.amenities.map((item, index) => (
                    <Tag
                      key={index}
                      style={{
                        background: "linear-gradient(135deg, #bdb890, #a8a378)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 20,
                        padding: "6px 16px",
                        fontSize: 14,
                        fontFamily: "Raleway",
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {/* Nearby Landmarks */}
            {content?.nearby?.length > 0 && (
              <div
                style={{
                  background: "#fff",
                  padding: 32,
                  borderRadius: 20,
                  marginBottom: 24,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Raleway",
                    color: "#1e293b",
                    marginBottom: 16,
                  }}
                >
                  Nearby Landmarks
                </Title>
                <Space wrap size={[12, 12]}>
                  {content.nearby.map((item, index) => (
                    <Tag
                      key={index}
                      icon={<EnvironmentOutlined />}
                      style={{
                        background: "#f1f5f9",
                        color: "#334155",
                        border: "1px solid #e2e8f0",
                        borderRadius: 20,
                        padding: "6px 16px",
                        fontSize: 14,
                        fontFamily: "Raleway",
                      }}
                    >
                      {item}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {/* Reviews Section */}
            <div
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <Title
                  level={4}
                  style={{
                    fontFamily: "Raleway",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Reviews{" "}
                  {content?.reviews?.length > 0 &&
                    `(${content.reviews.length})`}
                </Title>
                {content?.reviews?.length > 0 && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Rate
                      disabled
                      allowHalf
                      value={parseFloat(averageRating)}
                    />
                    <Text strong style={{ fontSize: 18, color: "#bdb890" }}>
                      {averageRating}
                    </Text>
                  </div>
                )}
              </div>

              {content?.reviews?.length === 0 || !content?.reviews ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    background: "#f8fafc",
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ fontFamily: "Raleway", fontSize: 16 }}>
                    No reviews yet.{" "}
                  </Text>
                </div>
              ) : (
                <>
                  <Space
                    direction="vertical"
                    size={16}
                    style={{ width: "100%" }}
                  >
                    {content.reviews.slice(0, 3).map((review, idx) => (
                      <Card
                        key={idx}
                        style={{
                          borderRadius: 12,
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }}
                        bodyStyle={{ padding: 20 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 12,
                            flexWrap: "wrap",
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <Avatar
                              size={40}
                              style={{
                                background:
                                  "linear-gradient(135deg, #bdb890, #a8a378)",
                                fontSize: 18,
                                fontWeight: 600,
                              }}
                            >
                              {review.name[0]}
                            </Avatar>
                            <Text
                              strong
                              style={{
                                fontFamily: "Raleway",
                                fontSize: 16,
                              }}
                            >
                              {review.name}
                            </Text>
                          </div>
                          <Rate
                            disabled
                            allowHalf
                            value={review.rating}
                            style={{ fontSize: 16 }}
                          />
                        </div>
                        <Paragraph
                          style={{
                            fontFamily: "Raleway",
                            color: "#64748b",
                            marginBottom: 0,
                            fontSize: 15,
                          }}
                        >
                          {review.review}
                        </Paragraph>
                      </Card>
                    ))}
                  </Space>

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: 24,
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                    }}
                  >
                    {content.reviews.length > 3 && (
                      <Button
                        size="large"
                        onClick={() => navigate(`/reviews?id=${content?._id}`)}
                        style={{
                          borderRadius: 10,
                          fontFamily: "Raleway",
                          fontWeight: 600,
                        }}
                      >
                        See All {content.reviews.length} Reviews
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>

          {/* Right Column - Agent & CTA */}
          <Col xs={24} lg={8}>
            {/* Agent Card */}
            <div
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                padding: 32,
                borderRadius: 20,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                position: "sticky",
                top: 20,
              }}
            >
              <Title
                level={4}
                style={{
                  fontFamily: "Raleway",
                  color: "#fff",
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Agent
              </Title>

              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  padding: 24,
                  borderRadius: 16,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <Avatar
                    size={80}
                    icon={<UserOutlined />}
                    style={{
                      background: "linear-gradient(135deg, #bdb890, #a8a378)",
                      fontSize: 32,
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <Text
                      strong
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontFamily: "Raleway",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {content?.agent?.name}
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <PhoneOutlined style={{ color: "#bdb890" }} />
                      <Text
                        style={{
                          color: "#cbd5e1",
                          fontFamily: "Raleway",
                          fontSize: 16,
                        }}
                      >
                        {content?.agent?.phone}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

// Helper Component for Stats Cards
const StatCard = ({ icon, label, value }) => (
  <div
    style={{
      background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
      padding: 16,
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div
      style={{
        fontSize: 24,
        color: "#bdb890",
      }}
    >
      {icon}
    </div>
    <div>
      <Text
        style={{
          display: "block",
          fontSize: 12,
          color: "#64748b",
          fontFamily: "Raleway",
        }}
      >
        {label}
      </Text>
      <Text
        strong
        style={{
          fontSize: 16,
          color: "#1e293b",
          fontFamily: "Raleway",
        }}
      >
        {value}
      </Text>
    </div>
  </div>
);

export default PropertyModal;
