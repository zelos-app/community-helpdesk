import React from "react";
import mobileApplication from "../../assets/mobileApplication.png";
import { ReactComponent as AppStore } from "../../assets/appStore.svg";
import { ReactComponent as PlayStore } from "../../assets/playStore.svg";
import { FormattedMessage } from "react-intl";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

function AppLanding() {
  return (
    <Container maxWidth="md" fixed>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={5}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="flex-start"
          >
            <Box>
              <h1 className="text-alpha">
                <FormattedMessage id="appLanding.content.header" />
              </h1>

              <h3 className="text-alpha" style={{ whiteSpace: "pre-line" }}>
                <FormattedMessage id="appLanding.content.body" />
              </h3>
            </Box>

            <div className="app-landing__links">
              <a
                href="https://apps.apple.com/us/app/zelos-team-management/id1441089536"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppStore className="app-landing__link" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.zelos.client&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayStore className="app-landing__link" />
              </a>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} md={7}>
          <Grid container alignItems="center" direction="column">
            <img
              className="app-landing__img"
              src={mobileApplication}
              alt="mobileApplication"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AppLanding;
