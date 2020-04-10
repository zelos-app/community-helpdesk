import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import moment from "moment";
import { FormattedMessage, injectIntl } from "react-intl";
import { RequestOptionsContext } from "./DashboardWrapper";

import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import TaskModal from "../../routes/Dashboard/TaskModal";
import { find } from "lodash";

function Main(props) {
  const FILTER_KEYS = [
    "rejected",
    "accepted",
    "solved",
    "archived",
    "notified",
  ];

  const dropdownOptions = ["resolve", "reject"];

  const { categories, areas, users } = useContext(RequestOptionsContext);

  const [tickets, setTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  const [filterStates, setFilterStates] = useState({
    new: false,
    mine: false,
    solved: false,
    rejected: false,
  });

  const [ticketDetails, setTicketDetails] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  async function getTickets() {
    setIsLoadingTickets(true);
    const { data = {} } = await axios.get("/api/tickets");
    setTickets(data.tickets || []);
    setIsLoadingTickets(false);
  }

  useEffect(() => {
    getTickets();
  }, []);

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

    return (
      activeFilters.filter((oneFilter) => {
        return oneTicket.status[oneFilter] === false;
      }).length === 0
    );
  }

  const newTask = () => {
    setTicketDetails({
      request: "",
      name: "",
      type: "",
      phone: "",
      area: "",
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
      category,
      phone,
      address,
      type,
      assignee,
      _id,
    } = ticket;
    setTicketDetails({
      request,
      name,
      category,
      phone,
      address,
      type,
      assignee,
      _id,
    });
  }

  function getSelectedCategory(ticketCategory) {
    return categories.find((category) => ticketCategory === category._id);
  }

  const Ticket = (ticket) => {
    const date = new moment(ticket.createdAt).format("DD.MM.YY");
    const displayedDate = date !== "invalid date" ? date : "";

    return (
      <div onClick={() => selectTicket(ticket)} className="ticket">
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
  };

  const selectedCategory = ticketDetails?.category
    ? getSelectedCategory(ticketDetails.category)
    : "";

  return (
    <div className="dashboard-children main">
      <div className="dashboard-children-wrapper">
        <DashboardNavigation />
        {isModalOpen && (
          <TaskModal
            onClose={() => closeModal()}
            modalType={modalType}
            handleBtnClick={(comment) => handleBtnClick(comment)}
            showCommentField={modalType === "resolve" || modalType === "reject"}
          />
        )}

        <div className="tickets">
          <div className="ticket-list">
            {/* FILTERS */}
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
            </div>
            {/* END FILTERS */}

            {/* TICKETS */}
            <div className="ticket-list-wrapper">
              {isLoadingTickets ? (
                <LoadingSpinner />
              ) : (
                tickets
                  .filter(ticketFilters)
                  .map((ticket) => <Ticket {...ticket} />)
              )}
            </div>
            {/* END TICKETS */}
          </div>

          <div className="task-manager">
            <div className="flex-end action-wrapper">
              <CustomButton
                titleId="newTask"
                modifier="secondary"
                onClick={newTask}
              />
            </div>

            <div className="task-manager-wrapper">
              <div className="input-container">
                {ticketDetails && (
                  <>
                    <CustomInput
                      labelId="request"
                      name="request"
                      modifier="secondary"
                      layout="textarea"
                      value={ticketDetails.request}
                      onChange={handleInputChange}
                    />

                    <CustomInput
                      labelId="requesterName"
                      name="name"
                      modifier="secondary"
                      value={ticketDetails.name}
                      onChange={handleInputChange}
                    />

                    <CustomInput
                      labelId="category"
                      name="category"
                      modifier="secondary"
                      layout="select"
                      onChange={handleInputChange}
                    >
                      <option value="" />
                      {categories.map((option) => (
                        <option
                          value={option._id}
                          key={option._id}
                          selected={option._id === ticketDetails.category}
                        >
                          {option.name}
                        </option>
                      ))}
                    </CustomInput>

                    <CustomInput
                      labelId="phone"
                      name="phone"
                      modifier="secondary"
                      value={ticketDetails.phone}
                      onChange={handleInputChange}
                    />

                    {selectedCategory && selectedCategory.needsAddress && (
                      <CustomInput
                        labelId="address"
                        name="address"
                        modifier="secondary"
                        value={ticketDetails.address}
                        onChange={handleInputChange}
                      />
                    )}

                    <CustomInput
                      labelId="area"
                      name="area"
                      modifier="secondary"
                      layout="select"
                      onChange={handleInputChange}
                    >
                      <option value="" />
                      {areas.map((option) => (
                        <option
                          value={option._id}
                          key={option._id}
                          selected={option._id === ticketDetails.area}
                        >
                          {option.name}
                        </option>
                      ))}
                    </CustomInput>

                    <CustomInput
                      labelId="assignee"
                      name="assignee"
                      modifier="secondary"
                      layout="select"
                      onChange={handleInputChange}
                    >
                      <option value="" />
                      {users.map((option) => (
                        <option
                          value={option._id}
                          key={option._id}
                          selected={option._id === ticketDetails.user}
                        >
                          {option.firstName} {option.lastName}
                        </option>
                      ))}
                    </CustomInput>
                    <CustomButton
                      titleId={!!ticketDetails?._id ? "Save" : "Create"}
                      modifier="primary"
                      onClick={() =>
                        confirm(!!ticketDetails?._id ? "edit" : "create")
                      }
                    />

                    {!!ticketDetails._id && (
                      <div className="flex-end action-wrapper">
                        <CustomInput
                          labelId="modal"
                          name="modal"
                          modifier="secondary"
                          layout="select"
                          onChange={handleDropDownChange}
                        >
                          <option value="" />
                          {dropdownOptions.map((option) => (
                            <option value={option}>
                              {props.intl.formatMessage({
                                id: `modal.${option}`,
                              })}
                            </option>
                          ))}
                        </CustomInput>
                        <CustomButton
                          titleId="modal.approve"
                          modifier="primary"
                          onClick={() => openModal("approve")}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(Main);
