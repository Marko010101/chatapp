import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <GlobalStyles />
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* <Route index element={<Navigate replace to="home" />} /> */}
                <Route path="/" index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="explore" element={<Explore />} />
                <Route path="reels" element={<Reels />} />
                <Route path="messages" element={<Messages />} />
                <Route path="create" element={<Create />} />
                <Route path="profile/:user" element={<Profile />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
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
              backgroundColor: "var(--color-neutral-700)",
              color: "var(--color-neutral-100)",
            },
          }}
        />
      </QueryClientProvider>
    </SidebarShrinkProvider>
  );
}

export default App;
