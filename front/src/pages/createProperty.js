import {
  Button,
  Card,
  Form,
  Input,
  Spin,
  Row,
  Col,
  Select,
  Switch,
  Image as AntImage,
  Divider,
  Typography,
} from "antd";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const inputStyle = {
  borderRadius: 8,
  height: 40,
  fontFamily: "Raleway",
};

const labelStyle = {
  fontFamily: "Raleway",
  fontWeight: "bold",
  fontSize: 15,
};

function CreateProperty() {
  const { user, token } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([
    "https://images.unsplash.com/photo-1631901999319-efd71a712378?w=900",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900",
    "https://plus.unsplash.com/premium_photo-1689609950071-af404daa58a0?w=900",
  ]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const allValues = await form.validateFields();
      const values = {
        ...allValues,
        createdBy: user?._id,
        agent: { name: allValues.agentName, phone: allValues.agentPhone },
        img: [],
      };
      console.log(values);

      const res = await axios.post("create-property", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Property Created!",
          //   text: res.data.message,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  if (loading)
    return <Spin fullscreen tip="Creating Property..." size="large" />;

  const removeImage = (e, index) => {
    e.preventDefault();
    setSelectedImages((prev) => {
      const toKeep = prev.filter((_, i) => i !== index);
      // revoke URL for removed items
      prev.forEach((it, i) => {
        if (i === index) URL.revokeObjectURL(it.url);
      });
      return toKeep;
    });
  };

  return (
    <>
      <Title level={2} style={{ fontFamily: "Raleway", marginBottom: 20 }}>
        Add New Property
      </Title>
      <Divider style={{ borderColor: "#ccc" }} />
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          fontFamily: "Raleway",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div>
                <Form.Item
                  name="img"
                  label={<span style={labelStyle}>Drop your image(s) here</span>}
                >
                  <Input type="file" accept="image/*" multiple />
                </Form.Item>

                <Col span={24}>
                  {selectedImages.length > 0 ? (
                    <Row gutter={[24, 24]}>
                      {selectedImages.map((item, index) => {
                        return (
                          <Col span={12} key={index}>
                            <div
                              style={{
                                position: "relative",
                                borderRadius: 8,
                                overflow: "hidden",
                                width: 220,
                                height: 220,
                              }}
                            >
                              <Button
                                icon={<DeleteOutlined />}
                                type="text"
                                danger
                                shape="circle"
                                style={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  zIndex: 2,
                                  background: "white",
                                  border: "1px solid red",
                                }}
                                onClick={(e) => removeImage(e, index)}
                              />
                              <AntImage
                                src={item}
                                alt="uploaded_img"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  ) : (
                    <div style={{ padding: 20, color: "#666" }}>
                      No images selected yet.
                    </div>
                  )}
                </Col>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Row gutter={24}>
                  {/* Left column */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="address"
                      label={<span style={labelStyle}>Property Address</span>}
                      rules={[{ required: true }]}
                    >
                      <Input
                        style={inputStyle}
                        placeholder="e.g., 123 Main St"
                      />
                    </Form.Item>

                    <Form.Item
                      name="propertyType"
                      label={<span style={labelStyle}>Property Type</span>}
                      rules={[{ required: true }]}
                    >
                      <Select style={inputStyle} placeholder="Select type">
                        <Option value="house">House</Option>
                        <Option value="apartment">Apartment</Option>
                        <Option value="land">Land</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="price"
                      label={<span style={labelStyle}>Price</span>}
                      rules={[{ required: true }]}
                    >
                      <Input type="number" style={inputStyle} prefix="KSh" />
                    </Form.Item>

                    <Form.Item
                      name="bedrooms"
                      label={<span style={labelStyle}>Bedrooms</span>}
                    >
                      <Input type="number" style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="bathrooms"
                      label={<span style={labelStyle}>Bathrooms</span>}
                    >
                      <Input type="number" style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="squareFeet"
                      label={<span style={labelStyle}>Square Footage</span>}
                    >
                      <Input type="number" style={inputStyle} suffix="sqft" />
                    </Form.Item>
                  </Col>

                  {/* Right column */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="city"
                      label={<span style={labelStyle}>City</span>}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="county"
                      label={<span style={labelStyle}>County</span>}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="zip"
                      label={<span style={labelStyle}>Zip Code</span>}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="yearBuilt"
                      label={<span style={labelStyle}>Year Built</span>}
                    >
                      <Input type="number" style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="listingType"
                      label={<span style={labelStyle}>Listing Type</span>}
                    >
                      <Select style={inputStyle} placeholder="Select">
                        <Option value="sale">For Sale</Option>
                        <Option value="rent">For Rent</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="furnished"
                      label={<span style={labelStyle}>Furnished</span>}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item
                      name={"status"}
                      label={<span style={labelStyle}>Status</span>}
                    >
                      <Select style={inputStyle} placeholder="Select">
                        <Option value="available">Available</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="sold">Sold</Option>
                        <Option value="rented">Rented</Option>
                        <Option value="under_offer">Under Offer</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                {/* Full-width fields */}
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      name="description"
                      label={<span style={labelStyle}>Description</span>}
                    >
                      <TextArea rows={4} style={{ borderRadius: 8 }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="agentName"
                      label={<span style={labelStyle}>Agent Name</span>}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="agentPhone"
                      label={<span style={labelStyle}>Agent Phone</span>}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              size="large"
              style={{ borderRadius: 8 }}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default CreateProperty;
