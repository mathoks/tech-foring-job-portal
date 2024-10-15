import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";

const Tags = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    switch (pathname) {
      case "/views":
        SEO({
          title: "welcome to tecforing",
          metaDescription: "this is the jobs page",
        });
        break;
      case "/auth/signup":
        SEO({ title: "Sign up", metaDescription: "become a member" });
        break;
      case "/auth/signin":
        SEO({
          title: "Sign in",
          metaDescription: "gain access to more functionality",
        });
        break;
      default:
        break;
    }
  }, [pathname]);
};

export default Tags;
