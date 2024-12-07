import { createContext, useState, useContext } from "react";

const DeletedPostContext = createContext();

export const DeletedPostProvider = ({ children }) => {
  const [deletedPostId, setDeletedPostId] = useState(null);
  const markPostAsDeleted = (id) => setDeletedPostId(id);

  return (
    <DeletedPostContext.Provider value={{ deletedPostId, markPostAsDeleted }}>
      {children}
    </DeletedPostContext.Provider>
  );
};

export const useDeletedPost = () => useContext(DeletedPostContext);
