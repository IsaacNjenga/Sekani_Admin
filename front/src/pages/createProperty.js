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

const cloudName = process.env.REACT_APP_CLOUD_NAME;
const presetKey = process.env.REACT_APP_PRESET_KEY;

const ImageSection = ({ setSelectedImages, selectedImages }) => {
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
    const files = Array.from(e.target.files); // Get all selected files

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
          // For each uploaded image, update the arrays setImageUploading(true);

          newImageUrls.push(res.data.secure_url);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Failed to upload image",
            text: "There was an unexpected error. Please try again",
            confirmButtonText: "OK",
          });
        });
    });

    // After all uploads are done, update the state
    Promise.all(uploadPromises)
      .then(async () => {
        setImageUploading(false);
        Swal.fire({ icon: "success", title: "Image set successfully" });

        setSelectedImages((prevImages) => [...prevImages, ...newImageUrls]);
        //console.log(imagePublicIds[0]);
      })
      .catch((error) => {
        setImageUploading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Failed to upload your picture",
          text: "There was an unexpected error. Please try again",
          confirmButtonText: "OK",
        });
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
        name="img"
        label={<span style={labelStyle}>Drop your image(s) here</span>}
      >
        <Input
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

function CreateProperty() {
  const { user, token } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const allValues = await form.validateFields();
      const values = {
        ...allValues,
        createdBy: user?._id,
        agent: { name: allValues.agentName, phone: allValues.agentPhone },
        img: selectedImages,
      };
      //console.log(values);

      const res = await axios.post("create-property", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Property Added Successfully!",
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
      setSelectedImages([]);
    }
  };

  if (loading)
    return <Spin fullscreen tip="Creating Property..." size="large" />;

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
          initialValues={{
            furnished: false, // 👈 ensures the field exists from the start
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <ImageSection
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
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

export default CreateProperty;
