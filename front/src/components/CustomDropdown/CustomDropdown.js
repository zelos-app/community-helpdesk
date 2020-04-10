import React, { Fragment } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

function CustomDropdown(props) {
  const { name = "", options = [], ...rest } = props;

  return (
    <div className="dropdown" {...rest}>
      <select id={name}>
        <option value='' />
        {options.map(option => (
          <option value={option}>
            {props.intl.formatMessage({ id: `modal.${option}` })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default injectIntl(CustomDropdown);
