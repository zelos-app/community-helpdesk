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
  useTickets,
  startEditing,
} from "../../../hooks/useTickets";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    newTicket: {
      textAlign: "right",
    },
    ticketPlaceholder: {
      padding: theme.spacing(2),
      minHeight: "400px",
      textAlign: "center",
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

  const [tickets] = useTickets();
  const { activeTicket, isEditing } = tickets;

  return (
    <Grid container spacing={2}>
      <Grid container item direction="row" alignItems="flex-end">
        <Grid item md={8} xs={12}>
          <Filter />
        </Grid>
        <Grid item md={4} xs={12} className={classes.newTicket}>
          {!isEditing && (
            <CustomButton
              titleId="newTask"
              modifier="primary"
              onClick={() => startEditing(ticketInitialState)}
            />
          )}
        </Grid>
      </Grid>

      <Grid container item spacing={2}>
        <Grid item sm={12} md={6}>
          <Paper elevation={0}>
            <TicketList />
          </Paper>
        </Grid>

        <Grid item sm={12} md={6}>
          <Paper elevation={3} className={classes.ticketPlaceholder}>
            {activeTicket || isEditing ? (
              <TicketDetails />
            ) : (
              <h3>Select a ticket or create a new one</h3>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default injectIntl(Main);
