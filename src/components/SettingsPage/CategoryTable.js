import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { CategoryEditModal } from "./CategoryEditModal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";

const useStyles = makeStyles({
  container: {
    padding: "8 0 8 0",
    elevation: 0,
  },
  table: {
    minWidth: "100%",
  },
});

export const CategoryTable = ({
  categories,
  getCategories,
  deleteCategory,
}) => {
  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectedCategoryEdited = () => {
    setSelectedCategory(null);
    getCategories();
  };

  return (
    <>
      {categories ? (
        <>
          <TableContainer component={Paper} class={classes.container}>
            <Table class={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Address needed</TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell align="center">
                      {category.needsAddress ? <CheckIcon /> : <ClearIcon />}
                    </TableCell>
                    <TableCell align="right">
                      <ButtonGroup>
                        <Button onClick={() => setSelectedCategory(category)}>
                          <EditIcon />
                        </Button>
                        <Button onClick={() => deleteCategory(category)}>
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedCategory && (
            <CategoryEditModal
              category={selectedCategory}
              selectedCategoryEdited={selectedCategoryEdited}
            />
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
