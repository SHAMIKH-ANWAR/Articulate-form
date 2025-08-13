import { useEffect, useState } from "react";
import { config } from "@/config";

export const ServerWarmupNotice = () => {
  const [warming, setWarming] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const poll = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/api/health`, {
          method: 'GET',
          signal: controller.signal,
        });
        if (!cancelled && res.ok) {
          setWarming(false);
          return;
        }
      } catch {}
      if (!cancelled) {
        setTimeout(poll, 2000);
      }
    };

    poll();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  if (!warming) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 text-center px-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        <div className="text-lg font-medium">Starting server…</div>
        <div className="text-sm text-muted-foreground max-w-sm">
          The backend is hosted on Render free tier. Cold starts can take some time. This message will disappear once the server is awake.
        </div>
      </div>
    </div>
  );
};


