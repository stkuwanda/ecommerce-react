import React from "react";
import "./category.styles.scss";

const CategoryPage = ({ match }) => {
  const { categoryId } = match.parameters;
  
  return <div className='category'>CATEGORY PAGE</div>;
};

export default CategoryPage;
