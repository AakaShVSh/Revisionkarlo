import { useEffect } from "react";

const AdsterraBanner = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://pl28695422.effectivegatecpm.com/7debf4bf85e30dcbfcfb1ce228e9ebbb/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document
      .getElementById("container-7debf4bf85e30dcbfcfb1ce228e9ebbb")
      .appendChild(script);
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "25px 0" }}>
      <div id="container-7debf4bf85e30dcbfcfb1ce228e9ebbb"></div>
    </div>
  );
};

export default AdsterraBanner;
