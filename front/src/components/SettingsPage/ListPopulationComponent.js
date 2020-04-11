import axios from "../../utils/axios";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import React, {useEffect, useState} from "react";
import {CategoryTable} from "./CategoryTable";
import {AreaTable} from "./AreaTable";
import Grid from "@material-ui/core/Grid";

export default function ListPopulationComponent() {
  const [category, setCategory] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState();
  const [needsAddress, setNeedsAddress] = useState(false);

  const [area, setArea] = useState([]);
  const [areas, setAreas] = useState();


  const getAreas = async () => {
    const {data = {}} = await axios.get("/api/areas");
    setAreas(data.areas || []);
  };

  const getCategories = async () => {
    const {data = {}} = await axios.get("/api/categories");
    setCategories(data.categories || []);
  };

  useEffect(() => {
    getAreas();
    getCategories();
  }, []);


  const createCategory = () => {
    axios
      .post("/api/categories/", {
        name: category,
        description: categoryDescription,
        needsAddress: needsAddress,
      })
      .then(() => getCategories());
  };

  const createArea = () => {
    axios
      .post("/api/areas/", {
        name: area,
      })
      .then(() => getAreas());
  };

  const deleteArea = (area) => {
    axios
      .delete(`/api/areas/${area._id}`)
      .then(() => getAreas());
  };

  const deleteCategory = (category) => {
    axios
      .delete(`/api/categories/${category._id}`)
      .then(() => getCategories());
  };

  return (
    <Grid container direction='row' spacing={0} justify='space-between'>
      {/*for creating category list*/}
      <Grid item xs={12} sm={6}>
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
            createCategory()
          }}
        />

        <CategoryTable categories={categories} getCategories={() => getCategories()}
                       deleteCategory={(category) => deleteCategory(category)}/>
      </Grid>

      {/*for creating area list*/}
      <Grid item xs={12} sm={5}>
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
            createArea()
          }}
        />

        <AreaTable areas={areas} getAreas={() => getAreas()} deleteArea={(area) => deleteArea(area)}/>
      </Grid>
    </Grid>
  );
}
