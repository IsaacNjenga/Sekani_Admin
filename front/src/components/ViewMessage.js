import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Typography,
  Button,
} from "antd";
import { format, formatDistanceToNowStrict } from "date-fns";
import React, { useState } from "react";

const { Title, Text, Paragraph } = Typography;

function ViewMessage({ setOpenModal, openModal, loading, content }) {
  const [form] = Form.useForm();
  const [sendLoading, setSendLoading] = useState(false);

  const handleSubmit = async () => {
    setSendLoading(true);
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      form.resetFields();
      setSendLoading(false);
    }
  };

  return (
    <Modal
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width="80%"
      style={{
        top: 20,
        padding: "30px 32px",
        background: "#f9fafb00",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
      footer={null}
    >
      <Row gutter={[24, 24]}>
        {/* Left: Message Details */}
        <Col xs={24} md={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Message Details
              </Title>
            }
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              background: "#fff",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginBottom: 12 }}>
                <Text strong style={{ display: "block" }}>
                  From:
                </Text>
                <Text>{content?.full_name || "N/A"}</Text>
              </div>

              <div style={{ marginBottom: 12 }}>
                <Text strong style={{ display: "block" }}>
                  Email Address:
                </Text>
                <a href={`mailto:${content?.email_address}`}>
                  {content?.email_address}
                </a>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text type="secondary">
                {content?.createdAt
                  ? `Received ${formatDistanceToNowStrict(
                      new Date(content?.createdAt)
                    )} ago`
                  : format(new Date(content.createdAt), "Pp")}
              </Text>
            </div>

            <Divider style={{ borderColor: "#ccc" }} />

            <div>
              <Text strong style={{ display: "block", marginBottom: 8 }}>
                Message:
              </Text>
              <Paragraph
                style={{
                  background: "#f5f5f5",
                  padding: "12px 16px",
                  borderRadius: 8,
                  minHeight: 120,
                }}
              >
                {content?.message || "No message content"}
              </Paragraph>
            </div>
          </Card>
        </Col>

        {/* Right: Reply Section */}
        <Col xs={24} md={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Reply to {content?.full_name || "Sender"}
              </Title>
            }
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              background: "#fff",
              height: "100%",
            }}
          >
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
              <Form.Item
                label="Your Reply"
                name="reply"
                rules={[{ required: true, message: "Please write a reply" }]}
              >
                <Input.TextArea
                  rows={10}
                  placeholder="Type your reply here..."
                  style={{
                    borderRadius: 8,
                    resize: "none",
                  }}
                />
              </Form.Item>

              <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ borderRadius: 8 }}
                  loading={sendLoading}
                  htmlType="submit"
                >
                  {sendLoading ? "Sending Reply..." : "Send Reply"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
}

export default ViewMessage;
