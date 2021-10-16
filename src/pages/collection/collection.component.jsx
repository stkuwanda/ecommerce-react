import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import "./collection.styles.scss";
import CustomButton from "../../components/custom-button/custom-button.component";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionPage = ({ match: { params } }) => {
  const collection = useSelector(selectCollection(params.collectionId));
  const dispatch = useDispatch();

  if (process.env.NODE_ENV === "development") {
    console.log(
      "line 10, collection.component.jsx, CollectionPage, collection prop:",
      collection
    );
  }

  return !collection ? (
    <div
      style={{
        height: "60vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomButton onClick={() => dispatch(fetchCollectionsStart())}>
        Retry
      </CustomButton>
    </div>
  ) : (
    <div className='collection-page'>
      <h1 className='title'>{collection.title}</h1>
      <div className='items'>
        {collection.items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
