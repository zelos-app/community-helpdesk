import React, { useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select/Select";
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
import {
  putOrPostTicket,
  TICKET_STATE_APPROVE,
  TICKET_STATE_REJECT,
  TICKET_STATE_RESOLVE,
  updateActiveTicketStatus,
  useTickets,
} from "../../../hooks/useTickets";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& .MuiTextField-root": {
        marginBottom: theme.spacing(1),
      },
      "& .MuiFormControl-root": {
        marginBottom: theme.spacing(1),
      },
    },
  })
);

export const TicketDetails = () => {
  const classes = useStyles();

  const [draftTicket, setDraftTicket] = useState();
  const [tickets] = useTickets();

  useEffect(() => {
    setDraftTicket(tickets.activeTicket);
  }, [tickets.activeTicket]);

  const dropdownOptions = [
    TICKET_STATE_APPROVE,
    TICKET_STATE_RESOLVE,
    TICKET_STATE_REJECT,
  ];
  const { categories, areas, users } = useContext(RequestOptionsContext);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = async (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const handleInputChange = ({ target }) => {
    setDraftTicket({
      ...draftTicket,
      [target.name]: target.value,
    });
  };

  const getSelectedCategory = (ticketCategory) => {
    return categories.find((category) => ticketCategory === category._id);
  };

  const selectedCategory = tickets.activeTicket?.category
    ? getSelectedCategory(tickets.activeTicket.category)
    : "";

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

  const closeApproveModal = async () => {
    setShowApprovedModal(false);
  };

  return (
    <>
      {draftTicket && (
        <Box component="div">
          <form className={classes.root}>
            <TextField
              className="input"
              id="request"
              name="request"
              label={<FormattedMessage id="request" />}
              variant="outlined"
              value={draftTicket.request}
              onChange={handleInputChange}
              rows={5}
              fullWidth
              multiline
            />

            <TextField
              className="input"
              id="requesterName"
              name="name"
              label={<FormattedMessage id="requesterName" />}
              variant="outlined"
              fullWidth
              value={draftTicket.name}
              onChange={handleInputChange}
            />

            <FormControl className="input" variant="outlined" fullWidth>
              <InputLabel>
                <FormattedMessage id="category" />
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="category"
                value={draftTicket.category}
                variant="outlined"
                onChange={handleInputChange}
                label={<FormattedMessage id="category" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((option) => (
                  <MenuItem value={option._id} key={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              className="input"
              id="phone"
              name="phone"
              label={<FormattedMessage id="phone" />}
              variant="outlined"
              fullWidth
              value={draftTicket.phone}
              onChange={handleInputChange}
            />

            {selectedCategory && selectedCategory.needsAddress && (
              <TextField
                className="input"
                id="address"
                name="address"
                label={<FormattedMessage id="address" />}
                variant="outlined"
                fullWidth
                value={draftTicket.address}
                onChange={handleInputChange}
              />
            )}

            <FormControl className="input" variant="outlined" fullWidth>
              <InputLabel>
                <FormattedMessage id="area" />
              </InputLabel>
              <Select
                labelId="area"
                id="area"
                name="area"
                variant="outlined"
                value={draftTicket.area}
                onChange={handleInputChange}
                label={<FormattedMessage id="area" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {areas.map((option) => (
                  <MenuItem value={option._id} key={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="input" variant="outlined" fullWidth>
              <InputLabel>
                <FormattedMessage id="assignee" />
              </InputLabel>
              <Select
                labelId="assignee"
                id="assignee"
                name="owner"
                variant="outlined"
                value={draftTicket.owner}
                onChange={handleInputChange}
                label={<FormattedMessage id="assignee" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {users.map((option) => (
                  <MenuItem value={option._id} key={option._id}>
                    {option.firstName} {option.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container direction="row" justify="flex-end">
              {!!draftTicket._id && (
                <>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    ref={anchorRef}
                    aria-label="split button"
                  >
                    <Button
                      onClick={async () => {
                        await openModal(dropdownOptions[selectedIndex]);
                      }}
                    >
                      {dropdownOptions[selectedIndex]}
                    </Button>
                    <Button
                      color="primary"
                      aria-controls={open ? "split-button-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      onClick={handleToggle}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>

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
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>
                              {dropdownOptions.map((option, index) => (
                                <MenuItem
                                  key={option}
                                  selected={index === selectedIndex}
                                  onClick={(event) =>
                                    handleMenuItemClick(event, index)
                                  }
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
                </>
              )}

              <Box ml={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    putOrPostTicket(
                      !!draftTicket?._id ? "edit" : "create",
                      draftTicket
                    )
                  }
                >
                  <FormattedMessage
                    id={!!draftTicket?._id ? "save" : "create"}
                  />
                </Button>
              </Box>
            </Grid>

            <TicketApprovedDialog
              show={showApprovedModal}
              onClose={closeApproveModal}
            />

            {isModalOpen && (
              <TaskModal
                onClose={() => closeModal()}
                modalType={modalType}
                handleBtnClick={async (comment) => {
                  await closeModal();
                  await updateActiveTicketStatus(comment, modalType);
                }}
                showCommentField={
                  modalType === "resolve" || modalType === "reject"
                }
              />
            )}
          </form>
        </Box>
      )}
    </>
  );
};
