import { useCallback, useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("IM A MODAL");

  const handleModal = useCallback((content = false) => {
    if (content) {
      setModalContent(content);
      setModal(true);
      return;
    }

    setModal(false);
  }, []);

  return { modal, modalContent, handleModal };
};
