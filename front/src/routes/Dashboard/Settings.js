import React from "react";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import ListPopulationComponent from "../../components/SettingsPage/ListPopulationComponent";

export default function Settings(props) {
  return (
    <div className="dashboard-children settings">
      <DashboardNavigation/>
      <ListPopulationComponent/>
    </div>
  );
}
