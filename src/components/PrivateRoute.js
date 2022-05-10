import React from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import Auth from '../lib/authentication';

function PrivateRoute({children, ...rest}) {
  const auth = Auth();
  const location = useLocation(),
        isAuthenticated = auth.isUserAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" state={{location}}/>;
}
export default PrivateRoute;
