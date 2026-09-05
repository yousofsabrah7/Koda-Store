import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/services/authSlice";
import { useCurrentUser } from "./hooksApi";

export const useProfile = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useCurrentUser();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setProfile(data));
    }
  }, [isSuccess, data, dispatch]);
  return {
    data: data,
    isLoading,
    isError,
    isSuccess,
  };
};
