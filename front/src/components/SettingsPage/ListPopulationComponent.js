import axios from "../../utils/axios";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import React, { useEffect, useState } from "react";

export default function ListPopulationComponent() {
  const [category, setCategory] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState([""]);

  const [area, setArea] = useState([]);

  return (
    <>
      {/*for creating category list*/}
      <CustomInput
        labelId="Category name"
        name="category"
        modifier="secondary"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />
      <CustomInput
        labelId="Category description"
        name="description"
        modifier="secondary"
        value={categoryDescription}
        onChange={(event) => setCategoryDescription(event.target.value)}
      />
      <CustomButton
        titleId="create a category"
        modifier="secondary"
        onClick={() => {
          axios.post("/api/categories/", {
            name: category,
            description: categoryDescription,
          });
        }}
      />

      {/*for creating area list*/}

      <CustomInput
        labelId="Area name"
        name="area"
        modifier="secondary"
        value={area}
        onChange={(event) => setArea(event.target.value)}
      />

      <CustomButton
        titleId="create an area"
        modifier="secondary"
        onClick={() => {
          axios.post("/api/areas/", {
            name: area,
          });
        }}
      />
    </>
  );
}
