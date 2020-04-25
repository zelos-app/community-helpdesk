import React from "react";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';
import DescriptionIcon from '@material-ui/icons/Description';
import RoomIcon from '@material-ui/icons/Room';
import Chip from '@material-ui/core/Chip';

function Ticket({ ticket, active, category, area, selectTicket }) {
  const date = new moment(ticket.createdAt).format("DD.MM.YYYY hh:mm");
  const displayedDate = date !== "invalid date" ? date : "";

  return (
    <Card className={`ticket ${active ? 'ticket--active' : ''}`} onClick={() => selectTicket()}>
      <CardContent className="ticket__content">
        <div className="ticket__title-row">
          <div className="ticket__icon-row">
            <PersonIcon />
            <h3>
              {ticket.name}
            </h3>
          </div>
          {category &&
            <Chip label={category.name} />
          }
        </div>
        <div className="ticket__date-row">
          <div className="ticket__icon-row">
            <EventIcon />
            <Typography color="textSecondary">
              {displayedDate}
            </Typography>
          </div>
          {area &&
            <div className="ticket__icon-row ticket__area-row">
              <RoomIcon />
              <Typography color="textSecondary">
                {area.name}
              </Typography>
            </div>
          }
        </div>
        <div className="ticket__icon-row">
          <DescriptionIcon />
          <Typography variant="body2" component="p">
            {ticket.request}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Ticket;
