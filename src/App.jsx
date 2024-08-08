import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/globalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import SpinnerFullPage from "./ui/loaders/SpinnerFullPage.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Reels from "./pages/Reels.jsx";
import Messages from "./pages/Messages.jsx";
import CurrentUserProfile from "./pages/CurrentUserProfile.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { SidebarShrinkProvider } from "./context/SidebarShrinkingContext.jsx";
import { LikeProvider } from "./context/LikesContext.jsx";
import Search from "./pages/Search.jsx";
import Create from "./pages/Create.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Modal from "./ui/Modal.jsx";
import Notifications from "./pages/Notifications.jsx";
import AllPeople from "./pages/AllPeople.jsx";

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
      <LikeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Modal>
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
                    <Route path="/" index element={<Home />} />
                    <Route path="/:postId" element={<Home />} />
                    <Route path="search" element={<Search />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="explore/people" element={<AllPeople />} />
                    <Route path="reels" element={<Reels />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="create" element={<Create />} />
                    <Route
                      path="profile/:userId"
                      element={<CurrentUserProfile />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                </Routes>
              </Suspense>
            </Modal>
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
      </LikeProvider>
    </SidebarShrinkProvider>
  );
}

export default App;
