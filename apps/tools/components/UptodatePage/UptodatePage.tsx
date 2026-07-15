"use client";

export default function UpToDatePage() {
  // 🔴 نکته: آدرس زیر را با لینکی که دکترآباد به شما داده جایگزین کنید.
  // اگر لینک اصلی uptodate.com را بگذارید، احتمالا صفحه سفید می‌شود (مسدود می‌شود).
  const upToDateUrl = "https://doctorabad.com/app/uptodate"; 

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <iframe
        src={upToDateUrl}
        className="h-full w-full flex-1 border-none"
        title="UpToDate Tool"
        allow="clipboard-write" // برای اینکه کپی کردن متن داخلش کار کند
        loading="lazy"
      />
    </div>
  );
}
