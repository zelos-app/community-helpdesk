import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

function Intro() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={5}>
        <div className="illustration" />
      </Grid>
      <Grid item xs={7}>
        <div className="request-children-wrapper">
          <div className="text-wrapper">
            <h1 className="text-alpha">
              <FormattedMessage id="introHead" />
            </h1>
            <h3 className="text-alpha">
              <FormattedMessage
                id="introBody"
                values={{ p: (...chunks) => <p>{chunks}</p> }}
              />
            </h3>
          </div>
          <div className="action-wrapper">
            <Link to="/request">
              <CustomButton titleId="iNeedHelp" modifier="primary" />
            </Link>
            <Link to="/app">
              <CustomButton titleId="iWantToHelp" modifier="secondary" />
            </Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Intro;
