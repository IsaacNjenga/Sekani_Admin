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
  Card,
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
      width={"85vw"}
      style={{
        width: "auto",
        marginTop: 0,
        marginBottom: 0,
        top: 20,
        padding: 20,
      }}
    >
      <Row gutter={[24, 24]}>
        {/* Left Column - Images */}
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            background: "linear-gradient(to right, #8f820b60, #def7e4)",
          }}
        >
          <Card
            style={{
              background: "transparent",
              borderColor: "#8d3c3c00",
              margin: 0,
              padding: 0,
              borderRadius: 0,
            }}
          >
            <Carousel autoplay autoplaySpeed={4500} dots arrows>
              {(Array.isArray(content?.img)
                ? content?.img
                : [content?.img]
              ).map((img, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#8f810b",
                  }}
                >
                  <Image
                    src={img}
                    alt="img"
                    height={500}
                    width={500}
                    style={{
                      width: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                      borderRadius: 0,
                      display: "block",
                      margin: "10px auto",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>

        {/* Right Column - Details */}
        <Col
          xs={24}
          sm={24}
          md={12}
          style={{
            background: "linear-gradient(to left, #8f820b42, #def7e425)",
            padding: 10,
          }}
        >
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
