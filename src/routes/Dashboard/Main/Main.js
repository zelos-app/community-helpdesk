import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Filter, filterInitialState } from "./Filter";
import { TicketList } from "./TicketList";
import {
  ticketInitialState,
  TICKET_STATE_APPROVE,
  TICKET_STATE_REJECT,
  TicketDetails,
} from "./TicketDetails";

function Main() {
  const [activeTicket, setActiveTicket] = useState();
  const [activeFilterState, setActiveFilterState] = useState(filterInitialState);
  const [tickets, setTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  const fetchTickets = async () => {
    setIsLoadingTickets(true);
    const { data = {} } = await axios.get("/api/tickets");
    setTickets(data.tickets || []);
    setIsLoadingTickets(false);
  };

  useEffect(() => {
    (async () => {
      await fetchTickets();
    })();
  }, []);

  const onSubmitTicket = async (method, newTicket) => {
    try {
      method === "create"
        ? await axios.post("/api/tickets", newTicket)
        : await axios.put(`/api/tickets/${newTicket._id}`, newTicket);

      const filteredTickets = tickets.filter(
        (ticket) => ticket._id !== newTicket._id
      );
      setTickets([...filteredTickets, newTicket]);
    } catch (e) {
      alert(e.message);
    }
  };

  const onTicketStateChanged = async (comment, state) => {
    if (state === TICKET_STATE_APPROVE) {
      await axios.put(`/api/tickets/${activeTicket._id}/approve`);
    } else if (state === TICKET_STATE_REJECT) {
      await axios.put(`/api/tickets/${activeTicket._id}/reject`, { comment });
    } else if (state === TICKET_STATE_REJECT) {
      await axios.put(`/api/tickets/${activeTicket._id}/resolve`, { comment });
    }
  };

  const onTicketSelected = ({
    request,
    name,
    area,
    phone,
    address,
    category,
    owner,
    _id,
  }) => {
    setActiveTicket({
      request,
      name,
      area,
      phone,
      address,
      category,
      owner,
      _id,
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="filter-list">
            <h5>
              <FormattedMessage id="filters" />
            </h5>
            <div className="filters">
              <Filter onFilterChanged={(state) => setActiveFilterState(state)} />
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
          <TicketList
            tickets={tickets}
            isLoadingTickets={isLoadingTickets}
            activeTicket={activeTicket}
            activeFilterState={activeFilterState}
            onTicketSelected={onTicketSelected}
          />
        </Grid>
        <Grid item xs={6}>
          <TicketDetails
            activeTicket={activeTicket}
            onSubmitTicket={onSubmitTicket}
            onTicketStateChanged={onTicketStateChanged}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default injectIntl(Main);
