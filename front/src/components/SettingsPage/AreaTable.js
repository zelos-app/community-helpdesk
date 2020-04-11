import React, {Fragment, useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {AreaEditModal} from "./AreaEditModal";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";

export const AreaTable = ({areas, getAreas, deleteArea}) => {
  const [selectedArea, setSelectedArea] = useState(null);

  const selectedAreaEdited = () => {
    setSelectedArea(null);
    getAreas();
  };

  return (<>
    {areas ? <Fragment>
      <table className="data-table">
        <thead>
        <tr>
          <th scope="column">Name</th>
          <th scope="column"></th>
        </tr>
        </thead>
        <tbody>
        {areas.map((area) => (
            <tr key={area._id}>
              <td>{area.name}</td>
              <Button onClick={() => setSelectedArea(area)}> <EditIcon/></Button>
              <Button onClick={() => deleteArea(area)}> <DeleteIcon/></Button>
            </tr>
        ))}
        </tbody>
      </table>
      {selectedArea && (
          <AreaEditModal area={selectedArea} selectedAreaEdited={selectedAreaEdited}/>
      )}
    </Fragment> : <LoadingSpinner/>}
  </>);
};
