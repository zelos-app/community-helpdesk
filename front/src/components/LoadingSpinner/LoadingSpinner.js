import React, { Fragment } from "react";
import LoadingSpinnerStyle from "./LoadingSpinnerStyle";

export default function LoadingSpinner() {
  return (
    <Fragment>
      <LoadingSpinnerStyle />
      <div className="loading-bar-spinner">
        <div className="loading-bar-spinner-wrapper">
          <div className="spinner-icon"></div>
        </div>
      </div>
    </Fragment>
  );
}
