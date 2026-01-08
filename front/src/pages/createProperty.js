import { Card, Col, Form, Row, Spin, Typography } from "antd";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import ImageSection from "../components/ImageUpload.js";
import VideoSection from "../components/VideoUpload.js";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import PropertyForm from "../components/PropertyForm.js";

const { Title } = Typography;

function CreateProperty() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleSubmit = async () => {
    if (selectedImages.length === 0)
      return openNotification(
        "warning",
        "Please upload at least one image for your property",
        "No images uploaded"
      );
    setLoading(true);
    try {
      const allValues = await form.validateFields();
      const values = {
        ...allValues,
        createdBy: user?._id,
        agent: { name: allValues.agentName, phone: allValues.agentPhone },
        img: selectedImages,
        vid: selectedVideos,
      };
      //console.log(values);

      const res = await axios.post("create-property", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        openNotification(
          "success",
          "A property has been added successfully",
          "Success!"
        );
        setTimeout(() => navigate("/properties"), 1200);
      }
    } catch (error) {
      console.error(error);
      openNotification(
        "warning",
        "An unexpected error occurred. Please try again later or call for assistance.",
        "Something went wrong..."
      );
    } finally {
      setLoading(false);
      form.resetFields();
      setSelectedImages([]);
      setSelectedVideos([]);
    }
  };

  if (loading)
    return <Spin fullscreen tip="Creating Property..." size="large" />;

  return (
    <div style={{ padding: "24px", background: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "left", marginBottom: "32px" }}>
          <Title
            level={2}
            style={{
              fontFamily: "Raleway",
              color: "#2c3e50",
              marginBottom: "8px",
              fontSize: "32px",
            }}
          >
            Add New Property Listing
          </Title>
          <p style={{ color: "#6c757d", fontSize: "16px" }}>
            Fill in the details below to create your property listing
          </p>
        </div>

        <Card
          style={{
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            fontFamily: "Raleway",
            border: "none",
          }}
        >
          <Row gutter={[32, 32]}>
            <Col lg={10}>
              <ImageSection
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                openNotification={openNotification}
              />

              <VideoSection
                selectedVideos={selectedVideos}
                setSelectedVideos={setSelectedVideos}
                openNotification={openNotification}
              />
            </Col>

            <Col lg={14}>
              <PropertyForm
                form={form}
                handleSubmit={handleSubmit}
                loading={loading}
                formType="create"
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default CreateProperty;
