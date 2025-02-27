import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SpinnerFullPage from "./loaders/SpinnerFullPage.jsx";
import styled from "styled-components";
// import { useUserFirebase } from "../features/users/useUserFirebase.js";
import { useUserFirebase } from "../features/users/./hooks/useUserFirebase.js";
import Row from "./Row.jsx";

const FullPage = styled(Row)`
  height: 100vh;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUserFirebase();

  //  2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage type="horizontal-center">
        <SpinnerFullPage />
      </FullPage>
    );

  // 4. If there IS a user render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
