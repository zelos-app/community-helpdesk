import React, { useState, useEffect, createContext } from "react";
import axios from "../../utils/axios";

const defaultContext = { categories: [], areas: [] };

export const RequestOptionsContext = createContext(defaultContext);

export default function RequestWrapper(props) {
  const [requestOptions, setRequestOptions] = useState(defaultContext);

  useEffect(async () => {
    const {
      data: { categories, areas },
    } = await axios.get("/api/submit");

    setRequestOptions({ categories, areas });
  }, []);

  return (
    <div className="request">
      <div className="request-wrapper">
        <RequestOptionsContext.Provider value={requestOptions}>
          {props.children}
        </RequestOptionsContext.Provider>
      </div>
    </div>
  );
}
