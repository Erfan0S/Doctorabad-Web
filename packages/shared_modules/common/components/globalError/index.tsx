"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>مشکلی در پردازش سایت پیش آمده</h2>
      <button
        style={{
          background: "#f54f1a",
          borderRadius: "10px",
          lineHeight: "40px",
          padding: "0 15px",
          border: "unset",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => window.location.reload()}
      >
        بارگذاری مجدد سایت
      </button>
    </div>
  );
}
