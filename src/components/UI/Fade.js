import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fadeInSection: {
    opacity: 0,
    transform: "translateY(20vh)",
    visibility: "hidden",
    transition: "opacity 0.6s ease-out, transform 1.2s ease-out",
    willChange: "opacity, visibility",
  },
  show: {
    opacity: "1",
    transform: "none",
    visibility: "visible",
  },
}));

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const classes = useStyles();

  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    });
    observer.observe(domRef.current);
    const c = domRef.current;
    return () => observer.unobserve(c);
  }, []);
  return (
    <div
      className={
        isVisible
          ? [classes.fadeInSection, classes.show].join(" ")
          : classes.fadeInSection
      }
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default FadeInSection;
