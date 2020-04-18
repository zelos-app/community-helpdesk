import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Ticket from "../Ticket";
import React, { useContext } from "react";
import { RequestOptionsContext } from "../DashboardWrapper";
import { orderBy } from "lodash";

export const TicketList = ({
  tickets,
  isLoadingTickets,
  activeFilterState,
  onTicketSelected,
  activeTicket,
}) => {
  const { categories, areas } = useContext(RequestOptionsContext);

  const ticketFilters = (oneTicket) => {
    const filterState = Object.keys(activeFilterState).filter(
      (key) => !!activeFilterState[key]
    );

    return filterState.length === 0
      ? true
      : filterState.filter((oneFilter) => {
          return oneTicket.status[oneFilter] === true;
        }).length !== 0;
  };

  return (
    <>
      {isLoadingTickets ? (
        <LoadingSpinner />
      ) : (
        orderBy(tickets, ["name"], ["asc"])
          .filter(ticketFilters)
          .map((ticket, idx) => (
            <Ticket
              key={idx}
              ticket={ticket}
              active={activeTicket && activeTicket._id === ticket._id}
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
