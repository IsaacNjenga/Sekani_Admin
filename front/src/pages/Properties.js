import React, { useState } from "react";
import useFetchAllProperties from "../hooks/fetchAllProperties";
import {
  Typography,
  Image,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Badge,
  Tag,
  Divider,
  Spin,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ViewProperty from "../components/ViewProperty";

const { Title, Text } = Typography;

function Properties() {
  const navigate = useNavigate();
  const { properties, propertiesLoading, propertiesRefresh, handleLoadMore } =
    useFetchAllProperties();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  const viewProperty = (property) => {
    setLoading(true);
    setContent(property);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  if (propertiesLoading) {
    return <Spin size="large" fullscreen tip="Loading..." />;
  }
  return (
    <div>
      <Title>Properties</Title>
      <Divider />
      {/* <Button onClick={propertiesRefresh}>Refresh</Button> */}
      <div style={{ marginTop: 20 }}>
        <Row gutter={[32, 32]}>
          {properties.map((c) => (
            <Col key={c.key} xs={24} sm={12} md={8}>
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
                      height: 350,
                      overflow: "hidden",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      padding: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          display: "block",
                          top: 10,
                          left: 10,
                          zIndex: 10,
                        }}
                      >
                        <Button
                          style={{
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
                              confirmButtonColor: "blue",
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                alert("Delete functionality to be implemented");
                              }
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Badge.Ribbon
                          text={`${c.listingType}`}
                          style={{
                            display: "block",
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
                            //fade
                            dots={false}
                          >
                            {c.img.length > 1 ? (
                              c.img.map((img) => (
                                <Image
                                  src={img}
                                  alt={c.key}
                                  preview={false}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 12,
                                  }}
                                />
                              ))
                            ) : (
                              <Image
                                src={c.img}
                                alt={c.key}
                                preview={false}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: 12,
                                }}
                              />
                            )}
                          </Carousel>
                        </Badge.Ribbon>
                      </div>
                    </div>
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
                        {/* <p style={{ fontWeight: "bold", margin: 0 }}>|</p> */}
                        <Tag
                          style={{
                            background:
                              c?.status === "For Sale"
                                ? "green"
                                : c?.status === "Pending" ||
                                  c?.status === "Under Offer"
                                ? "orange"
                                : "green",
                            borderRadius: 10,
                            border: "0px solid rgba(0,0,0,0)",
                            padding: "2px 10px",
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
                        {c.bathrooms}{" "}
                        {c.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                      </Text>
                    </div>
                  }
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 0,
                    gap: 2,
                  }}
                >
                  <div>
                    <Title level={4} style={{ fontFamily: "Raleway" }}>
                      KES. {c.price.toLocaleString()}
                    </Title>
                  </div>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Button
                      type="primary"
                      style={{
                        borderRadius: 18,
                        padding: "4px 16px",
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        background: "rgba(0,0,0,0)",
                        border: "1px solid #333",
                        color: "#333",
                      }}
                      onClick={() => navigate(`/update-property/${c._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="primary"
                      style={{
                        borderRadius: 18,
                        padding: "4px 16px",
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        background: "rgba(0,0,0,0)",
                        border: "1px solid #333",
                        color: "#333",
                      }}
                      onClick={() => viewProperty(c)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div style={{ marginTop: 20, marginBottom: 50, textAlign: "center" }}>
        <Button
          onClick={handleLoadMore}
          type="primary"
          size="large"
          style={{ fontFamily: "Raleway" }}
        >
          Load More
        </Button>
      </div>

      <ViewProperty
        setOpenModal={setOpenModal}
        openModal={openModal}
        loading={loading}
        content={content}
      />
    </div>
  );
}

export default Properties;
