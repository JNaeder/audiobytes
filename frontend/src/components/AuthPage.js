import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../slices/userSlice";

function AuthPage() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("Auth Page!");
  console.log("url", url);

  useEffect(() => {
    const getToken = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/discordtoken/${code}`
      );
      dispatch(setCurrentUser(response.data));
      navigate("/");
    };
    if (code) {
      getToken();
    }
  }, [code, dispatch, navigate]);

  return <></>;
}

export default AuthPage;
