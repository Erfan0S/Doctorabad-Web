"use client";

import { useEffect } from "react";

export default function RuntimeErrorWatcher() {
  function isHookOrderError(message: string) {
    return (
      message.includes("Rendered fewer hooks than expected") ||
      message.includes("Rendered more hooks than during the previous render") ||
      message.includes("React has detected a change in the order of Hooks")
    );
  }

  useEffect(() => {
    function handleError(event: ErrorEvent) {
      const message =
        event.error?.message || event.message || "Unknown runtime error";

      if (isHookOrderError(message)) {
        console.log("Hook order error detected");

        // Your custom action here
        // localStorage.setItem("last_runtime_error", message);

        // // Example: send to your API
        // navigator.sendBeacon(
        //   "/api/client-error",
        //   JSON.stringify({
        //     type: "HOOK_ORDER_ERROR",
        //     message,
        //     stack: event.error?.stack,
        //     url: window.location.href,
        //   }),
        // );

        // Optional: redirect
        // window.location.href = "/something-went-wrong";

        // Optional: reload
        window.location.reload();
      }
    }

    function handleUnhandledRejection(event: PromiseRejectionEvent) {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);

      if (message.includes("Rendered fewer hooks than expected")) {
        console.log("Hook order promise rejection detected");

        navigator.sendBeacon(
          "/api/client-error",
          JSON.stringify({
            type: "HOOK_ORDER_ERROR_PROMISE",
            message,
            url: window.location.href,
          }),
        );
      }
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  return null;
}
