import { useState } from "react";
import {
  Typography,
  Image,
  Row,
  Col,
  Card,
  Tag,
  Avatar,
  Rate,
  Skeleton,
  Select,
  Space,
  Divider,
  Modal,
} from "antd";
import { formatDistanceToNowStrict } from "date-fns";
import {
  StarFilled,
  StarOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function ReviewModal({ content, setOpenModal, openModal, loading }) {
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const reviews = content?.reviews;

  const averageRating =
    reviews?.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  // Calculate rating distribution
  const ratingDistribution = {
    5: reviews?.filter((r) => r.rating === 5).length,
    4: reviews?.filter((r) => r.rating >= 4 && r.rating < 5).length,
    3: reviews?.filter((r) => r.rating >= 3 && r.rating < 4).length,
    2: reviews?.filter((r) => r.rating >= 2 && r.rating < 3).length,
    1: reviews?.filter((r) => r.rating >= 1 && r.rating < 2).length,
  };

  return (
    <Modal
      footer={null}
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
          maxHeight: "90vh",
          overflowY: "auto",
        },
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          minHeight: "100vh",
        }}
      >
        {/* Content */}
        <div
          style={{
            padding: "40px 60px",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <Row gutter={[32, 32]}>
            {/* Left Column - Reviews */}
            <Col xs={24} lg={16}>
              {/* Reviews Summary Card */}
              <Card
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  marginBottom: 32,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: "none",
                }}
                bodyStyle={{ padding: 32 }}
              >
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} md={8} style={{ textAlign: "left" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 8,
                        }}
                      >
                        <Title
                          level={1}
                          style={{
                            margin: 0,
                            fontSize: 64,
                            fontFamily: "Raleway",
                            background:
                              "linear-gradient(135deg, #bdb890, #a8a378)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {averageRating}
                        </Title>
                        <Text style={{ fontSize: 24, color: "#64748b" }}>
                          /5
                        </Text>
                      </div>
                      <Rate
                        disabled
                        allowHalf
                        value={parseFloat(averageRating)}
                        style={{ fontSize: 28 }}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#64748b",
                          fontFamily: "Raleway",
                        }}
                      >
                        Based on {reviews?.length} reviews
                      </Text>
                    </div>
                  </Col>

                  <Col xs={24} md={16}>
                    <Space
                      direction="vertical"
                      size={8}
                      style={{ width: "100%" }}
                    >
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div
                          key={star}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <Text
                            style={{
                              minWidth: 60,
                              fontFamily: "Raleway",
                              color: "#475569",
                            }}
                          >
                            {star}{" "}
                            <StarFilled
                              style={{ color: "#fbbf24", fontSize: 14 }}
                            />
                          </Text>
                          <div
                            style={{
                              flex: 1,
                              height: 10,
                              background: "#e2e8f0",
                              borderRadius: 5,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${
                                  (ratingDistribution[star] / reviews?.length) *
                                  100
                                }%`,
                                height: "100%",
                                background:
                                  "linear-gradient(90deg, #bdb890, #a8a378)",
                                transition: "width 0.3s ease",
                              }}
                            />
                          </div>
                          <Text
                            style={{
                              minWidth: 40,
                              fontFamily: "Raleway",
                              color: "#64748b",
                              textAlign: "right",
                            }}
                          >
                            {ratingDistribution[star]}
                          </Text>
                        </div>
                      ))}
                    </Space>
                  </Col>
                </Row>
              </Card>

              {/* Filters */}
              <div
                style={{
                  background: "#fff",
                  padding: 24,
                  borderRadius: 16,
                  marginBottom: 24,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "row",
                  gap: 16,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    flex: 1,
                  }}
                >
                  <div style={{ flex: "0 0 auto" }}>
                    <Text
                      strong
                      style={{
                        fontFamily: "Raleway",
                        marginRight: 8,
                        color: "#475569",
                      }}
                    >
                      Filter:
                    </Text>
                    <Select
                      value={selectedRating}
                      onChange={setSelectedRating}
                      style={{ width: 150 }}
                      options={[
                        { label: "All ratings", value: "all" },
                        { label: "5 stars", value: 5 },
                        { label: "4 stars", value: 4 },
                        { label: "3 stars", value: 3 },
                        { label: "2 stars", value: 2 },
                        { label: "1 star", value: 1 },
                      ]}
                    />
                  </div>
                  <div style={{ flex: "0 0 auto" }}>
                    <Text
                      strong
                      style={{
                        fontFamily: "Raleway",
                        marginRight: 8,
                        color: "#475569",
                      }}
                    >
                      Sort by:
                    </Text>
                    <Select
                      value={sortBy}
                      onChange={setSortBy}
                      style={{ width: 150 }}
                      options={[
                        { label: "Latest", value: "latest" },
                        { label: "Oldest", value: "oldest" },
                        { label: "Highest rated", value: "highest" },
                        { label: "Lowest rated", value: "lowest" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Card key={i} style={{ borderRadius: 16 }}>
                        <Skeleton active avatar paragraph={{ rows: 3 }} />
                      </Card>
                    ))
                ) : reviews?.length === 0 ? (
                  <Card
                    style={{
                      borderRadius: 16,
                      textAlign: "center",
                      padding: 40,
                      background: "#fff",
                    }}
                  >
                    <StarOutlined
                      style={{
                        fontSize: 64,
                        color: "#cbd5e1",
                        marginBottom: 16,
                      }}
                    />
                    <Title
                      level={4}
                      style={{ fontFamily: "Raleway", color: "#64748b" }}
                    >
                      No reviews yet
                    </Title>
                    <Text style={{ fontFamily: "Raleway", color: "#94a3b8" }}>
                      Be the first to share your experience
                    </Text>
                  </Card>
                ) : (
                  reviews?.map((review, idx) => (
                    <Card
                      key={idx}
                      style={{
                        borderRadius: 16,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        border: "1px solid #e2e8f0",
                        transition: "all 0.3s ease",
                        background: "#fff",
                      }}
                      bodyStyle={{ padding: 28 }}
                      hoverable
                    >
                      {/* Review Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 16,
                          flexWrap: "wrap",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                          }}
                        >
                          <Avatar
                            size={56}
                            style={{
                              background:
                                "linear-gradient(135deg, #bdb890, #a8a378)",
                              fontSize: 24,
                              fontWeight: 600,
                            }}
                          >
                            {review?.name[0]}
                          </Avatar>
                          <div>
                            <Text
                              strong
                              style={{
                                fontFamily: "Raleway",
                                fontSize: 18,
                                display: "block",
                                color: "#1e293b",
                              }}
                            >
                              {review?.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "Raleway",
                                fontSize: 14,
                                color: "#94a3b8",
                              }}
                            >
                              {formatDistanceToNowStrict(
                                new Date(review?.createdAt)
                              )}{" "}
                              ago
                            </Text>
                          </div>
                        </div>
                        <Rate
                          disabled
                          allowHalf
                          value={review?.rating}
                          style={{ fontSize: 18 }}
                        />
                      </div>

                      {/* Review Content */}
                      <div>
                        <Title
                          level={4}
                          style={{
                            fontFamily: "Raleway",
                            marginBottom: 8,
                            color: "#334155",
                          }}
                        >
                          {review?.title}
                        </Title>
                        <Paragraph
                          style={{
                            fontFamily: "Raleway",
                            fontSize: 15,
                            lineHeight: 1.8,
                            color: "#64748b",
                            marginBottom: 0,
                          }}
                        >
                          {review?.review}
                        </Paragraph>
                      </div>
                    </Card>
                  ))
                )}
              </Space>
            </Col>

            {/* Right Column - Property Info */}
            <Col xs={24} lg={8}>
              <div style={{ position: "sticky", top: 20 }}>
                {/* Property Card */}
                <Card
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    border: "none",
                  }}
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
                    {(Array.isArray(content?.img)
                      ? content.img
                      : [content?.img]
                    ).map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt={`Property ${i + 1}`}
                        style={{
                          width: "100%",
                          height: 120,
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
                      {content?.status}
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
                      {content?.propertyType}
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
                        {content?.address}, {content?.city}
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
                          {content?.bedrooms}
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
                          {content?.bathrooms}
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
                          {content?.squareFeet}
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
                      {content?.description}
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
                          {content?.agent.name}
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
                          {content?.agent.phone}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

export default ReviewModal;
