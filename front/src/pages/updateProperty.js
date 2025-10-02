import { Button, Form, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProperty from "../hooks/fetchProperty";

function UpdateProperty() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const { propertyData, propertyDataLoading, fetchProperty } =
    useFetchProperty();

  useEffect(() => {
    const fetchingProperty = async () => {
      await fetchProperty(id);
    };
    fetchingProperty();
  }, [id]);

  useEffect(() => {
    if (propertyData) {
      setValues({
        address: propertyData.address,
        city: propertyData.city,
        county: propertyData.county,
        zip: propertyData.zip,
        price: propertyData.price,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        squareFeet: propertyData.squareFeet,
        yearBuilt: propertyData.yearBuilt,
        propertyType: propertyData.propertyType,
        listingType: propertyData.listingType,
        furnished: propertyData.furnished,
        paymentOptions: propertyData.paymentOptions,
        description: propertyData.description,
        amenities: propertyData.amenities,
        nearby: propertyData.nearby,
        status: propertyData.status,
      });
    }
  }, [propertyData]);

  if (propertyDataLoading)
    return <Spin fullscreen tip="Loading..." size="large" />;

  return (
    <div>
      <div>
        <Button onClick={() => navigate("/properties")}>Back</Button>
      </div>
    </div>
  );
}

export default UpdateProperty;
