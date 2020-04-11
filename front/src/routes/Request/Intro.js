import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ReactComponent as Illustration } from "../../assets/illustration.svg";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Illustration
          style={{
            position: 'absolute',
            left: -24,
            height: 'calc(100vh - 64px)'
          }}
        />
      </Grid>
      <Grid item xs={7}>
        <div className="request-children-wrapper">
          <div className="text-wrapper">
            <h1>
              <FormattedMessage id="introHead" />
            </h1>
            <h3>
              <FormattedMessage id="introBody" values={{p: (...chunks) => <p>{chunks}</p>}} />
            </h3>
          </div>
          <div className="action-wrapper">
            <Link to="/request">
              <Button
                variant="contained"
                color="primary"
              >
                <FormattedMessage id="iNeedHelp" />
              </Button>
            </Link>
            <Link to="/app">
              <Button
                variant="contained"
                color="default"
              >
                <FormattedMessage id="iWantToHelp" />
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Intro;
