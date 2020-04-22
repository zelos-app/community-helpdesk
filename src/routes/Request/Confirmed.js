import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormikContext } from "formik";
import { Grid, Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";

function Confirmed() {
  const { isValid } = useFormikContext();

  useEffect(() => {
    if (!isValid) {
      history.replace("/request/details");
    }
  }, [isValid]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={5}>
        <div className="illustration" />
      </Grid>
      <Grid item xs={7}>
        <div className="request-children-wrapper">
          <div className="text-wrapper">
            <h1 className="text-alpha">
              <FormattedMessage id="confirmedHead" />
            </h1>
            <h3 className="text-alpha">
              <FormattedMessage
                id="confirmedBody"
                values={{ p: (...chunks) => <p>{chunks}</p> }}
              />
            </h3>
            <Link to="/">
              <Button color="primary" variant="contained">
                <FormattedMessage id="back" />
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Confirmed;
