import { createContext, PropsWithChildren, useContext, useState } from "react";

interface RecruiterModeType {
  isRecruiterMode: boolean;
  toggle: () => void;
}

const RecruiterModeContext = createContext<RecruiterModeType>({
  isRecruiterMode: false,
  toggle: () => {},
});

export const RecruiterModeProvider = ({ children }: PropsWithChildren) => {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  const toggle = () => {
    setIsRecruiterMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("recruiter-mode");
      } else {
        document.body.classList.remove("recruiter-mode");
      }
      return next;
    });
  };

  return (
    <RecruiterModeContext.Provider value={{ isRecruiterMode, toggle }}>
      {children}
    </RecruiterModeContext.Provider>
  );
};

export const useRecruiterMode = () => useContext(RecruiterModeContext);
