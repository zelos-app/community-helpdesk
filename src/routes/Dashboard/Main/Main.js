import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid";
import CustomButton from "../../../components/CustomButton/CustomButton";
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
    newTicket: {
      textAlign: "right"
    }
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
   
      <Grid container direction="row" alignItems="flex-end">
        <Grid item md={8} xs={12}>
          <Filter />
        </Grid>
        <Grid item md={4} xs={12} className={classes.newTicket}>
          <CustomButton
            titleId="newTask"
            modifier="primary"
            onClick={() => setActiveTicket(ticketInitialState)}
          />
        </Grid>
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
    </>
  );
}

export default injectIntl(Main);
