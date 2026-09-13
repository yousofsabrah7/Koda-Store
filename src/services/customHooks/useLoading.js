import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useLoading = (loadingFn,setMethod) => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = loadingFn();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setMethod(data));
    }
  }, [isSuccess, data, dispatch]);
  return {
    data: data,
    isLoading,
    isError,
    isSuccess,
  };
};
