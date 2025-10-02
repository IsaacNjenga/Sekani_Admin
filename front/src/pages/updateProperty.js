import { Button } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  return (
    <div>
      updateProperty
      <div>
        <Button onClick={() => navigate("/properties")}>Back</Button>
      </div>
    </div>
  );
}

export default UpdateProperty;
