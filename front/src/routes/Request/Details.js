import React, { useState, useEffect, useContext } from "react";
import axios from "../../utils/axios";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { requestStore } from "../../store";
import { RequestOptionsContext } from "./RequestWrapper";

function Details() {
  const [isLoading, setIsLoading] = useState(false);
  const { areas } = useContext(RequestOptionsContext);

  const [requestDetails, setRequestDetails] = useState({
    ...requestStore,
    name: "",
    phone: "+372 ",
    address: "",
    area: "",
  });

  async function next() {
    setIsLoading(true);
    await axios.post("/api/submit", { ...requestDetails });
    setIsLoading(false);
    history.push("/request/confirmed");
  }

  function handleInputChange({ target }) {
    setRequestDetails({
      ...requestDetails,
      [target.name]: target.value,
    });
  }

  function selectArea(name) {
    console.log(name);
    setRequestDetails({
      ...requestDetails,
      area: name,
    });
  }

  function Area({ _id, name }) {
    return <CustomButton onClick={() => selectArea(name)} title={name} />;
  }

  return (
    <div className="request-children details">
      <div className="request-children-wrapper">
        <div className="text-wrapper">
          <h1 className="text-alpha">
            <FormattedMessage id="enterYourDetails" />
          </h1>
        </div>

        <div className="input-container">
          <CustomInput
            labelId="fullName"
            name="name"
            modifier="secondary"
            value={requestDetails.name}
            onChange={handleInputChange}
          />

          <CustomInput
            labelId="phone"
            name="phone"
            modifier="secondary"
            value={requestDetails.phone}
            onChange={handleInputChange}
          />

          {/* show address field only if the currently selected category has the flag */}
          <CustomInput
            labelId="address"
            name="address"
            modifier="secondary"
            value={requestDetails.address}
            onChange={handleInputChange}
          />

          {/*TODO: make this into a select field or something */}
          {requestDetails.area ? (
            <CustomInput
              labelId="area"
              name="area"
              modifier="secondary"
              value={requestDetails.area}
              onChange={handleInputChange}
              readOnly
            />
          ) : (
            <div className="area-wrapper">
              Area:
              {areas.map((area) => (
                <Area key={area._id} {...area} />
              ))}
            </div>
          )}
        </div>

        <div className="action-wrapper">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <CustomButton titleId="next" modifier="primary" onClick={next} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
