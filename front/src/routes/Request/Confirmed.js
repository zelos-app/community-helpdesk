import React from "react";
import { requestStore } from "../../store";
import { FormattedMessage } from "react-intl";

function Confirmed() {
  return (
    <div className="request-children confirmed">
      <div className="request-children-wrapper">
        <div className="text-wrapper">
          <h1 className="text-alpha">
            <FormattedMessage id="confirmedHead" />
          </h1>
          <h3 className="text-alpha">
            <FormattedMessage id="confirmedBody" />
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Confirmed;
