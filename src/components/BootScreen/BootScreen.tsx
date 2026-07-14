import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { useBoot } from "../../context/BootContext";
import {
  getGreeting,
  getGreetingByLanguage,
  generateGreetingSequence,
} from "../../lib/getGreeting";

const GREETINGS = [
  "Hello",
  "नमस्ते",
  "السلام عليكم",
  "Bonjour",
  "Hola",
  "こんにちは",
  "你好",
  "안녕하세요",
  "Ciao",
  "Hallo",
  "Olá",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  "કેમ છો?",
  "Welcome.",
];

const LOG_ENTRIES = [
  "Initializing Desktop Environment...",
  "Loading Portfolio Engine...",
  "Loading Components...",
  "Mounting Projects...",
  "Connecting Experience Database...",
  "Loading Skills...",
  "Restoring Previous Session...",
  "System Ready.",
];

// Handles granular timing for each individual greeting
const GreetingItem: React.FC<{
  text: string;
  onComplete: () => void;
  isLast: boolean;
}> = ({ text, onComplete, isLast }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setVisible(true);

    const holdTime = isLast ? 1300 : 450; // Hold duration: ~450ms, or ~1.3s for Welcome.
    const fadeInTime = 450; // 450ms fade-in
    const fadeOutTime = 300; // 300ms fade-out

    const fadeOutTimer = setTimeout(() => {
      setVisible(false);
    }, fadeInTime + holdTime);

    const completeTimer = setTimeout(
      () => {
        onComplete();
      },
      fadeInTime + holdTime + fadeOutTime,
    );

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [text, onComplete, isLast]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 1.02 }}
      transition={{
        duration: visible ? 0.45 : 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-center px-4"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      {text}
    </motion.div>
  );
};

export const BootScreen: React.FC = () => {
  const { bootStatus, skipBoot, startRevealPhase } = useBoot();
  const [internalStage, setInternalStage] = useState<
    "black" | "greetings" | "terminal" | "progress"
  >("black");

  // Greeting State
  const [greetings, setGreetings] = useState<string[]>(GREETINGS);
  const [greetingIndex, setGreetingIndex] = useState(0);

  // Terminal State
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [completedLogs, setCompletedLogs] = useState<string[]>([]);

  // Progress State
  const [progress, setProgress] = useState(0);
  const [launchingDesktopVisible, setLaunchingDesktopVisible] = useState(false);

  // Fetch geolocation and cache the greeting sequence
  useEffect(() => {
    const cached = sessionStorage.getItem("portfolio_cached_greeting");
    console.log("[Boot Geolocation Debug] Checking cache:", { sessionStorageCachedGreeting: cached });
    if (cached) {
      console.log("[Boot Geolocation Debug] Cache hit! Using cached greeting:", cached);
      setGreetings(generateGreetingSequence(cached, GREETINGS));
      return;
    }

    let resolved = false;

    const fallbackToBrowserLanguage = (reason: string) => {
      if (resolved) return;
      resolved = true;
      const fallback = getGreetingByLanguage(navigator.language || "");
      console.log(`[Boot Geolocation Debug] Falling back via: ${reason}. Selected greeting: "${fallback}" (Browser locale: ${navigator.language})`);
      sessionStorage.setItem("portfolio_cached_greeting", fallback);
      setGreetings(generateGreetingSequence(fallback, GREETINGS));
    };

    // Fallback if lookup takes longer than 1500ms (buffer for slower edge round-trips)
    const timeoutId = setTimeout(() => {
      fallbackToBrowserLanguage("Timeout (1500ms exceeded)");
    }, 1500);

    console.log("[Boot Geolocation Debug] Starting Vercel Geolocation fetch request...");

    fetch("/api/geolocation")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (resolved) {
          console.log("[Boot Geolocation Debug] API completed late (timeout had fired). Data returned:", data);
          return;
        }
        clearTimeout(timeoutId);
        resolved = true;

        const greeting = getGreeting(data.country, data.region);
        const finalGreeting = greeting || getGreetingByLanguage(navigator.language || "");

        console.log("[Boot Geolocation Debug] Lookup completed successfully:", {
          environment: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "Localhost" : "Vercel Deployment",
          detectedCountry: data.country || "(not detected)",
          detectedRegion: data.region || "(not detected)",
          detectedCity: data.city || "(not detected)",
          mappedGreetingByLocation: greeting || "(none)",
          finalSelectedGreeting: finalGreeting,
          methodUsed: greeting ? "Vercel Geolocation" : "Browser Language Locale fallback"
        });

        sessionStorage.setItem("portfolio_cached_greeting", finalGreeting);
        setGreetings(generateGreetingSequence(finalGreeting, GREETINGS));
      })
      .catch((err) => {
        console.warn("[Boot Geolocation Debug] Geolocation API call failed:", err);
        fallbackToBrowserLanguage("API/Network Error");
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // 1. Skip handlers (Keys, Clicks)
  useEffect(() => {
    if (bootStatus !== "booting") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        skipBoot();
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      // Don't skip if clicking the "Skip" button
      if ((e.target as HTMLElement).closest(".skip-btn")) {
        return;
      }
      skipBoot();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [bootStatus, skipBoot]);

  // 2. Black Screen Timer (0.8 seconds)
  useEffect(() => {
    if (internalStage === "black") {
      const timer = setTimeout(() => {
        setInternalStage("greetings");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [internalStage]);

  // 3. Greetings handler
  const handleGreetingComplete = () => {
    const isLastGreeting = greetingIndex === greetings.length - 1;
    if (isLastGreeting) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setInternalStage("progress");
      } else {
        setInternalStage("terminal");
      }
    } else {
      setTimeout(() => {
        setGreetingIndex((prev) => prev + 1);
      }, 100); // Small delay between greetings
    }
  };

  // 4. Monospace Terminal Typewriter Effect (Slower with realistic line pauses)
  useEffect(() => {
    if (internalStage !== "terminal") return;

    if (activeLogIndex >= LOG_ENTRIES.length) {
      const timer = setTimeout(() => {
        setInternalStage("progress");
      }, 800); // Pause for 800ms after System Ready
      return () => clearTimeout(timer);
    }

    const currentFullText = LOG_ENTRIES[activeLogIndex];
    let currentCharIndex = 0;
    setTypedText("");

    const interval = setInterval(() => {
      if (currentCharIndex < currentFullText.length) {
        setTypedText(currentFullText.slice(0, currentCharIndex + 1));
        currentCharIndex++;
      } else {
        clearInterval(interval);
        // Completed line, add checkmark and move to next
        setCompletedLogs((prev) => [...prev, currentFullText]);
        setTypedText("");

        const nextTimer = setTimeout(() => {
          setActiveLogIndex((prev) => prev + 1);
        }, 250); // Pause briefly (250ms) before typing next line

        return () => clearTimeout(nextTimer);
      }
    }, 20); // Slower typewriter character speed (20ms)

    return () => clearInterval(interval);
  }, [internalStage, activeLogIndex]);

  // 5. Progress Bar Animate with Easing (easeOut)
  useEffect(() => {
    if (internalStage !== "progress") return;

    const controls = animate(0, 100, {
      duration: 1.8, // Moves smoothly over 1.8s
      ease: "easeOut", // Fast start, slow end
      onUpdate: (value) => {
        setProgress(Math.round(value));
      },
      onComplete: () => {
        setLaunchingDesktopVisible(true);

        const timer = setTimeout(() => {
          startRevealPhase();
        }, 700); // Pause briefly at 100% (700ms) before transitioning
        return () => clearTimeout(timer);
      },
    });

    return () => controls.stop();
  }, [internalStage, startRevealPhase]);

  if (bootStatus !== "booting") return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none font-sans overflow-hidden ${internalStage === "black" ? "boot-cursor-none" : ""}`}>
      {/* Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          skipBoot();
        }}
        className="skip-btn absolute top-6 right-6 px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl text-white/70 hover:text-white text-sm font-medium tracking-wide transition-all cursor-pointer z-[10000] backdrop-blur-md"
        style={{ padding: "5px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        Skip
      </button>

      {/* Greetings Animation */}
      {internalStage === "greetings" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <GreetingItem
            text={greetings[greetingIndex]}
            onComplete={handleGreetingComplete}
            isLast={greetingIndex === greetings.length - 1}
          />
        </div>
      )}

      {/* Terminal and Progress Section */}
      {(internalStage === "terminal" || internalStage === "progress") && (
        <div className="w-full max-w-xl px-6 flex flex-col font-mono text-xs md:text-sm text-zinc-400 select-text cursor-default">
          <div className="min-h-[180px] md:min-h-[220px] flex flex-col gap-1.5 justify-end py-4">
            {completedLogs.map((log, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center whitespace-nowrap"
              >
                <span style={{ fontFamily: '"Fira Code", monospace' }}>
                  {log}
                </span>
                <span className="text-emerald-500 font-bold ml-4">✓</span>
              </div>
            ))}
            {typedText && (
              <div className="flex justify-between items-center whitespace-nowrap">
                <span style={{ fontFamily: '"Fira Code", monospace' }}>
                  {typedText}
                </span>
                <span className="animate-pulse font-bold">_</span>
              </div>
            )}
          </div>

          {/* Thin Progress Bar Container */}
          {internalStage === "progress" && (
            <div className="mt-8 w-full flex flex-col gap-3">
              <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="h-6 flex justify-center">
                <AnimatePresence>
                  {launchingDesktopVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-zinc-500 font-sans text-xs tracking-wider"
                    >
                      Launching Desktop...
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BootScreen;
