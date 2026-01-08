import { Button, Form, Input, Spin, Row, Col, Image as AntImage } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { DeleteOutlined, PictureOutlined } from "@ant-design/icons";
import { useNotification } from "../contexts/NotificationContext";

const labelStyle = {
  fontWeight: 600,
  fontSize: "14px",
  color: "#2c3e50",
  marginBottom: "4px",
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
      <div style={sectionStyle}>
        <PictureOutlined style={{ fontSize: "18px" }} />
        Image Upload
      </div>
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

export default ImageSection;
