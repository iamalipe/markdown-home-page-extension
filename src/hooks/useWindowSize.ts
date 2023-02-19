import { useEffect, useState } from "react";

export default function useWindowSize() {
  // Declare a state variable for window width
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Use effect hook to listen to window resize event
  useEffect(() => {
    // Define a function that updates the state with the new window width
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize event
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures effect is only run on mount and unmount

  return size;
}
