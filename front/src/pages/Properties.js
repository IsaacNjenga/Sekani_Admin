import { useState } from "react";
import useFetchAllProperties from "../hooks/fetchAllProperties";
import { Row, Col, Button, Skeleton, Tooltip, Input } from "antd";
import { PlusCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import ViewProperty from "../components/ViewProperty";
import PropertyCard from "../components/PropertyCard";
import ReviewModal from "../components/ReviewModal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

function Properties() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [openPropertyModal, setOpenPropertyModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { properties, propertiesLoading, propertiesRefresh, handleLoadMore } =
    useFetchAllProperties();

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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setSearchTerm(value);
    if (!value) return;

    const filteredSearchData = properties.filter((item) => {
      const values = Object.values(item);
      return values.some(
        (val) => typeof val === "string" && val.toLowerCase().includes(value)
      );
    });

    setFilteredData(filteredSearchData);
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
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0 10px",
        }}
      >
        <div>
          <Search
            placeholder="Search properties..."
            size="large"
            loading={loading}
            enterButton
            onChange={handleSearch}
            allowClear
            style={{ width: 500, height: 50 }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Tooltip title="Add Property">
            <Button
              onClick={() => navigate("/create-property")}
              type="primary"
              style={{ background: "green" }}
              icon={<PlusCircleOutlined />}
            >
              Add Property
            </Button>
          </Tooltip>
          <Tooltip title="Refresh">
            <Button
              onClick={propertiesRefresh}
              type="primary"
              icon={<ReloadOutlined />}
            >
              Refresh
            </Button>
          </Tooltip>
        </div>
      </div>
      <div style={{ marginTop: 20, padding: "0 10px" }}>
        <PropertyCard
          dataSource={searchTerm ? filteredData : properties}
          viewProperty={viewProperty}
          viewReviews={viewReviews}
          propertiesRefresh={propertiesRefresh}
          source={"properties"}
        />
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
