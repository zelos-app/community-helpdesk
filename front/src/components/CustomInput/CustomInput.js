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
    ...rest
  } = props;

  return (
    <Fragment>
      <InputStyle />
      <div className={`input ${modifier}`}>
        <div className={`input-wrapper layout-${layout}`}>
          {/* LABEL */}
          <label htmlFor={name}>
            <FormattedMessage dataset="ok" id={labelId} />
          </label>

          {/* INPUT */}
          {layout === "input" ? <input name={name} {...rest} /> : ""}

          {/* TEXTAREA */}
          {layout === "textarea" ? (
            <textarea name={name} {...rest}></textarea>
          ) : (
            ""
          )}

          {/* CHEKBOX */}
          {layout === "checkbox" ? (
            <Fragment>
              <div className={`checkbox ${checked ? "is-checked" : ""}`}>
                <input type="checkbox" name={name} {...rest} />
              </div>
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
};
