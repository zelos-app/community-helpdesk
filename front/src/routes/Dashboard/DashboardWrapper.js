import React, { useEffect, useState, createContext } from "react";
import { isLoggedIn } from "../../utils/auth";
import history from "../../utils/history";
import axios from "../../utils/axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const defaultContext = { categories: [], areas: [], users: [] };
export const RequestOptionsContext = createContext(defaultContext);
export const RequestDataContext = createContext({
  data: {},
  update: () => {},
});

export default function Dashboard(props) {
  const [loginChecked, setLoginChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestOptions, setRequestOptions] = useState(defaultContext);
  const [requestData, setRequestData] = useState({});

  async function fetchData() {
    try {
      const {
        data: { categories, areas },
      } = await axios.get("/api/submit");
      const {
        data: { users }
      } = await axios.get("api/users");

      setRequestOptions({ categories, areas, users });
      setIsLoaded(true);
    } catch (e) {
      alert(e.message);
    }
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      history.replace("/auth");
    } else {
      setLoginChecked(true);
    }
    fetchData();
  }, []);

  if (!loginChecked || !isLoaded) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <RequestOptionsContext.Provider value={requestOptions}>
          {props.children}
        </RequestOptionsContext.Provider>
      </div>
    </div>
  );
}
