import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/globalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import SpinnerFullPage from "./ui/loaders/SpinnerFullPage.jsx";
import { SidebarShrinkProvider } from "./context/SidebarShrinkingContext.jsx";
import { LikeProvider } from "./context/LikesContext.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import Modal from "./ui/modal/Modal.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const Home = lazy(() => import("./pages/Home.jsx"));
const Explore = lazy(() => import("./pages/Explore.jsx"));
const Reels = lazy(() => import("./pages/Reels.jsx"));
const Messages = lazy(() => import("./pages/Messages.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Create = lazy(() => import("./pages/Create.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Notifications = lazy(() => import("./pages/Notifications.jsx"));
const AllPeople = lazy(() => import("./pages/AllPeople.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

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
                    <Route path="profile/:userId" element={<Profile />} />
                    <Route
                      path="profile/:userId/:postId"
                      element={<Profile />}
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
