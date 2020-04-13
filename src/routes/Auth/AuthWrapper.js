import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../utils/auth";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Auth(props) {
  const [isLoginChecked, setIsLoginChecked] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      history.replace("/dashboard");
    } else {
      setIsLoginChecked(true);
    }
  }, []);

  if (!isLoginChecked) return <LoadingSpinner />;

  return (
    <div className="auth">
      <div className="auth-wrapper">{props.children}</div>
    </div>
  );
}
