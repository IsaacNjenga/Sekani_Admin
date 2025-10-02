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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProperty from "../hooks/fetchProperty";
import Swal from "sweetalert2";

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

function UpdateProperty() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const { propertyData, propertyDataLoading, fetchProperty } =
    useFetchProperty();

  useEffect(() => {
    const fetchAndSet = async () => {
      await fetchProperty(id);
      if (propertyData) {
        form.setFieldsValue({
          ...propertyData,
          agentName: propertyData.agent?.name,
          agentPhone: propertyData.agent?.phone,
        });
      }
    };
    fetchAndSet();
  }, [id, form]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const allValues = await form.validateFields();
      const values = {
        ...allValues,
        agent: { name: allValues.agentName, phone: allValues.agentPhone },
        img: selectedImages,
      };
      console.log(values);

      // const res = await axios.put(`update-property?id=${id}`, values, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // if (res.data.success) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "Property Added Successfully!",
      //   });
      // }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
      //form.resetFields();
      //setSelectedImages([]);
    }
  };

  if (propertyDataLoading)
    return <Spin fullscreen tip="Loading..." size="large" />;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ fontFamily: "Raleway", marginBottom: 20 }}>
          Update Property
        </Title>

        <Button danger type="primary" onClick={() => navigate("/properties")}>
          Back
        </Button>
      </div>
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
              Images coming soon
              {/* <ImageSection
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              /> */}
            </Col>

            {/* Other inputs */}
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
                        <Option value="House">House</Option>
                        <Option value="Apartment">Apartment</Option>
                        <Option value="Land">Land</Option>
                        <Option value="Airbnb">Airbnb</Option>
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
                        <Option value="Sale">For Sale</Option>
                        <Option value="Rent">For Rent</Option>
                      </Select>
                    </Form.Item>
                    <Row gutter={[24, 24]}>
                      <Col span={12}>
                        <Form.Item
                          name={"status"}
                          label={<span style={labelStyle}>Status</span>}
                        >
                          <Select style={inputStyle} placeholder="Select">
                            <Option value="Available">Available</Option>
                            <Option value="Pending">Pending</Option>
                            <Option value="Sold">Sold</Option>
                            <Option value="Rented">Rented</Option>
                            <Option value="Under Offer">Under Offer</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="furnished"
                          label={<span style={labelStyle}>Furnished</span>}
                          valuePropName="checked"
                        >
                          <Switch
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
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
                  <Col span={24}>
                    <Form.Item
                      name="nearby"
                      label={<span style={labelStyle}>Nearby Landmarks</span>}
                      extra="Separate each entry with the 'Enter' Button"
                    >
                      <Select
                        mode="tags"
                        placeholder="E.g. School, Hospital"
                        style={{ ...inputStyle, width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="amenities"
                      label={<span style={labelStyle}>Amenities</span>}
                      extra="Separate each entry with the 'Enter' Button"
                    >
                      <Select
                        mode="tags"
                        placeholder="E.g. Swimming Pool, Gym"
                        style={{ ...inputStyle, width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="paymentOptions"
                      label={<span style={labelStyle}>Payment Options</span>}
                      extra="Separate each entry with the 'Enter' Button"
                    >
                      <Select
                        mode="tags"
                        placeholder="E.g. Cash, Credit Card, Check"
                        style={{ ...inputStyle, width: "100%" }}
                      />
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

export default UpdateProperty;
