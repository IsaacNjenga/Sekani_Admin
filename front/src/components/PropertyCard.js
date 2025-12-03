import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Carousel,
  Button,
  Tag,
  Rate,
  Tooltip,
  Space,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  StarFilled,
  HomeOutlined,
  HeartFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text } = Typography;
function PropertyCard({ c, viewReviews, viewProperty, propertiesRefresh }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const reviews = c?.reviews;
  const isMobile = false;
  const [likes, setLikes] = useState(c?.analytics[0]?.likes || 0);

  useEffect(() => {
    setLikes(c?.analytics[0]?.likes || 0);
  }, [c]);

  const averageRating =
    reviews?.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  if (!c) return;

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        minHeight: 200,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        background: "#fff",
        border: "none",
        transition: "all 0.3s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      bodyStyle={{
        padding: "15px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      cover={
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? 280 : 300,
            overflow: "hidden",
          }}
        >
          <Carousel
            autoplay
            autoplaySpeed={3800}
            fade
            dots={false}
            style={{ height: "100%" }}
          >
            {(Array.isArray(c?.img) ? c?.img : [c?.img]).map((img, i) => (
              <div key={i} style={{ width: "100%", height: 300 }}>
                <img
                  src={img}
                  alt={c.key}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    display: "block",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              </div>
            ))}
          </Carousel>

          {/* Status Badge */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 10,
              zIndex: 2,
            }}
          >
            <Tag
              style={{
                background:
                  c.status === "Available"
                    ? "linear-gradient(135deg, #53c41aa3, #73d13d91)"
                    : "linear-gradient(135deg, #faad14ae, #ffc53dac)",
                color: "white",
                border: "none",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 200,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontFamily: "Raleway",
              }}
            >
              {c.status || "Available"}
            </Tag>
          </div>

          {/* Property Type Badge */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 2,
              zIndex: 2,
            }}
          >
            <Tag
              icon={
                <HomeOutlined
                  style={{
                    fontSize: 12,
                    fontWeight: 200,
                  }}
                />
              }
              style={{
                background: "rgba(255, 255, 255, 0.79)",
                backdropFilter: "blur(10px)",
                color: "#919075",
                border: "none",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 200,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontFamily: "Raleway",
              }}
            >
              {c.propertyType || "Airbnb"}
            </Tag>
          </div>

          {/* Views/Favorite Icons */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 10,
              zIndex: 2,
              display: "flex",
              gap: 8,
              flexDirection: "column",
            }}
          >
            <Tooltip title="Likes">
              {" "}
              <div
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 20,
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                <HeartFilled style={{ color: "#b0aa94", fontSize: 14 }} />

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#595959",
                  }}
                >
                  {likes}
                </Text>
              </div>
            </Tooltip>
            <Tooltip title="Views">
              {" "}
              <div
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 20,
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                <EyeOutlined style={{ color: "#8c8c8c", fontSize: 14 }} />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#595959",
                  }}
                >
                  {c?.analytics[0]?.clicks || 0}
                </Text>
              </div>
            </Tooltip>
          </div>

          {/* other actions */}
          <div>
            <Tooltip title="Edit property">
              <Button
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 10,
                  zIndex: 10,
                  borderRadius: 18,
                  padding: "4px 16px",
                  border: "1px solid #00000000",
                  color: "#fff",
                }}
                shape="circle"
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate(`/update-property/${c._id}`)}
              />
            </Tooltip>

            <Tooltip title="Delete property">
              <Button
                style={{
                  position: "absolute",
                  bottom: 56,
                  left: 10,
                  zIndex: 10,
                  borderRadius: 18,
                  padding: "4px 16px",
                  border: "1px solid #00000000",
                  color: "#fff",
                }}
                danger
                shape="circle"
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
                        `delete-property?id=${c._id}`,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      );
                      if (res.data.success) {
                        Swal.fire({
                          icon: "success",
                          title: "Property Deleted Successfully!",
                        });
                        propertiesRefresh();
                      }
                    }
                  });
                }}
              />
            </Tooltip>

            <Tooltip title="View property">
              <Button
                style={{
                  position: "absolute",
                  bottom: 96,
                  left: 10,
                  zIndex: 10,
                  borderRadius: 18,
                  padding: "4px 16px",
                  border: "1px solid #00000000",
                  color: "#fff",
                  background: "#bdb890",
                }}
                shape="circle"
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => viewProperty(c)}
              />
            </Tooltip>

            <Tooltip title="View ratings">
              <Button
                style={{
                  position: "absolute",
                  bottom: 136,
                  left: 10,
                  zIndex: 10,
                  borderRadius: 18,
                  padding: "4px 16px",
                  border: "1px solid #00000000",
                  color: "#fff",
                  background: "gold",
                }}
                shape="circle"
                type="primary"
                icon={<StarFilled />}
                onClick={() => viewReviews(c)}
              />
            </Tooltip>
          </div>
        </div>
      }
    >
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Location */}
        <div style={{ marginBottom: 0 }}>
          <Space size={4}>
            <EnvironmentOutlined style={{ color: "#bdb890", fontSize: 16 }} />
            <Text
              type="secondary"
              style={{
                color: "#8c8c8c",
                fontSize: 16,
                fontFamily: "Bodoni Moda",
              }}
            >
              {c.city || "Nairobi"}, {c.county || "Nairobi County"}
            </Text>
          </Space>
        </div>
        {/* Title */}
        <Title
          level={isMobile ? 5 : 4}
          style={{
            marginTop: 0,
            marginBottom: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "Raleway",
            color: "#1e293b",
            fontSize: isMobile ? 14 : 18,
            fontWeight: 500,
          }}
        >
          {c.address}
        </Title>
        {/* Property Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 16,
            paddingBottom: 16,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {/* Bedroom & Bathroom */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {c.bedrooms && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexDirection: "row",
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1e293b",
                      lineHeight: 1.2,
                      fontFamily: "Raleway",
                    }}
                  >
                    {c.bedrooms}
                  </Text>{" "}
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#8c8c8c",
                      fontFamily: "Raleway",
                    }}
                  >
                    Beds
                  </Text>
                </div>
              </div>
            )}

            {c.bathrooms && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexDirection: "row",
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1e293b",
                      lineHeight: 1.2,
                      fontFamily: "Raleway",
                    }}
                  >
                    {c.bathrooms}
                  </Text>{" "}
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#8c8c8c",
                      fontFamily: "Raleway",
                    }}
                  >
                    Baths
                  </Text>
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div
            style={{
              marginTop: 0,
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Rate disabled allowHalf value={parseFloat(averageRating)} />{" "}
            <Text
              type="secondary"
              style={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              ({reviews?.length})
            </Text>
          </div>
        </div>

        {/* Price */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
          }}
        >
          <div>
            <Title
              level={5}
              style={{
                fontFamily: "Abril Fatface",
                margin: 0,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontSize: isMobile ? 12 : 16,
                color: "#54534cff",
                letterSpacing: 1,
                padding: 0,
              }}
            >
              KES {c.price.toLocaleString()}
            </Title>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PropertyCard;

//   <div
//     style={{
//       marginTop: 4,
//       marginBottom: 4,
//       display: "flex",
//       alignItems: "center",
//       gap: 10,
//     }}
//   >
//     <Rate disabled allowHalf value={parseFloat(averageRating)} />{" "}
//     <Text
//       type="secondary"
//       style={{
//         fontFamily: "Roboto",
//         fontWeight: 500,
//         fontSize: 14,
//       }}
//     >
//       ({reviews?.length})
//     </Text>
//   </div>
