import axios from "../../utils/axios";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import React, { useState } from "react";

export default function ListPopulationComponent() {
  const [category, setCategory] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [needsAddress, setNeedsAddress] = useState(false);

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
      <CustomInput
        labelId="Needs address"
        name="needsAddress"
        modifier="secondary"
        layout="checkbox"
        checked={needsAddress}
        onChange={() => setNeedsAddress(!needsAddress)}
      />

      <CustomButton
        titleId="create a category"
        modifier="secondary"
        onClick={() => {
          axios
            .post("/api/categories/", {
              name: category,
              description: categoryDescription,
              needsAddress: needsAddress,
            })
            .then(() => alert(`category ${category} created`));
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
          axios
            .post("/api/areas/", {
              name: area,
            })
            .then(() => alert(`area ${area} created`));
        }}
      />
    </>
  );
}
