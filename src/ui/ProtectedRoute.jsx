import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SpinnerFullPage from "./loaders/SpinnerFullPage.jsx";
import styled from "styled-components";
import { useUserFirebase } from "../features/users/useUserFirebase.js";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
      <FullPage>
        <SpinnerFullPage />
      </FullPage>
    );

  // 4. If there IS a user render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
