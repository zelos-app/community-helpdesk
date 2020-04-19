import React, { useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Filter } from "./Filter";
import { TicketList } from "./TicketList";
import { TicketDetails } from "./TicketDetails";
import {
  fetchTickets,
  ticketInitialState,
  setActiveTicket,
} from "../../../hooks/useTickets";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      height: "100%",
    },
    grow: {
      flexGrow: 1,
    },
  })
);

function Main() {
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await fetchTickets();
    })();
  }, []);

  return (
    <>
      <Grid container>
        <Grid container direction="row" alignItems="flex-end" xs={12}>
          <Filter />

          <div className={classes.grow} />

          <Button
            variant="contained"
            color="default"
            onClick={() => setActiveTicket(ticketInitialState)}
          >
            <FormattedMessage id="newTask" />
          </Button>
        </Grid>

        <Grid container>
          <Grid item sm={12} md={6}>
            <Paper elevation={0} className={classes.paper}>
              <TicketList />
            </Paper>
          </Grid>

          <Grid item sm={12} md={6}>
            <Paper elevation={0} className={classes.paper}>
              <TicketDetails />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default injectIntl(Main);
