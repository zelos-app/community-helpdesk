import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

function Launch() {
  return (
    <Grid container spacing={0}>
      <Grid item md={5} xs={12}>
        <div className="illustration" />
      </Grid>
      <Grid item md={7} xs={12} className="right-block">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <div className="text-wrapper">
            <h1 className="text-alpha">
              <FormattedMessage id="launchHead" />
            </h1>
            <h3 className="text-alpha">
              <FormattedMessage
                id="introBody"
                values={{ p: (...chunks) => <p>{chunks}</p> }}
              />
            </h3>
          </div>
          <div className="action-wrapper">
            <Link to="/launch/moreinfo">
              <CustomButton
                titleId="launch.buttons.moreInfo"
                modifier="primary"
              />
            </Link>
            <Link to="/getstarted">
              <CustomButton
                titleId="launch.buttons.getStarted"
                modifier="secondary"
              />
            </Link>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Launch;
