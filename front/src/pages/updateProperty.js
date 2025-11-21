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
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProperty from "../hooks/fetchProperty";
import Swal from "sweetalert2";
import {
  DeleteOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

const { Title } = Typography;
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
const cloudName = process.env.REACT_APP_CLOUD_NAME;
const presetKey = process.env.REACT_APP_PRESET_KEY;

const ImageSection = ({ setSelectedImages, selectedImages }) => {
  const openNotification = useNotification();
  const [imageUploading, setImageUploading] = useState(false);
  const handleImageUpload = (e) => {
    Swal.fire({
      title: "Uploading your image...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setImageUploading(true);
    const files = Array.from(e.target.files);

    const maxSize = 10 * 1024 * 1024;

    // Check each file size
    for (let file of files) {
      if (file.size > maxSize) {
        setImageUploading(false);
        return Swal.fire({
          icon: "error",
          title: "File exceeds limit!",
          text: "Please select a file less than 10MB",
          confirmButtonText: "OK",
        });
      }
    }

    const cloud_name = cloudName;
    const preset_key = presetKey;

    let newImageUrls = [];

    const uploadPromises = files.map((file) => {
      const formImageData = new FormData();
      formImageData.append("file", file);
      formImageData.append("upload_preset", preset_key);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formImageData,
          { withCredentials: false }
        )
        .then((res) => {
          newImageUrls.push(res.data.secure_url);
        })
        .catch((error) => {
          console.log(error);
          openNotification(
            "error",
            "There was an unexpected error. Please try again",
            "Upload Failed!"
          );
        });
    });

    // After all uploads are done, update the state
    Promise.all(uploadPromises)
      .then(async () => {
        setImageUploading(false);
        Swal.fire({ icon: "success", title: "Image set successfully" });

        setSelectedImages((prevImages) => [...prevImages, ...newImageUrls]);
      })
      .catch((error) => {
        setImageUploading(false);
        console.error(error);
        openNotification(
          "error",
          "There was an unexpected error. Please try again",
          "Upload Failed!"
        );
      });
    //e.target.value = ""; // clear input
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Form.Item
        //name="img"
        label={<span style={labelStyle}>Drop your image(s) here</span>}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </Form.Item>

      <Col span={24}>
        {imageUploading && (
          <div style={{ margin: "auto", textAlign: "center" }}>
            <Spin />
          </div>
        )}
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
                        objectFit: "cover",
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
  );
};

const VideoSection = ({ selectedVideos, setSelectedVideos }) => {
  const openNotification = useNotification();
  const [videoUploading, setVideoUploading] = useState(false);

  const handleVideoUpload = async (e) => {
    Swal.fire({
      title: "Uploading your video...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setVideoUploading(true);
    const files = Array.from(e.target.files);

    const cloud_name = cloudName;
    const preset_key = presetKey;

    let newVideoUrls = [];

    const uploadPromises = files.map((file) => {
      const formVideoData = new FormData();
      formVideoData.append("file", file);
      formVideoData.append("upload_preset", preset_key);
      formVideoData.append("resource_type", "video");

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
          formVideoData,
          { withCredentials: false }
        )
        .then((res) => {
          newVideoUrls.push(res.data.secure_url);
        })
        .catch((error) => {
          console.log(error);
          openNotification(
            "error",
            "There was an unexpected error. Please try again",
            "Upload Failed!"
          );
        });
    });

    // After all uploads are done, update the state
    Promise.all(uploadPromises)
      .then(async () => {
        setVideoUploading(false);
        Swal.fire({ icon: "success", title: "Videos set successfully" });

        setSelectedVideos((prevVideos) => [...prevVideos, ...newVideoUrls]);
      })
      .catch((error) => {
        setVideoUploading(false);
        console.error(error);
        openNotification(
          "error",
          "There was an unexpected error. Please try again",
          "Upload Failed!"
        );
      });
  };

  const removeVideo = (e, index) => {
    e.preventDefault();
    setSelectedVideos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Form.Item
        //name="vid"
        label={<span style={labelStyle}>Drop your video(s) here</span>}
        valuePropName="fileList"
        getValueFromEvent={() => null}
      >
        <input
          type="file"
          accept="video/*" // ? mp4
          multiple
          onChange={handleVideoUpload}
        />
      </Form.Item>

      <Col span={24}>
        {videoUploading && (
          <div style={{ margin: "auto", textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {selectedVideos.length > 0 ? (
          <Row gutter={[24, 24]}>
            {selectedVideos.map((item, index) => {
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
                      onClick={(e) => removeVideo(e, index)}
                    />
                    <video height="200" width="200" autoPlay>
                      <source
                        src={item}
                        type="video/mp4"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </video>
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div style={{ padding: 20, color: "#666" }}>
            No videos selected yet.
          </div>
        )}
      </Col>
    </div>
  );
};

function UpdateProperty() {
  const { id } = useParams();
  const { token } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const { propertyData, propertyDataLoading, fetchProperty } =
    useFetchProperty();

  useEffect(() => {
    fetchProperty(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (propertyData) {
      const propertyValues = propertyData[0] ? propertyData[0] : {};
      //console.log(propertyValues);
      form.setFieldsValue({
        ...propertyValues,
        agentName: propertyValues?.agent?.name,
        agentPhone: propertyValues?.agent?.phone,
      });
      setSelectedImages(propertyValues?.img || []);
      setSelectedVideos(propertyValues?.vid || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyData, form]);

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
        agent: { name: allValues.agentName, phone: allValues.agentPhone },
        img: selectedImages,
        vid: selectedVideos,
      };

      const res = await axios.put(`update-property?id=${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        openNotification(
          "success",
          "Property has been updated successfully",
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
    }
  };

  if (propertyDataLoading)
    return <Spin fullscreen tip="Loading..." size="large" />;

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
            Update Property Listing
          </Title>
          <p style={{ color: "#6c757d", fontSize: "16px" }}>
            Fill in the details below to update your property listing
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
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Row gutter={[32, 24]}>
              <Col xs={24} lg={12}>
                <div style={sectionStyle}>
                  <PictureOutlined style={{ fontSize: "18px" }} />
                  Media Assets
                </div>
                <ImageSection
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                />
                <VideoSection
                  selectedVideos={selectedVideos}
                  setSelectedVideos={setSelectedVideos}
                />
              </Col>

              <Col xs={24} lg={12}>
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
                        prefix={
                          <EnvironmentOutlined style={{ color: "#bbb" }} />
                        }
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
                      <Input
                        style={inputStyle}
                        placeholder="e.g., Nairobi County"
                        size="large"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={12}>
                    <Form.Item
                      name="zip"
                      label={<span style={labelStyle}>Zip Code</span>}
                    >
                      <Input
                        style={inputStyle}
                        placeholder="00100"
                        size="large"
                      />
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
                      <Select
                        style={inputStyle}
                        placeholder="Select"
                        size="large"
                      >
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
                      <Select
                        style={inputStyle}
                        placeholder="Select"
                        size="large"
                      >
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
                      label={<span style={labelStyle}>Description</span>}
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
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                }}
              >
                {loading ? "Updating..." : "Update Property Listing"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default UpdateProperty;
