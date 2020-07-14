import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props) {
  const { pathname } = useLocation();

  useEffect(() => {
    const except = /^\/events/;
    if (!except.test(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return props.children;
}
