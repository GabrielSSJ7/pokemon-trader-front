import React from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import Auth from '../lib/authentication';

function PrivateRoute({children, ...rest}) {
  const location = useLocation(),
        isAuthenticated = Auth.isUserAuthenticated();
  return isAuthenticated ? children : <Navigate to="/unauthorized" state={{location}}/>;
}
export default PrivateRoute;
