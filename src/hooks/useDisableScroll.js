import { useEffect } from "react";

const useDisableScroll = (isModalOpen) => {
  useEffect(() => {
    if (isModalOpen) {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      window.onscroll = function () {
        window.scrollTo(0, scrollTop);
      };
      document.body.classList.add("modal-open");
    } else {
      // Enable scroll when modal is closed
      window.onscroll = null;
      document.body.classList.remove("modal-open");
    }

    return () => {
      window.onscroll = null;
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);
};

export default useDisableScroll;
