import { useState } from "react";
import useFetchAllProperties from "../hooks/fetchAllProperties";
import { Row, Col, Button, Skeleton, Tooltip } from "antd";
import { PlusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import ViewProperty from "../components/ViewProperty";
import PropertyCard from "../components/PropertyCard";
import ReviewModal from "../components/ReviewModal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Properties() {
  const { properties, propertiesLoading, propertiesRefresh, handleLoadMore } =
    useFetchAllProperties();
  const { token } = useAuth();
  const [openPropertyModal, setOpenPropertyModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  const viewProperty = (property) => {
    setLoading(true);
    setContent(property);
    setOpenPropertyModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  const viewReviews = (property) => {
    setLoading(true);
    setContent(property);
    setOpenReviewModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  if (propertiesLoading) {
    return (
      <Row gutter={[32, 32]}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Col key={i} xs={24} sm={12} md={8}>
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 15 }}>
        <Tooltip title="Add Property">
          <Button
            onClick={()=>navigate("/create-property")}
            type="primary"
            style={{ background: "green" }}
            icon={<PlusCircleOutlined />}
          />
        </Tooltip>
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
                viewReviews={viewReviews}
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
        setOpenModal={setOpenPropertyModal}
        openModal={openPropertyModal}
        loading={loading}
        content={content}
        token={token}
      />

      <ReviewModal
        setOpenModal={setOpenReviewModal}
        openModal={openReviewModal}
        loading={loading}
        content={content}
      />
    </>
  );
}

export default Properties;
