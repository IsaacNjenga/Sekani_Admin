import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  Switch,
  Space,
  Tooltip,
} from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useSavedOptions from "../hooks/savedOptions";
import { counties } from "../assets/data/data";
import { useState } from "react";
import axios from "axios";
import { useNotification } from "../contexts/NotificationContext";

const { TextArea } = Input;
const { Option } = Select;

const labelStyle = {
  fontWeight: 600,
  fontSize: "14px",
  color: "#2c3e50",
  marginBottom: "4px",
  fontFamily: "Raleway",
};

const inputStyle = {
  borderRadius: 8,
  fontSize: "14px",
  height: 40,
  fontFamily: "Raleway",
};

const sectionStyle = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "24px",
  fontWeight: 600,
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

function PropertyForm({ form, handleSubmit, loading, formType }) {
  const openNotification = useNotification();
  const [isGenerating, setIsGenerating] = useState(false);
  const { savedOptions: amenities, addOptions: addAmenity } =
    useSavedOptions("amenities_list");
  const { savedOptions: paymentOptions, addOptions: addPaymentOptions } =
    useSavedOptions("payment_options_list");

  const getButtonText = () => {
    if (formType === "create") {
      return loading ? "Creating Property..." : "Create Property Listing";
    }
    return loading ? "Updating Property..." : "Update Property Listing";
  };

  const handleGenerateDescription = async (type, bathrooms, bedrooms) => {
    setIsGenerating(true);
    try {
      const existing = form.getFieldValue("description") || "";

      const response = await axios.post("generate-description", {
        type,
        bathrooms,
        bedrooms,
      });

      if (response.data.success) {
        const generatedDescription = response.data.reply;
        form.setFieldsValue({
          description: existing
            ? `${existing}\n\n${generatedDescription}`
            : generatedDescription,
        });
      }

      form.validateFields(["description"]);
    } catch (error) {
      console.error("Error generating description:", error);
      openNotification(
        "error",
        "Description Generation Failed",
        "There was an error generating the property description. Please try again or consult your developer."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          furnished: false,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div style={sectionStyle}>
              <HomeOutlined style={{ fontSize: "18px" }} />
              Basic Information
            </div>

            <Row gutter={[16, 0]}>
              <Col xs={24}>
                <Form.Item
                  name="address"
                  label={<span style={labelStyle}>Property Address</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please enter the property address",
                    },
                  ]}
                >
                  <Input
                    style={inputStyle}
                    placeholder="e.g., 123 Main Street, Nairobi"
                    prefix={<EnvironmentOutlined style={{ color: "#bbb" }} />}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="propertyType"
                  label={<span style={labelStyle}>Property Type</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please select property type",
                    },
                  ]}
                >
                  <Select
                    style={inputStyle}
                    placeholder="Select type"
                    size="large"
                  >
                    <Option value="House">🏠 House</Option>
                    <Option value="Apartment">🏢 Apartment</Option>
                    <Option value="Land">🏞️ Land</Option>
                    <Option value="Airbnb">🏨 Airbnb</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="price"
                  label={<span style={labelStyle}>Price</span>}
                  rules={[
                    { required: true, message: "Please enter the price" },
                  ]}
                >
                  <Input
                    type="number"
                    style={inputStyle}
                    prefix="KSh"
                    size="large"
                    placeholder="0"
                  />
                </Form.Item>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Item
                  name="bedrooms"
                  label={<span style={labelStyle}>Bedrooms</span>}
                >
                  <Input
                    type="number"
                    style={inputStyle}
                    placeholder="0"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Item
                  name="bathrooms"
                  label={<span style={labelStyle}>Bathrooms</span>}
                >
                  <Input
                    type="number"
                    style={inputStyle}
                    placeholder="0"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="squareFeet"
                  label={<span style={labelStyle}>Square Footage</span>}
                >
                  <Input
                    type="number"
                    style={inputStyle}
                    suffix="sqft"
                    placeholder="0"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <div style={{ ...sectionStyle, marginTop: "32px" }}>
              <EnvironmentOutlined style={{ fontSize: "18px" }} />
              Location Details
            </div>

            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="city"
                  label={<span style={labelStyle}>City</span>}
                >
                  <Input
                    style={inputStyle}
                    placeholder="e.g., Nairobi"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="county"
                  label={<span style={labelStyle}>County</span>}
                >
                  <Select
                    style={inputStyle}
                    placeholder="e.g., Nairobi"
                    size="large"
                  >
                    {counties.map((county) => (
                      <Option key={county.value} value={county.value}>
                        {county.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={12}>
                <Form.Item
                  name="zip"
                  label={<span style={labelStyle}>Zip Code</span>}
                >
                  <Input style={inputStyle} placeholder="00100" size="large" />
                </Form.Item>
              </Col>

              <Col xs={12}>
                <Form.Item
                  name="yearBuilt"
                  label={<span style={labelStyle}>Year Built</span>}
                >
                  <Input
                    type="number"
                    style={inputStyle}
                    placeholder="2020"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <div style={{ ...sectionStyle, marginTop: "32px" }}>
              <EnvironmentOutlined style={{ fontSize: "18px" }} />
              Listing Details
            </div>

            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="listingType"
                  label={<span style={labelStyle}>Listing Type</span>}
                >
                  <Select style={inputStyle} placeholder="Select" size="large">
                    <Option value="Sale">💰 For Sale</Option>
                    <Option value="Rent">🏠 For Rent</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="status"
                  label={<span style={labelStyle}>Status</span>}
                >
                  <Select style={inputStyle} placeholder="Select" size="large">
                    <Option value="Available">✅ Available</Option>
                    <Option value="Pending">⏳ Pending</Option>
                    <Option value="Sold">✔️ Sold</Option>
                    <Option value="Rented">🔑 Rented</Option>
                    <Option value="Under Offer">💼 Under Offer</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  name="furnished"
                  label={<span style={labelStyle}>Furnished</span>}
                  valuePropName="checked"
                >
                  <div
                    style={{
                      background: "#f8f9fa",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    <span style={{ color: "#6c757d", fontSize: "13px" }}>
                      Toggle if property comes furnished
                    </span>
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <div style={{ ...sectionStyle, marginTop: "32px" }}>
              <InfoCircleOutlined style={{ fontSize: "18px" }} />
              Additional Information
            </div>

            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label={
                    <Space>
                      <span style={labelStyle}>Description</span>
                      <Tooltip title="Generate description with AI">
                        <Button
                          icon={
                            isGenerating ? (
                              <LoadingOutlined />
                            ) : (
                              <RobotOutlined />
                            )
                          }
                          onClick={
                            isGenerating
                              ? null
                              : () => {
                                  const propertyType =
                                    form.getFieldValue("propertyType");
                                  const propertyBedrooms =
                                    form.getFieldValue("bedrooms");
                                  const propertyBathrooms =
                                    form.getFieldValue("bathrooms");
                                  if (!propertyType) {
                                    openNotification(
                                      "warning",
                                      "Please enter a property type before generating a description",
                                      "Missing Product Type"
                                    );
                                    return;
                                  }
                                  if (!propertyBedrooms) {
                                    openNotification(
                                      "warning",
                                      "Please enter the number of bedrooms before generating a description",
                                      "Missing Number of Bedrooms"
                                    );
                                    return;
                                  }
                                  if (!propertyBathrooms) {
                                    openNotification(
                                      "warning",
                                      "Please enter the number of bathrooms before generating a description",
                                      "Missing Number of Bathrooms"
                                    );
                                    return;
                                  }
                                  handleGenerateDescription(
                                    propertyType,
                                    propertyBathrooms,
                                    propertyBedrooms
                                  );
                                }
                          }
                          style={{
                            color: "#754ea7",
                            cursor: isGenerating ? "not-allowed" : "pointer",
                            opacity: isGenerating ? 0.5 : 1,
                          }}
                        ></Button>
                      </Tooltip>
                    </Space>
                  }
                >
                  <TextArea
                    rows={4}
                    style={{ borderRadius: 8 }}
                    placeholder="Describe the property, its features, and what makes it special..."
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="nearby"
                  label={<span style={labelStyle}>Nearby Landmarks</span>}
                  extra={
                    <span style={{ fontSize: "12px", color: "#6c757d" }}>
                      Press Enter after each item
                    </span>
                  }
                >
                  <Select
                    mode="tags"
                    placeholder="E.g., School, Hospital, Mall"
                    style={{ ...inputStyle, width: "100%" }}
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="amenities"
                  label={<span style={labelStyle}>Amenities</span>}
                  extra={
                    <span style={{ fontSize: "12px", color: "#6c757d" }}>
                      Press Enter after each item
                    </span>
                  }
                >
                  <Select
                    mode="tags"
                    placeholder="E.g., Swimming Pool, Gym, Parking"
                    style={{ ...inputStyle, width: "100%" }}
                    size="large"
                    options={amenities.map((v) => ({ label: v, value: v }))}
                    onChange={addAmenity}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="paymentOptions"
                  label={<span style={labelStyle}>Payment Options</span>}
                  extra={
                    <span style={{ fontSize: "12px", color: "#6c757d" }}>
                      Press Enter after each item
                    </span>
                  }
                >
                  <Select
                    mode="tags"
                    placeholder="E.g., Cash, M-Pesa, Bank Transfer"
                    style={{ ...inputStyle, width: "100%" }}
                    size="large"
                    options={paymentOptions.map((v) => ({
                      label: v,
                      value: v,
                    }))}
                    onChange={addPaymentOptions}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div style={{ ...sectionStyle, marginTop: "32px" }}>
              <span style={{ fontSize: "18px" }}>
                <UserOutlined />
              </span>
              Agent Information
            </div>

            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="agentName"
                  label={<span style={labelStyle}>Agent Name</span>}
                >
                  <Input
                    style={inputStyle}
                    placeholder="Full name"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="agentPhone"
                  label={<span style={labelStyle}>Agent Phone</span>}
                >
                  <Input
                    style={inputStyle}
                    placeholder="+254 700 000 000"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "32px", marginBottom: 0 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            style={{
              borderRadius: 10,
              height: "50px",
              fontSize: "16px",
              fontWeight: 600,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            }}
          >
            {getButtonText()}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PropertyForm;
