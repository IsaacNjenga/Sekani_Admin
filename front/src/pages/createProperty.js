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
} from "antd";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

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

  return (
    <Card
      title="Create New Property"
      bordered={false}
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
        <Row gutter={24}>
          {/* Left column */}
          <Col xs={24} md={12}>
            <Form.Item
              name="address"
              label={<span style={labelStyle}>Property Address</span>}
              rules={[{ required: true }]}
            >
              <Input style={inputStyle} placeholder="e.g., 123 Main St" />
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
            <Form.Item name="city" label={<span style={labelStyle}>City</span>}>
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
  );
}

export default CreateProperty;
