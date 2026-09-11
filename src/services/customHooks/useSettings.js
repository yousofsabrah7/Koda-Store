import { useDispatch, useSelector } from "react-redux";

import {
  selectTheme,
  selectSidebarCollapsed,
  selectPageSize,
  selectTableDensity,
  setTheme,
  setSidebarCollapsed,
  setPageSize,
  setTableDensity,
  resetSettings,
} from "../../redux/services/settingsSlice";

const useSettings = () => {
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const sidebarCollapsed = useSelector(selectSidebarCollapsed);
  const pageSize = useSelector(selectPageSize);
  const tableDensity = useSelector(selectTableDensity);

  const updateTheme = (value) => {
    dispatch(setTheme(value));
  };

  const updateSidebarCollapsed = (value) => {
    dispatch(setSidebarCollapsed(value));
  };

  const updatePageSize = (value) => {
    dispatch(setPageSize(value));
  };

  const updateTableDensity = (value) => {
    dispatch(setTableDensity(value));
  };

  const resetAllSettings = () => {
    dispatch(resetSettings());
  };

  return {
    theme,
    sidebarCollapsed,
    pageSize,
    tableDensity,

    updateTheme,
    updateSidebarCollapsed,
    updatePageSize,
    updateTableDensity,
    resetAllSettings,
  };
};

export default useSettings;