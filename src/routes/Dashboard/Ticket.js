import React, { useEffect, } from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';
import DescriptionIcon from '@material-ui/icons/Description';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import RoomIcon from '@material-ui/icons/Room';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chip from '@material-ui/core/Chip';

function Ticket({ ticket, active, category, area, selectTicket }) {
  const date = new moment(ticket.createdAt).format("DD.MM.YYYY hh:mm");
  const displayedDate = date !== "invalid date" ? date : "";

  return (
    <Card className={`ticket ${active ? 'ticket--active' : ''}`} onClick={() => selectTicket()}>
      <CardContent className="ticket__content">
        <div className="ticket__title-row">
            <h3>
            {ticket.request}
            </h3>
            <AccountCircleIcon/>
          
        </div>
        <div className="ticket__date-row">
          <div className="ticket__icon-row">
            <AccessTimeIcon />
            <Typography color="textSecondary">
              {displayedDate}
            </Typography>
          </div>
          {category &&
            <div className="ticket__icon-row ticket__area-row">
              <BookmarkBorderIcon />
              <Typography color="textSecondary">
                {category.name}
              </Typography>
            </div>
          }
          {area &&
            <div className="ticket__icon-row ticket__area-row">
              <RoomIcon />
              <Typography color="textSecondary">
                {area.name}
              </Typography>
            </div>
          }
        </div>
       
      </CardContent>
    </Card>
  );
};

export default Ticket;
