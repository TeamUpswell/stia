"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, signIn, signOut } from "next-auth/react";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signIn: (
    provider: string,
    credentials?: Record<string, any>
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await fetch("/api/auth/session").then((res) =>
        res.json()
      );
      setSession(sessionData);
      setLoading(false);
    };

    fetchSession();
  }, []);

  const handleSignIn = async (
    provider: string,
    credentials?: Record<string, any>
  ) => {
    await signIn(provider, { ...credentials, redirect: false });
    const sessionData = await fetch("/api/auth/session").then((res) =>
      res.json()
    );
    setSession(sessionData);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, signIn: handleSignIn, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
