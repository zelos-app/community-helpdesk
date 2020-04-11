import DashboardNavigation from "../DashboardNavigation/DashboardNavigation";
import React from "react";

export const NavigationWrapper = (props) => {
  return (<><DashboardNavigation/>{props.children}</>);
};
