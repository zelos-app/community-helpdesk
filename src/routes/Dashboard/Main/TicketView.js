import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import { RequestOptionsContext } from "../DashboardWrapper";
import { TicketApprovedDialog } from "../TicketApprovedDialog";
import TaskModal from "../TaskModal";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ErrorsHandlingHelper } from "../../../utils/errosHandling";

import {
  TICKET_STATE_APPROVE,
  TICKET_STATE_REJECT,
  TICKET_STATE_RESOLVE,
} from "../../../hooks/useTickets";
import CustomButton from "../../../components/CustomButton/CustomButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    section: {
      marginBottom: theme.spacing(2),
    },
  })
);

export const TicketVew = (props) => {
  const classes = useStyles();
  const { categories, areas, users } = useContext(RequestOptionsContext);

  const { ticket } = props;

  const getOption = (options, id) => {
    if (!options) {
      return "";
    }

    return options.find((item) => id === item._id);
  };

  const dropdownOptions = [
    TICKET_STATE_APPROVE,
    TICKET_STATE_RESOLVE,
    TICKET_STATE_REJECT,
  ];

  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const openModal = async (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const closeApproveModal = async () => {
    setShowApprovedModal(false);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const renderItem = (labelId, value) => {
    return (
      <div className={classes.section}>
        <Typography variant="caption" display="block">
          <FormattedMessage id={labelId} />
        </Typography>

        <Typography variant="body1">{value}</Typography>
      </div>
    );
  };

  const updateStatus = async (comment, modalType) => {
    try {
      props.onUpdateStatus && (await props.onUpdateStatus(comment, modalType));
    } catch (e) {
      alert(ErrorsHandlingHelper.extractMessage(e));
    }
  };

  return (
    <>
      <Box component="div" style={{ textAlign: "left" }}>
        {renderItem("status", ticket.status)}
        {renderItem("request", ticket.request)}
        {renderItem("requesterName", ticket.name)}
        {renderItem("category", getOption(categories, ticket.category)?.name)}
        {renderItem("phone", ticket.phone)}

        {ticket.category &&
          getOption(categories, ticket.category)?.needsAddress &&
          renderItem("address", ticket.address)}

        {renderItem("area", getOption(areas, ticket.area)?.name)}
        {ticket.owner &&
          renderItem("assignee", getOption(users, ticket.owner)?.email)}
      </Box>

      <Grid container direction="row" justify="flex-end">
        {!!ticket._id && (
          <>
            <ButtonGroup
              variant="contained"
              color="primary"
              ref={anchorRef}
              aria-label="split button"
            >
              <CustomButton
                onClick={async () => {
                  await openModal(dropdownOptions[selectedIndex]);
                }}
              >
                {dropdownOptions[selectedIndex]}
              </CustomButton>
              <CustomButton
                color="primary"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </CustomButton>
            </ButtonGroup>
          </>
        )}

        <Box ml={1}>
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={() => props.onEdit && props.onEdit()}
          >
            <FormattedMessage id="edit" />
          </CustomButton>
        </Box>
      </Grid>

      <TicketApprovedDialog
        show={showApprovedModal}
        onClose={closeApproveModal}
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {dropdownOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {isModalOpen && (
        <TaskModal
          onClose={() => closeModal()}
          modalType={modalType}
          handleBtnClick={async (comment) => {
            await closeModal();
            await updateStatus(comment, modalType);
          }}
          showCommentField={modalType === "resolve" || modalType === "reject"}
        />
      )}
    </>
  );
};
