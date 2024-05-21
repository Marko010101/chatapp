import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/globalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import SpinnerFullPage from "./ui/SpinnerFullPage.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Reels from "./pages/Reels.jsx";
import Inbox from "./pages/Inbox.jsx";
import Profile from "./pages/Profile.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { SidebarShrinkProvider } from "./context/SidebarShrinkingContext.jsx";

function App() {
  return (
    <SidebarShrinkProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="reels" element={<Reels />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="profile/:user" element={<Profile />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SidebarShrinkProvider>
  );
}

export default App;
