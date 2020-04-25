import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import InputStyle from "./CustomInputStyle";

export default (props) => {
  const {
    modifier = "primary",
    labelId = null,
    name = "input",
    layout = "input",
    checked = false,
    children,
    ...rest
  } = props;

  return (
    <Fragment>
      <InputStyle />
      <div className={`input ${modifier}`}>
        <div className={`input-wrapper layout-${layout}`}>
          {/* LABEL */}
          {labelId && (
            <label htmlFor={name}>
              <FormattedMessage dataset="ok" id={labelId} />
            </label>
          )}

          {/* INPUT */}
          {layout === "input" && <input name={name} id={name} {...rest} />}

          {/* TEXTAREA */}
          {layout === "textarea" && (
            <textarea name={name} id={name} {...rest}></textarea>
          )}

          {/* SELECT */}
          {layout === "select" && (
            <select name={name} id={name} {...rest}>
              {children}
            </select>
          )}

          {/* CHEKBOX */}
          {layout === "checkbox" && (
            <div className={`checkbox ${checked ? "is-checked" : ""}`}>
              <input type="checkbox" name={name} id={name} {...rest} />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
