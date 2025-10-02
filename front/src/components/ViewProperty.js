import {
  Carousel,
  Col,
  Image,
  Modal,
  Row,
  Typography,
  Tag,
  Divider,
  Space,
} from "antd";
import {
  HomeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function ViewProperty({ openModal, setOpenModal, loading, content }) {
  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={"90%"}
      bodyStyle={{ padding: 24, backgroundColor: "whitesmoke" }}
      style={{ top: 8 }}
    >
      <Row gutter={[24, 24]}>
        {/* Left Column - Images */}
        <Col
          xs={24}
          md={12}
          style={{
            alignItems: "center",
          }}
        >
          <Carousel
            autoplay={{ dotDuration: true }}
            autoplaySpeed={3000}
            arrows
          >
            {Array.isArray(content?.img) && content?.img.length > 0 ? (
              content.img.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={content?.listingId}
                  height={500}
                  width={500}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 18,
                  }}
                />
              ))
            ) : (
              <Image
                src={content?.img}
                alt={content?.listingId}
                height={500}
                width={500}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 18,
                }}
              />
            )}
          </Carousel>
        </Col>

        {/* Right Column - Details */}
        <Col xs={24} md={12}>
          <Title
            level={2}
            style={{ marginBottom: 0, fontFamily: "Alegreya Sans" }}
          >
            {content?.propertyType} – {content?.bedrooms} BR /{" "}
            {content?.bathrooms} BA
          </Title>
          <Text
            type="secondary"
            style={{ fontFamily: "Raleway", fontSize: 18, marginBottom: 0 }}
          >
            <EnvironmentOutlined /> {content?.address}, {content?.city},{" "}
            {content?.state}
          </Text>

          <Divider
            orientation="left"
            style={{ borderColor: "#333", marginBottom: 0 }}
          >
            <Text
              style={{
                fontFamily: "Raleway",
                fontWeight: 800,
                fontSize: 18,
                margin: 0,
              }}
            >
              About
            </Text>
          </Divider>
          <Paragraph style={{ fontFamily: "Raleway" }}>
            {content?.description}
          </Paragraph>

          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 5,
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text strong style={{ fontFamily: "Raleway" }}>
                  <DollarOutlined style={{ fontSize: 22 }} /> Price: KES{" "}
                  {content?.price?.toLocaleString()}
                </Text>
                <Text strong style={{ fontFamily: "Raleway" }}>
                  <HomeOutlined style={{ fontSize: 22 }} /> Size:{" "}
                  {content?.squareFeet} sq. ft
                </Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text strong style={{ fontFamily: "Raleway" }}>
                  <CalendarOutlined style={{ fontSize: 22 }} /> Built:{" "}
                  {content?.yearBuilt}
                </Text>
                <Text strong style={{ fontFamily: "Raleway" }}>
                  <CheckCircleOutlined style={{ fontSize: 22 }} /> Status:{" "}
                  <Tag
                    style={{
                      fontFamily: "Raleway",
                      color: "#fff",
                      borderRadius: 10,
                      border: "0px solid rgba(0,0,0,0)",
                      padding: "2px 8px",
                      background:
                        content?.status === "For Sale"
                          ? "green"
                          : content?.status === "Pending"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {content?.status}
                  </Tag>
                </Text>
              </div>
            </div>
          </Space>

          <Divider
            orientation="left"
            style={{ borderColor: "#333", marginBottom: 4 }}
          >
            <Text
              style={{
                fontFamily: "Raleway",
                fontWeight: 800,
                fontSize: 18,
                margin: 0,
              }}
            >
              Amenities
            </Text>
          </Divider>
          <Space wrap>
            {content?.amenities?.map((item, index) => (
              <Tag
                key={index}
                style={{
                  backgroundColor: "#8d8009ff",
                  color: "#fff",
                  borderRadius: 10,
                  border: "0px solid rgba(0,0,0,0)",
                  padding: "2px 10px",
                }}
              >
                {item}
              </Tag>
            ))}
          </Space>
          <Divider
            orientation="left"
            style={{ borderColor: "#333", marginBottom: 4 }}
          >
            {" "}
            <Text
              style={{
                fontFamily: "Raleway",
                fontWeight: 800,
                fontSize: 18,
                margin: 0,
              }}
            >
              Nearby Landmarks
            </Text>
          </Divider>
          <Space wrap size={[8, 8]}>
            {content?.nearby?.map((item, index) => (
              <Tag
                key={index}
                icon={<EnvironmentOutlined />}
                color="geekblue"
                style={{
                  borderRadius: 16,
                  fontSize: 14,
                  padding: "4px 12px",
                  fontFamily: "Raleway",
                }}
              >
                {item}
              </Tag>
            ))}
          </Space>

          <Divider
            orientation="left"
            style={{ borderColor: "#333", marginBottom: 2 }}
          >
            {" "}
            <Text
              style={{
                fontFamily: "Raleway",
                fontWeight: 800,
                fontSize: 18,
                margin: 0,
              }}
            >
              Agent Info
            </Text>
          </Divider>
          <Space direction="vertical" size={2}>
            <Text
              strong
              style={{
                fontFamily: "Raleway",
              }}
            >
              {content?.agent?.name}
            </Text>
            <Text
              type="secondary"
              style={{
                fontFamily: "Raleway",
              }}
            >
              {content?.agent?.phone}
            </Text>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
}

export default ViewProperty;
