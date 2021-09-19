import React from "react";
import "./category.styles.scss";

const CategoryPage = ({ match }) => {
  const { categoryId } = match.params;

  return <div className='category'>CATEGORY PAGE</div>;
};

export default CategoryPage;
