import React, {Fragment, useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {CategoryEditModal} from "./CategoryEditModal";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

export const CategoryTable = ({categories, getCategories, deleteCategory}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectedCategoryEdited = () => {
    setSelectedCategory(null);
    getCategories();
  };

  return (<>
    {categories ? <Fragment>
      <table className="data-table">
        <thead>
        <tr>
          <th scope="column">Name</th>
          <th scope="column">Description</th>
          <th scope="column">Address needed</th>
          <th scope="column"></th>
        </tr>
        </thead>
        <tbody>
        {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.needsAddress ? "✅" : "❌"}</td>

              <Button onClick={() => setSelectedCategory(category)}> <EditIcon/></Button>
              <Button onClick={() => deleteCategory(category)}> <DeleteIcon/></Button>
            </tr>

        ))}
        </tbody>
      </table>
      {selectedCategory && (
          <CategoryEditModal category={selectedCategory} selectedCategoryEdited={selectedCategoryEdited}/>
      )}
    </Fragment> : <LoadingSpinner/>}
  </>);
};
