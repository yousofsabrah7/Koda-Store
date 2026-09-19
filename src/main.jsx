import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //   staleTime: 1000 * 60 * 5, // data stays "fresh" for 5 min — no refetch needed
      // gcTime: 1000 * 60 * 30,   // keep unused cache around for 30 min
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <Toaster/>
        <App />
    </QueryClientProvider>
  </StrictMode>,
);
