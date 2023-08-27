import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setCurrentUser(user));
      navigate("/");
    }
  }, [user, isAuthenticated, dispatch, navigate]);
  return <></>;
}

export default AuthPage;
