'use client';

import React, { createContext, useContext, useState } from 'react';

interface EmailSubmissionContextType {
  hasSubmittedEmail: boolean;
  setHasSubmittedEmail: (value: boolean) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
}

const EmailSubmissionContext = createContext<EmailSubmissionContextType | undefined>(undefined);

export function EmailSubmissionProvider({ children }: { children: React.ReactNode }) {
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hasSubmittedEmail') === 'true';
    }
    return false;
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userEmail');
    }
    return null;
  });

  // Update localStorage when state changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSubmittedEmail', hasSubmittedEmail.toString());
    }
  }, [hasSubmittedEmail]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
      } else {
        localStorage.removeItem('userEmail');
      }
    }
  }, [userEmail]);

  return (
    <EmailSubmissionContext.Provider
      value={{
        hasSubmittedEmail,
        setHasSubmittedEmail,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </EmailSubmissionContext.Provider>
  );
}

export function useEmailSubmission() {
  const context = useContext(EmailSubmissionContext);
  if (context === undefined) {
    throw new Error('useEmailSubmission must be used within an EmailSubmissionProvider');
  }
  return context;
}