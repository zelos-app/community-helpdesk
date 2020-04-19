import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Ticket from "../Ticket";
import React, { useContext } from "react";
import { RequestOptionsContext } from "../DashboardWrapper";
import { orderBy } from "lodash";
import { setActiveTicket, useTickets } from "../../../hooks/useTickets";

export const TicketList = ({}) => {
  const [tickets] = useTickets();
  const { categories, areas } = useContext(RequestOptionsContext);

  const ticketFilters = (oneTicket) => {
    const state = Object.keys(tickets.activeFilter).filter(
      (key) => !!tickets.activeFilter[key]
    );

    return state.length === 0
      ? true
      : state.filter((oneFilter) => {
        console.log(oneTicket);
          return oneTicket.status[oneFilter] === true;
        }).length !== 0;
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
      ...tickets.activeTicket,
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
      {tickets.isLoading ? (
        <LoadingSpinner />
      ) : (
        orderBy(tickets.items, ["name"], ["asc"])
          .filter(ticketFilters)
          .map((ticket, idx) => (
            <Ticket
              key={idx}
              ticket={ticket}
              active={
                tickets.activeTicket && tickets.activeTicket._id === ticket._id
              }
              category={
                categories && categories.find((c) => c._id === ticket.category)
              }
              area={areas && areas.find((a) => a._id === ticket.area)}
              selectTicket={() => onTicketSelected(ticket)}
            />
          ))
      )}
    </>
  );
};
