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

function Main() {
  useEffect(() => {
    (async () => {
      await fetchTickets();
    })();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="filter-list">
            <h5>
              <FormattedMessage id="filters" />
            </h5>
            <div className="filters">
              <Filter />
            </div>
            <Button
              variant="contained"
              color="default"
              onClick={() => setActiveTicket(ticketInitialState)}
            >
              <FormattedMessage id="newTask" />
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TicketList />
        </Grid>
        <Grid item xs={6}>
          <TicketDetails />
        </Grid>
      </Grid>
    </>
  );
}

export default injectIntl(Main);
