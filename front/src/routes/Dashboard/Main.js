import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';
import TaskModal from '../../routes/Dashboard/TaskModal';

export default function Main() {
  const FILTER_KEYS = [
    "rejected",
    "accepted",
    "solved",
    "archived",
    "notified",
  ];

  const dropdownOptions = ['resolve', 'reject'];

  const [tickets, setTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  const [filterStates, setFilterStates] = useState({
    new: false,
    mine: false,
    solved: false,
    rejected: false,
  });

  const [ticketDetails, setTicketDetails] = useState({
    request: "",
    name: "",
    category: "",
    phone: "",
    address: "",
    area: "",
    assignee: "",
    _id: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

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
    setModalType('');
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

  function createTask() {
    // TODO: Create task
  }

  async function handleBtnClick(comment) {
    closeModal();
    if (modalType === 'approve') {
      await axios.put(`/api/tickets/${ticketDetails._id}/approve`);
    } else if (modalType === 'reject') {
      await axios.put(`/api/tickets/${ticketDetails._id}/reject`, { comment });
    } else if (modalType === 'resolve') {
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
      area,
      assignee,
      _id,
    } = ticket;
    setTicketDetails({
      request,
      name,
      category,
      phone,
      address,
      area,
      assignee,
      _id,
    });
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

  return (
    <div className="dashboard-children main">
      <div className="dashboard-children-wrapper">
        <DashboardNavigation />
        {isModalOpen &&
          <TaskModal
            onClose={() => closeModal()}
            modalType={modalType}
            handleBtnClick={(comment) => handleBtnClick(comment)}
            showCommentField={modalType === 'resolve' || modalType === 'reject'}
          />
        }

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
                onClick={createTask}
              />
            </div>

            <div className="task-manager-wrapper">
              <div className="input-container">
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
                  value={ticketDetails.category}
                  onChange={handleInputChange}
                />

                <CustomInput
                  labelId="phone"
                  name="phone"
                  modifier="secondary"
                  value={ticketDetails.phone}
                  onChange={handleInputChange}
                />

                <CustomInput
                  labelId="address"
                  name="address"
                  modifier="secondary"
                  value={ticketDetails.address}
                  onChange={handleInputChange}
                />

                <CustomInput
                  labelId="area"
                  name="area"
                  modifier="secondary"
                  value={ticketDetails.area}
                  onChange={handleInputChange}
                />

                <CustomInput
                  labelId="assignee"
                  name="assignee"
                  modifier="primary"
                  value={ticketDetails.assignee}
                  onChange={handleInputChange}
                />

                <div className="flex-end action-wrapper">
                  <CustomDropdown
                    options={dropdownOptions}
                    onChange={handleDropDownChange}
                  />
                  <CustomButton
                    titleId="modal.approve"
                    modifier="primary"
                    onClick={() => openModal('approve')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
