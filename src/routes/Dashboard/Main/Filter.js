import CustomInput from "../../../components/CustomInput/CustomInput";
import React, { useEffect, useState } from "react";

export const filterInitialState = {
  new: false,
  mine: false,
  resolved: false,
  rejected: false,
};

export const Filter = ({onFilterChanged}) => {
  const filterKeys = [
    "rejected",
    "approved",
    "resolved",
    "archived",
    "notified",
  ];

  const [state, setState] = useState(filterInitialState);

  const filterChanged = async ({ target }) => {
    setState({
      ...state,
      [target.name]: target.checked,
    });
  };

  useEffect(() => {
    onFilterChanged(state);
  }, [state]);

  return (
    <>
      {filterKeys.map((filter, idx) => (
        <CustomInput
          key={idx}
          labelId={`filter.${filter}`}
          name={filter}
          modifier="secondary"
          layout="checkbox"
          checked={state[filter]}
          onChange={filterChanged}
        />
      ))}
    </>
  );
};
