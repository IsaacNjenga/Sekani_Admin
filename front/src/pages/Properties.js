import React from "react";
import useFetchAllProperties from "../hooks/fetchAllProperties";

function Properties() {
  const { properties, propertiesLoading, propertiesRefresh, handleLoadMore } =
    useFetchAllProperties();

  return (
    <div>
      Properties
      <button onClick={handleLoadMore}>Load More</button>
      {propertiesLoading && <p>Loading...</p>}
      <button onClick={propertiesRefresh}>Refresh</button>
      <pre>{JSON.stringify(properties, null, 2)}</pre>
    </div>
  );
}

export default Properties;
