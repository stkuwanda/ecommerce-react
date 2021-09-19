import React from "react";
import "./collection.styles.scss";

const CollectionPage = ({ match }) => {
  const { collectionId } = match.params;

  return <div className='collection'>COLLECTION PAGE</div>;
};

export default CollectionPage;