import { useState } from "react";
import useFetchAllProperties from "../hooks/fetchAllProperties";
import { Row, Col, Button, Skeleton, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import ViewProperty from "../components/ViewProperty";
import PropertyCard from "../components/PropertyCard";

function Properties() {
  const { properties, propertiesLoading, propertiesRefresh, handleLoadMore } =
    useFetchAllProperties();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  const viewProperty = (property) => {
    setLoading(true);
    setContent(property);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  if (propertiesLoading) {
    return (
      <Row gutter={[32, 32]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Col key={i} xs={24} sm={12} md={8}>
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip title="Refresh">
          <Button
            onClick={propertiesRefresh}
            type="primary"
            icon={<ReloadOutlined />}
          />
        </Tooltip>
      </div>
      <div style={{ marginTop: 20 }}>
        <Row gutter={[32, 32]}>
          {properties.map((c) => (
            <Col key={c.key} xs={24} sm={12} md={8}>
              <PropertyCard
                c={c}
                viewProperty={viewProperty}
                propertiesRefresh={propertiesRefresh}
                source={"properties"}
              />
            </Col>
          ))}
        </Row>
      </div>
      <div style={{ marginTop: 20, marginBottom: 50, textAlign: "center" }}>
        <Button
          onClick={handleLoadMore}
          type="primary"
          size="large"
          style={{ fontFamily: "Raleway" }}
        >
          Load More
        </Button>
      </div>

      <ViewProperty
        setOpenModal={setOpenModal}
        openModal={openModal}
        loading={loading}
        content={content}
      />
    </>
  );
}

export default Properties;
