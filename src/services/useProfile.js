import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/services/authSlice";
import { useCurrentUser } from "./hooksApi";

export const useProfile = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useCurrentUser();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setLogin(data));
    }
  }, [isSuccess, data, dispatch]);

  return {
    user: data,
    isLoading,
    isError,
    isSuccess,
  };
};
