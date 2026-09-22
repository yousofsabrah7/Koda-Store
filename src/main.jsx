import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "./components/ThemeContext.jsx";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <ThemeProvider>
          <Toaster position="top-center" />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
