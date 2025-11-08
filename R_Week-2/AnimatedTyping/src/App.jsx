import React from "react";
import AnimatedBanner from "./AnimatedBanner";

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #e3f2fd, #fff)",
      }}
    >
      <AnimatedBanner
        texts={["Create.", "Learn.", "Grow."]}
        typingSpeed={100}
        erasingSpeed={60}
        delayBeforeErase={1000}
        delayBeforeNext={600}
        loop={true}
      />
    </div>
  );
};

export default App;
