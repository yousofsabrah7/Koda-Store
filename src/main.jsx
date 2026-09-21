import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

// Tell the browser NOT to restore the previous scroll position
window.history.scrollRestoration = "manual";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5,
      // gcTime: 1000 * 60 * 30,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Toaster />
      <App />
    </QueryClientProvider>
  </StrictMode>
);