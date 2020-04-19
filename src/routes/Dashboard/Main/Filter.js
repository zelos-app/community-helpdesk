import CustomInput from "../../../components/CustomInput/CustomInput";
import React from "react";
import { setActiveFilter, useTickets } from "../../../hooks/useTickets";

export const Filter = () => {
  const [{activeFilter}] = useTickets();

  const filterKeys = [
    "rejected",
    "approved",
    "resolved",
    "archived",
    "notified",
  ];

  const filterChanged = async ({ target }) => {
    setActiveFilter({
      ...activeFilter,
      [target.name]: target.checked,
    });
  };

  return (
    <>
      {filterKeys.map((filter, idx) => (
        <CustomInput
          key={idx}
          labelId={`filter.${filter}`}
          name={filter}
          modifier="secondary"
          layout="checkbox"
          checked={activeFilter[filter]}
          onChange={filterChanged}
        />
      ))}
    </>
  );
};
