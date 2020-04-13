import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "../../utils/axios";
import moment from "moment";
import { FormattedMessage, injectIntl } from "react-intl";
import { RequestOptionsContext } from "./DashboardWrapper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import TaskModal from "../../routes/Dashboard/TaskModal";
import { TicketApprovedDialog } from "./TicketApprovedDialog";
import Ticket from "../../routes/Dashboard/Ticket";
import { find } from "lodash";

function Main(props) {
  const FILTER_KEYS = [
    "rejected",
    "approved",
    "resolved",
    "archived",
    "notified",
  ];

  const dropdownOptions = ["approve", "resolve", "reject"];

  const { categories, areas, users } = useContext(RequestOptionsContext);

  const [tickets, setTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  const [filterStates, setFilterStates] = useState({
    new: false,
    mine: false,
    resolved: false,
    rejected: false,
  });

  const [ticketDetails, setTicketDetails] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const closeApproveModal = async () => {
    setShowApprovedModal(false);
  };

  async function getTickets() {
    setIsLoadingTickets(true);
    const { data = {} } = await axios.get("/api/tickets");
    setTickets(data.tickets || []);
    setIsLoadingTickets(false);
  }

  useEffect(() => {
    getTickets();
  }, []);

  //TOGGLE-START

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    openModal(dropdownOptions[selectedIndex]);
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

  //TOGGLE-END

  function handleInputChange({ target }) {
    setTicketDetails({
      ...ticketDetails,
      [target.name]: target.value,
    });
  }

  function handleDropDownChange({ target }) {
    if (target.value) {
      openModal(target.value);
    }
  }

  async function openModal(type) {
    setIsModalOpen(true);
    setModalType(type);
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalType("");
  }

  function handleFilters({ target }) {
    setFilterStates({
      ...filterStates,
      [target.name]: target.checked,
    });
  }

  function ticketFilters(oneTicket) {
    const activeFilters = Object.keys(filterStates).filter(
      (key) => !!filterStates[key]
    );

    return activeFilters.length === 0
      ? true
      : activeFilters.filter((oneFilter) => {
          return oneTicket.status[oneFilter] === true;
        }).length !== 0;
  }

  const newTask = () => {
    setTicketDetails({
      request: "",
      name: "",
      category: "",
      phone: "",
      area: "",
      owner: "",
    });
  };

  async function confirm(method) {
    try {
      method === "create"
        ? await axios.post("/api/tickets", ticketDetails)
        : await axios.put(`/api/tickets/${ticketDetails._id}`, ticketDetails);
    } catch (e) {
      alert(e.message);
    }
    getTickets();
    newTask();
  }

  async function handleBtnClick(comment) {
    closeModal();
    if (modalType === "approve") {
      await axios.put(`/api/tickets/${ticketDetails._id}/approve`);
    } else if (modalType === "reject") {
      await axios.put(`/api/tickets/${ticketDetails._id}/reject`, { comment });
    } else if (modalType === "resolve") {
      await axios.put(`/api/tickets/${ticketDetails._id}/resolve`, { comment });
    }
  }

  function selectTicket(ticket) {
    const {
      request,
      name,
      area,
      phone,
      address,
      category,
      owner,
      _id,
    } = ticket;
    setTicketDetails({
      request,
      name,
      area,
      phone,
      address,
      category,
      owner,
      _id,
    });
  }

  function getSelectedCategory(ticketCategory) {
    return categories.find((category) => ticketCategory === category._id);
  }

  const selectedCategory = ticketDetails?.category
    ? getSelectedCategory(ticketDetails.category)
    : "";

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DashboardNavigation />
          {isModalOpen && (
            <TaskModal
              onClose={() => closeModal()}
              modalType={modalType}
              handleBtnClick={(comment) => handleBtnClick(comment)}
              showCommentField={
                modalType === "resolve" || modalType === "reject"
              }
            />
          )}
          <div className="filter-list">
            <h5>
              <FormattedMessage id="filters" />
            </h5>
            <div className="filters">
              {FILTER_KEYS.map((filter) => (
                <CustomInput
                  labelId={filter}
                  name={filter}
                  modifier="secondary"
                  layout="checkbox"
                  checked={filterStates[filter]}
                  onChange={handleFilters}
                />
              ))}
            </div>
            <Button variant="contained" color="default" onClick={newTask}>
              <FormattedMessage id="newTask" />
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="tickets">
            {isLoadingTickets ? (
              <LoadingSpinner />
            ) : (
              tickets
                .filter(ticketFilters)
                .map((ticket) => (
                  <Ticket
                    key={ticket._id}
                    ticket={ticket}
                    active={ticketDetails && ticketDetails._id === ticket._id}
                    category={
                      categories &&
                      categories.find((c) => c._id === ticket.category)
                    }
                    area={areas && areas.find((a) => a._id === ticket.area)}
                    selectTicket={() => selectTicket(ticket)}
                  />
                ))
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="task-manager">
            <div className="task-manager-wrapper">
              <div className="input-container">
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
                            <Grid
                              container
                              direction="column"
                              alignItems="center"
                            >
                              <Grid item xs={12}>
                                <ButtonGroup
                                  variant="contained"
                                  color="primary"
                                  ref={anchorRef}
                                  aria-label="split button"
                                >
                                  <Button onClick={handleClick}>
                                    {dropdownOptions[selectedIndex]}
                                  </Button>
                                  <Button
                                    color="primary"
                                    size="small"
                                    aria-controls={
                                      open ? "split-button-menu" : undefined
                                    }
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
                                        <ClickAwayListener
                                          onClickAway={handleClose}
                                        >
                                          <MenuList id="split-button-menu">
                                            {dropdownOptions.map(
                                              (option, index) => (
                                                <MenuItem
                                                  key={option}
                                                  selected={
                                                    index === selectedIndex
                                                  }
                                                  onClick={(event) =>
                                                    handleMenuItemClick(
                                                      event,
                                                      index
                                                    )
                                                  }
                                                >
                                                  {option}
                                                </MenuItem>
                                              )
                                            )}
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
                              confirm(!!ticketDetails?._id ? "edit" : "create")
                            }
                          >
                            <FormattedMessage
                              id={!!ticketDetails?._id ? "save" : "create"}
                            />
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      <TicketApprovedDialog
        show={showApprovedModal}
        onClose={closeApproveModal}
      />
    </Fragment>
  );
}

export default injectIntl(Main);
