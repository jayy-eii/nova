export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      <div className="absolute inset-0 bg-mesh-1" />

      {/* Floating gradient orb — top right */}
      <div
        className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(110,86,248,0.55), rgba(110,86,248,0) 70%)",
        }}
      />
      {/* Floating gradient orb — bottom left */}
      <div
        className="absolute bottom-[-10%] left-[-8%] h-[380px] w-[380px] rounded-full opacity-25 blur-3xl animate-float-slower"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(31,224,194,0.45), rgba(31,224,194,0) 70%)",
        }}
      />

      {/* Faint grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035]" aria-hidden="true">
        <defs>
          <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#ffffff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Suspended 3D-ish shard, decorative only */}
      <div className="hidden lg:block absolute top-[18%] right-[8%] animate-float-slow">
        <div
          className="h-24 w-24 rounded-2xl border border-white/10"
          style={{
            background: "linear-gradient(135deg, rgba(110,86,248,0.18), rgba(255,255,255,0.02))",
            transform: "rotate(18deg)",
            boxShadow: "0 30px 60px -20px rgba(110,86,248,0.35)",
          }}
        />
      </div>
      <div className="hidden lg:block absolute bottom-[14%] right-[22%] animate-float-slower">
        <div
          className="h-14 w-14 rounded-xl border border-white/10"
          style={{
            background: "linear-gradient(135deg, rgba(31,224,194,0.16), rgba(255,255,255,0.02))",
            transform: "rotate(-12deg)",
            boxShadow: "0 20px 40px -15px rgba(31,224,194,0.3)",
          }}
        />
      </div>
    </div>
  );
}
