import { useEffect } from "react";

const RDStationScript = () => {
  useEffect(() => {
    const scriptId = "rdstation-loader";

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://d335luupugsy2.cloudfront.net/js/loader-scripts/561ffdb4-d4a4-488f-ac0d-90249101ca25-loader.js";

    document.body.appendChild(script);
  }, []);

  return null;
};

export default RDStationScript;