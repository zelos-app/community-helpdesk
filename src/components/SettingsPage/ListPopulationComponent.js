import axios from "../../utils/axios";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import React, { useEffect, useState } from "react";
import { CategoryTable } from "./CategoryTable";
import { AreaTable } from "./AreaTable";
import Grid from "@material-ui/core/Grid";
import {SettingNavigation} from './SettingNavigation';
import Users from "../../routes/Dashboard/Users";
import {  useParams } from "react-router-dom";

export default function ListPopulationComponent() {
  const { slug= "category" } = useParams();
  const [category, setCategory] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState();
  const [needsAddress, setNeedsAddress] = useState(false);

  const [area, setArea] = useState([]);
  const [areas, setAreas] = useState();

  const getAreas = async () => {
    const { data = {} } = await axios.get("/api/areas");
    setAreas(data.areas || []);
  };

  const getCategories = async () => {
    const { data = {} } = await axios.get("/api/categories");
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
      .then(() => {
        resetCategory();
        getCategories();
      });
  };

  const resetCategory = () => {
    setCategory("");
    setCategoryDescription("");
    setNeedsAddress(false);
  };

  const createArea = () => {
    axios
      .post("/api/areas/", {
        name: area,
      })
      .then(() => {
        resetArea();
        getAreas();
      });
  };

  const resetArea = () => {
    setArea("");
  };

  const deleteArea = (area) => {
    axios.delete(`/api/areas/${area._id}`).then(() => getAreas());
  };

  const deleteCategory = (category) => {
    axios.delete(`/api/categories/${category._id}`).then(() => getCategories());
  };

  return (
    <>
    <SettingNavigation/>
    <Grid container direction="row" spacing={0} justify="space-between">
      
      {/*for creating category list*/}
      {slug === 'category' &&
      <Grid item xs={12}>
        <CustomInput
          labelId="categoryName"
          name="category"
          modifier="secondary"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <CustomInput
          labelId="categorDescription"
          name="description"
          modifier="secondary"
          value={categoryDescription}
          onChange={(event) => setCategoryDescription(event.target.value)}
        />
        <CustomInput
          labelId="needsAddress"
          name="needsAddress"
          modifier="secondary"
          layout="checkbox"
          checked={needsAddress}
          onChange={() => setNeedsAddress(!needsAddress)}
        />

        <CustomButton
          titleId="createCategory"
          modifier="secondary"
          onClick={() => {
            createCategory();
          }}
        />

        <CategoryTable
          categories={categories}
          getCategories={() => getCategories()}
          deleteCategory={(category) => deleteCategory(category)}
        />
      </Grid>
      }
      {/*for creating area list*/}
      {slug === 'area' &&
      <Grid item xs={12} >
        <CustomInput
          labelId="areaName"
          name="area"
          modifier="secondary"
          value={area}
          onChange={(event) => setArea(event.target.value)}
        />

        <CustomButton
          titleId="createArea"
          modifier="secondary"
          onClick={() => {
            createArea();
          }}
        />

        <AreaTable
          areas={areas}
          getAreas={() => getAreas()}
          deleteArea={(area) => deleteArea(area)}
        />
      </Grid>
      }
      {slug === 'users' && 
      <Users/>
    }
    </Grid>
    </>
  );
}
