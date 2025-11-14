import React from "react";
import {
  Typography,
  Card,
  Carousel,
  Button,
  Badge,
  Tag,
  Divider,
  Rate,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text } = Typography;
function PropertyCard({
  c,
  viewReviews,
  viewProperty,
  propertiesRefresh,
  source,
}) {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{
        minHeight: 200,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 12px rgba(0,0,0,0.17)",
        background: "#eae4ac81",
        border: `1px solid #ffffff7e00`,
      }}
      cover={
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 300,
            overflow: "hidden",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          {/* Carousel background */}
          <Badge.Ribbon
            text={`${c.listingType}`}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#8d8009ff",
              padding: "2px 10px",
              fontFamily: "Raleway",
            }}
          >
            <Carousel
              autoplay
              autoplaySpeed={3800}
              dots={false}
              style={{ height: "100%" }}
            >
              {(Array.isArray(c.img) ? c.img : [c.img]).map((img, i) => (
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
          </Badge.Ribbon>

          {/* Delete button overlay */}

          <Tooltip title="Edit property">
            <Button
              style={{
                position: "absolute",
                top: 10,
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
                top: 50,
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
                top: 90,
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
                top: 130,
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
      }
    >
      <Card.Meta
        title={
          <Title
            level={4}
            style={{
              marginTop: 1,
              marginBottom: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "Alegreya Sans",
              color: "red",
            }}
          >
            {c.address}
          </Title>
        }
        description={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                gap: 10,
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {c.propertyType}
              </Text>
              <Divider
                type="vertical"
                style={{
                  fontWeight: "bold",
                  margin: 0,
                  borderColor: "#aaa",
                }}
              />
              <Tag
                style={{
                  background:
                    c?.status === "For Sale"
                      ? "green"
                      : c?.status === "Pending" || c?.status === "Under Offer"
                      ? "orange"
                      : "green",
                  borderRadius: 4,
                  border: "0px solid rgba(0,0,0,0)",
                  padding: "0px 10px",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Roboto",
                    fontSize: 12,
                  }}
                >
                  {c.status}
                </Text>
              </Tag>
            </div>
            <Text
              type="secondary"
              style={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              {c.bedrooms} {c.bedrooms > 1 ? "Bedrooms" : "Bedroom"},{" "}
              {c.bathrooms} {c.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
            </Text>
            <div
              style={{
                marginTop: 4,
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Rate disabled allowHalf defaultValue={4.5} />{" "}
              <Text
                type="secondary"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                (5)
              </Text>
            </div>
          </div>
        }
      />
      <div>
        <Title
          level={4}
          style={{ fontFamily: "Raleway", marginTop: 4, marginBottom: 0 }}
        >
          KES. {c.price.toLocaleString()}
        </Title>
      </div>
    </Card>
  );
}

export default PropertyCard;
