import {Navigate, Route, Routes as Switch} from 'react-router-dom';
import ProtectedRoute from './protected-route';
import LoginPage from "../pages/auth/login.tsx";
import PartnerHomePage from "../pages/partner/home.tsx";
import SeePartnerPage from "../pages/partner/see.tsx";
import {useContext} from "react";
import {AuthContext} from "../context/auth.ts";

const Routes: React.FC = () => {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Switch>
      <Route path="auth"
             element={<ProtectedRoute allow={!isAuthenticated}
                                      to="/"/>}>
        <Route path="login" element={<LoginPage/>}/>
        <Route index path="*" element={<Navigate to="/auth/login"/>}/>
      </Route>

      <Route path="partner"
             element={<ProtectedRoute allow={isAuthenticated}
                                      to="/auth/login"/>}>
        <Route index element={<PartnerHomePage/>}/>
        <Route path=":id" element={<SeePartnerPage/>}/>
        <Route path="*" element={<Navigate to="/pagenotfound"/>}/>
      </Route>

      <Route path="*"
             element={isAuthenticated ? <Navigate to="/partner"/> :
               <Navigate to="/auth"/>}/>
    </Switch>

  );
};

export default Routes;
