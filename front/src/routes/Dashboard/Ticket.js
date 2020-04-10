import React, { useEffect, useState, useContext } from "react";
import { useFormikContext } from "formik";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import history from "../../utils/history";
import { RequestOptionsContext } from "./RequestWrapper";

function Ticket({ ticket, selectTicket }) {
  const date = new moment(ticket.createdAt).format("DD.MM.YY");
  const displayedDate = date !== "invalid date" ? date : "";

  return (
    <div onClick={() => selectTicket()} className="ticket">
      <div className="ticket-wrapper">
        <h5>{ticket.request}</h5>

        <div className="footer">
          <h5>{displayedDate}</h5>
          <h5>{ticket.category}</h5>
          <h5>{ticket.area}</h5>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
