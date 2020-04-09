import React, { useEffect, useState } from 'react'
import { isLoggedIn } from '../../utils/auth';
import history from '../../utils/history';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function Dashboard (props) {
  const [loginChecked, setLoginChecked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      history.replace('/auth');
    } else {
      setLoginChecked(true);
    }
  }, []);

  if (!loginChecked) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        {props.children}
      </div>
    </div>
  )
}