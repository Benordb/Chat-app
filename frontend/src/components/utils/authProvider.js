"use client";

import { api } from "@/lib/axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
const AuthContext = createContext();

const authPaths = ["/login", "/register"];

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      Cookies.set("token", res.data.token, {
        expires: 1, //new Date(Date.now() + 5 * 1000)
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        path: "/", // Cookie is accessible across the entire site
        sameSite: "strict", // CSRF protection
      });
      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsReady(false);
        const token = Cookies.get("token");
        if (!token) return;
        const res = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        Cookies.remove("token");
        toast.error("Your session has expired. Please login again.");
      } finally {
        setIsReady(true);
      }
    };
    loadUser();
  }, []);
  useEffect(() => {
    if (authPaths.includes(pathname)) return;
    if (!isReady) return;
    if (!user) router.replace("/login");
  }, [pathname, user, isReady]);
  if (!isReady) return null;
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
