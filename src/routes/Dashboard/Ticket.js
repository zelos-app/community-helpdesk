import React from "react";
import moment from "moment";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";
import CardHeader from "@material-ui/core/CardHeader";
import { Avatar } from "@material-ui/core";

function Ticket({ ticket, active, category, area, selectTicket }) {
  const date = new moment(ticket.createdAt).format("DD.MM.YYYY hh:mm");
  const displayedDate = date !== "invalid date" ? date : "";
  const avatarName = (ticket.name || "N N").split(" ").map((item) => item[0]);

  return (
    <Card
      className={`ticket ${active ? "ticket--active" : ""}`}
      onClick={() => selectTicket()}
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe">{avatarName}</Avatar>}
        title={ticket.name}
        subheader={displayedDate}
        action={ticket.status}
      />

      <div className="ticket__date-row">
        <div className="ticket__icon-row ticket__area-row">
          <Typography variant="body1" component="div">
            {ticket.request}
          </Typography>
        </div>
      </div>

      <div className="ticket__date-row">
        {area && (
          <div className="ticket__icon-row ticket__area-row">
            <RoomIcon />
            <Typography color="textSecondary">{area.name}</Typography>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Ticket;
