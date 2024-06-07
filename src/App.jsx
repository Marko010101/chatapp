import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "./styles/globalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import SpinnerFullPage from "./ui/SpinnerFullPage.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Reels from "./pages/Reels.jsx";
import Messages from "./pages/Messages.jsx";
import Profile from "./pages/Profile.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { SidebarShrinkProvider } from "./context/SidebarShrinkingContext.jsx";
import Search from "./pages/Search.jsx";
import Create from "./pages/Create.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <SidebarShrinkProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GlobalStyles />
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index path="/" element={<Home />} />
                <Route index path="/search" element={<Search />} />
                <Route path="explore" element={<Explore />} />
                <Route path="reels" element={<Reels />} />
                <Route path="messages" element={<Messages />} />
                <Route path="create" element={<Create />} />
                <Route path="profile/:user" element={<Profile />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-neutral-0)",
              color: "var(--color-neutral-700)",
            },
          }}
        />
      </QueryClientProvider>
    </SidebarShrinkProvider>
  );
}

export default App;
