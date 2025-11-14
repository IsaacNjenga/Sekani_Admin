// src/components/ScheduleDetails.jsx
import React, { useState } from "react";
import { Modal, List, Typography, Divider, Descriptions, Button, Empty } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function prettyDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function ScheduleDetails({ content, openScheduleModal, setOpenScheduleModal, loading }) {
  const [selectedItem, setSelectedItem] = useState(null);

  // when content changes (new modal open), if content is single item set selectedItem accordingly
  React.useEffect(() => {
    if (!content) {
      setSelectedItem(null);
      return;
    }
    // content could be single record (has name) or { date, items }
    if (content.name) {
      setSelectedItem(content);
    } else if (content.items && content.items.length === 1) {
      setSelectedItem(content.items[0]);
    } else {
      setSelectedItem(null);
    }
  }, [content]);

  const isDateGroup = content && content.items;

  return (
    <Modal
      footer={null}
      open={openScheduleModal}
      onCancel={() => setOpenScheduleModal(false)}
      confirmLoading={loading}
      width="80%"
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: 18,
            color: "#fff",
            background: "rgba(0,0,0,0.45)",
            padding: 6,
            borderRadius: "50%",
          }}
        />
      }
      bodyStyle={{
        padding: 20,
        borderRadius: 12,
        background: "white",
      }}
      centered
    >
      {!content && <Empty description="No schedule selected" />}

      {content && isDateGroup && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div>
              <Title level={4} style={{ margin: 0 }}>
                Schedules for {prettyDate(content.date)}
              </Title>
              <Text type="secondary">{content.items.length} booking(s)</Text>
            </div>
            <div>
              <Button onClick={() => setOpenScheduleModal(false)}>Close</Button>
            </div>
          </div>

          <Divider />

          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <List
                itemLayout="horizontal"
                dataSource={content.items}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button size="small" onClick={() => setSelectedItem(item)}>
                        View
                      </Button>,
                    ]}
                    style={{ padding: 12, borderRadius: 8, marginBottom: 8, background: "#fafafa" }}
                    key={item._id || `${item.email}-${item.time}`}
                  >
                    <List.Item.Meta
                      title={
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <Text strong>{item.name}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                        </div>
                      }
                      description={
                        <>
                          <div style={{ fontSize: 13 }}>{item.email} • {item.phone}</div>
                          <div style={{ marginTop: 6, color: "#666" }}>{item.notes}</div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>

            <div style={{ width: 380, minWidth: 280 }}>
              {selectedItem ? (
                <>
                  <Title level={5} style={{ marginTop: 0 }}>{selectedItem.name}</Title>
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="Date & Time">{selectedItem.date} • {selectedItem.time}</Descriptions.Item>
                    <Descriptions.Item label="Attendees">{selectedItem.numberOfPeople}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{selectedItem.phone}</Descriptions.Item>
                    <Descriptions.Item label="Email">{selectedItem.email}</Descriptions.Item>
                    <Descriptions.Item label="Notes">{selectedItem.notes || "—"}</Descriptions.Item>
                    <Descriptions.Item label="Property ID">{selectedItem.propertyId}</Descriptions.Item>
                  </Descriptions>
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <Button type="primary">Confirm</Button>
                    <Button danger>Cancel</Button>
                  </div>
                </>
              ) : (
                <div style={{ padding: 12 }}>
                  <Title level={5} style={{ marginTop: 0 }}>Select a booking</Title>
                  <Paragraph type="secondary">Click any booking on the left to see details and quick actions</Paragraph>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* When modal opened for a single booking (from table "View" or direct click) */}
      {content && !isDateGroup && content.name && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title level={4} style={{ margin: 0 }}>{content.name}</Title>
            <Text type="secondary">{content.date} • {content.time}</Text>
          </div>
          <Divider />
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Name">{content.name}</Descriptions.Item>
            <Descriptions.Item label="Date & Time">{content.date} • {content.time}</Descriptions.Item>
            <Descriptions.Item label="Attendees">{content.numberOfPeople}</Descriptions.Item>
            <Descriptions.Item label="Phone">{content.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{content.email}</Descriptions.Item>
            <Descriptions.Item label="Notes">{content.notes || "—"}</Descriptions.Item>
            <Descriptions.Item label="Property ID">{content.propertyId}</Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Button type="primary">Confirm</Button>
            <Button danger>Cancel</Button>
            <Button onClick={() => setOpenScheduleModal(false)}>Close</Button>
          </div>
        </>
      )}
    </Modal>
  );
}

export default ScheduleDetails;
