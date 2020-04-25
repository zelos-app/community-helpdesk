import { useEffect, useState } from "react";
import { produce } from "immer";

export const useStore = (store) => {
  const [state, setState] = useState(store.state);

  useEffect(() => {
    store.subscribe(setState);
    return () => store.unsubscribe(setState);
  }, [store]);

  return [state, store.set];
};

const createGlobalStore = (initialState) => {
  let subscriptions = [];

  const store = {
    _store: true,
  };

  store.state = initialState;

  store.set = (updateState) => {
    const newState =
      updateState instanceof Function
        ? produce(store.state, updateState)
        : updateState;
    store.state = newState;
    subscriptions.forEach((setState) => setState(newState));
  };

  store.subscribe = (setState) => subscriptions.push(setState);

  store.unsubscribe = (setState) => {
    subscriptions = subscriptions.filter(($setState) => $setState !== setState);
  };

  return store;
};

export const createStore = createGlobalStore;
