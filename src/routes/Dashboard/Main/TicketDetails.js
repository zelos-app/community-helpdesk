import React from "react";

import {
  putOrPostTicket,
  updateActiveTicketStatus,
  useTickets,
  stopEditing,
  startEditing,
} from "../../../hooks/useTickets";
import { TicketEditForm } from "./TicketEditForm";
import { TicketVew } from "./TicketView";

export const TicketDetails = () => {
  const [tickets] = useTickets();

  const { draftTicket, isEditing, activeTicket } = tickets;

  const onSaveOrAdd = async (data) => {
    return await putOrPostTicket(data._id ? "update" : "create", data);
  };

  return (
    <>
      {isEditing && draftTicket && (
        <TicketEditForm
          ticket={draftTicket}
          onSubmit={onSaveOrAdd}
          onCancel={() => {
            stopEditing();
          }}
        />
      )}
      {!isEditing && activeTicket && (
        <TicketVew
          ticket={activeTicket}
          onUpdateStatus={updateActiveTicketStatus}
          onEdit={() => {
            startEditing(activeTicket);
          }}
        />
      )}
    </>
  );
};
