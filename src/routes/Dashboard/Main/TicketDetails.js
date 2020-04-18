import React, { Fragment, useContext, useEffect, useState } from "react";
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

export const ticketInitialState = {
  request: "",
  name: "",
  category: "",
  phone: "",
  area: "",
  owner: "",
};

export const TICKET_STATE_APPROVE = "approve";
export const TICKET_STATE_RESOLVE = "resolve";
export const TICKET_STATE_REJECT = "reject";

export const TicketDetails = ({
  activeTicket,
  onSubmitTicket,
  onTicketStateChanged,
}) => {
  const [ticketDetails, setTicketDetails] = useState(ticketInitialState);

  useEffect(() => {
    setTicketDetails(activeTicket);
  }, [activeTicket]);

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
    setTicketDetails({
      ...ticketDetails,
      [target.name]: target.value,
    });
  };

  const getSelectedCategory = (ticketCategory) => {
    return categories.find((category) => ticketCategory === category._id);
  };

  const selectedCategory = activeTicket?.category
    ? getSelectedCategory(activeTicket.category)
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
      {ticketDetails && (
        <Fragment>
          <TextField
            className="input"
            id="request"
            name="request"
            label={<FormattedMessage id="request" />}
            variant="outlined"
            value={ticketDetails.request}
            onChange={handleInputChange}
            rows={5}
            multiline
          />
          <TextField
            className="input"
            id="requesterName"
            name="name"
            label={<FormattedMessage id="requesterName" />}
            variant="outlined"
            value={ticketDetails.name}
            onChange={handleInputChange}
          />
          <FormControl className="input" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              <FormattedMessage id="category" />
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="category"
              value={ticketDetails.category}
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
            value={ticketDetails.phone}
            onChange={handleInputChange}
          />

          {selectedCategory && selectedCategory.needsAddress && (
            <TextField
              className="input"
              id="address"
              name="address"
              label={<FormattedMessage id="address" />}
              variant="outlined"
              value={ticketDetails.address}
              onChange={handleInputChange}
            />
          )}

          <FormControl className="input" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              <FormattedMessage id="area" />
            </InputLabel>
            <Select
              labelId="area"
              id="area"
              name="area"
              value={ticketDetails.area}
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
          <FormControl className="input" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              <FormattedMessage id="assignee" />
            </InputLabel>
            <Select
              labelId="assignee"
              id="assignee"
              name="owner"
              value={ticketDetails.owner}
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
          <div className="dashboard__buttons">
            <Grid container spacing={4}>
              {!!ticketDetails._id && (
                <Grid item xs={4}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
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
                          size="small"
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
                                <MenuList id="split-button-menu">
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
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    onSubmitTicket(
                      !!ticketDetails?._id ? "edit" : "create",
                      ticketDetails
                    )
                  }
                >
                  <FormattedMessage
                    id={!!ticketDetails?._id ? "save" : "create"}
                  />
                </Button>
              </Grid>
            </Grid>
          </div>

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
                onTicketStateChanged(comment, modalType);
              }}
              showCommentField={
                modalType === "resolve" || modalType === "reject"
              }
            />
          )}
        </Fragment>
      )}
    </>
  );
};
