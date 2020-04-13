import React from "react";
import { FormattedMessage } from "react-intl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";

export const TicketApprovedDialog = ({ show, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="ticket-approved-title"
      aria-describedby="ticket-approved-description"
    >
      <DialogContent>
        <DialogContentText id="ticket-approved-dialog-description">
          <FormattedMessage id="settings.modal.ticket.approved.message" />
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <FormattedMessage id="settings.modal.ticket.approved.button.text" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
