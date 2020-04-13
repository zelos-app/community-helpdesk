import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import mobileApplication from "../../assets/mobileApplication.png";
import { ReactComponent as AppStore } from "../../assets/appStore.svg";
import { ReactComponent as PlayStore } from "../../assets/playStore.svg";
import { FormattedMessage } from "react-intl";

const listItems = ["install", "register", "group", "wait", "help"];

function AppLanding() {
  return (
    <div className="app-landing">
      <div className="app-landing__text">
        <h1 className="text-alpha">
          <FormattedMessage id="appLandingHead" />
        </h1>
        <h3 className="text-alpha">
          <ol className="app-landing__list">
            {listItems.map((item) => (
              <li>
                <FormattedMessage id={`appLandingBody.${item}`} />
              </li>
            ))}
          </ol>
        </h3>
        <div className="app-landing__links">
          <a
            href="https://apps.apple.com/us/app/zelos-team-management/id1441089536"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppStore className="app-landing__link" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.zelos.client&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayStore className="app-landing__link" />
          </a>
        </div>
      </div>
      <img
        className="app-landing__img"
        src={mobileApplication}
        alt="mobileApplication"
      />
    </div>
  );
}

export default AppLanding;
