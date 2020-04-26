import { createStore, useStore } from "../store/stores";
import axios from "../utils/axios";

export const TICKET_STATE_APPROVE = "approve";
export const TICKET_STATE_RESOLVE = "resolve";
export const TICKET_STATE_REJECT = "reject";

export const ticketInitialState = {
  request: "",
  name: "",
  category: "",
  phone: "",
  area: "",
  owner: "",
  status: "new",
};

export const filterInitialState = {
  new: false,
  mine: false,
  resolved: false,
  rejected: false,
};

export const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  isEditing: false,
  activeTicket: undefined,
  activeFilter: filterInitialState,
};

const store = createStore(initialState);

export const fetchTickets = async () => {
  store.set({
    ...store.state,
    isLoading: true,
  });

  let tickets = [];
  try {
    const { data = {} } = await axios.get("/api/tickets");
    tickets = (data && data.tickets) || [];
  } catch (error) {
    console.error("Could not load tickets");

    store.set({
      ...store.state,
      isLoading: false,
      error: true,
    });
  } finally {
    store.set({
      ...store.state,
      isLoading: false,
      items: tickets,
    });
  }
};

const appendTicket = (newTicket) => {
  const filteredTickets = store.state.items.filter(
    (ticket) => ticket._id !== newTicket._id
  );

  store.set({
    ...store.state,
    items: [...filteredTickets, newTicket],
  });
};

export const putOrPostTicket = async (method, newTicket) => {
  const idData =
    method === "create"
      ? await axios.post("/api/tickets", newTicket)
      : await axios.put(`/api/tickets/${newTicket._id}`, newTicket);

  const updatedTicket = { _id: idData?.data?.id, ...newTicket };
  setActiveTicket(updatedTicket);
  appendTicket(updatedTicket);
  stopEditing();
};

export const startEditing = (ticket) => {
  store.set({
    ...store.state,
    draftTicket: ticket,
    isEditing: true,
  });
};

export const stopEditing = () => {
  store.set({
    ...store.state,
    isEditing: false,
  });
};

export const updateActiveTicketStatus = async (comment, state) => {
  try {
    if (state === TICKET_STATE_APPROVE) {
      await axios.put(`/api/tickets/${store.state.activeTicket._id}/approve`);
    } else if (state === TICKET_STATE_REJECT) {
      await axios.put(`/api/tickets/${store.state.activeTicket._id}/reject`, {
        comment,
      });
    } else if (state === TICKET_STATE_RESOLVE) {
      await axios.put(`/api/tickets/${store.state.activeTicket._id}/resolve`, {
        comment,
      });
    }

    setActiveTicket(undefined);
  } finally {
    // TODO: Should not really fetch all, put update the active ticket and set it to the list.
    await fetchTickets();
  }
};

export const setActiveTicket = (activeTicket) => {
  store.set({
    ...store.state,
    activeTicket,
  });
};

export const setActiveFilter = (activeFilter) => {
  store.set({
    ...store.state,
    activeFilter,
  });
};

export const useTickets = () => {
  return useStore(store);
};
