import React, { useEffect, useState, createContext } from "react";
import globalAxios from "axios";
import { isLoggedIn } from "../../utils/auth";
import history from "../../utils/history";
import axios from "../../utils/axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import { IntlProvider } from "react-intl";

import translations from "../../translations/en.json";

const defaultContext = { categories: [], areas: [], users: [] };
export const RequestOptionsContext = createContext(defaultContext);

export default function Dashboard(props) {
  const [loginChecked, setLoginChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestOptions, setRequestOptions] = useState(defaultContext);

  async function fetchData() {
    try {
      const [
        {
          data: { categories },
        },
        {
          data: { areas },
        },
        {
          data: { users },
        },
      ] = await globalAxios.all([
        axios.get("/api/categories"),
        axios.get("/api/areas"),
        axios.get("/api/users"),
      ]);

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
    <IntlProvider messages={translations}>
      <Container maxWidth="lg">
        <Box p={1}>
          <RequestOptionsContext.Provider value={requestOptions}>
            <DashboardNavigation />
            {props.children}
          </RequestOptionsContext.Provider>
        </Box>
      </Container>
    </IntlProvider>
  );
}
