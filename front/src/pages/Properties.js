import React from "react";
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

const { Title, Text } = Typography;

function Properties() {
  const { properties, propertiesLoading, propertiesRefresh, handleLoadMore } =
    useFetchAllProperties();

  if (propertiesLoading) {
    return <Spin size="large" fullscreen tip="Loading..." />;
  }
  return (
    <div>
      <Title>Properties</Title>
      <Divider />
      <Button onClick={handleLoadMore}>Load More</Button>
      {propertiesLoading && <p>Loading...</p>}
      <Button onClick={propertiesRefresh}>Refresh</Button>
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
                    <Badge.Ribbon
                      text={`${c.listingType}`}
                      style={{
                        display: "block",
                        right: "10px",
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
                    gap: 6,
                  }}
                >
                  <Title level={4} style={{ fontFamily: "Raleway" }}>
                    KES. {c.price.toLocaleString()}
                  </Title>
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
                    //onClick={() => viewProperty(c)}
                  >
                    View
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Properties;
