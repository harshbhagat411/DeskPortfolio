import React, { useMemo } from "react";
import { motion, useDragControls } from "framer-motion";
import { cn } from "../../lib/utils";
import GlassCard from "../ui/GlassCard";

const CalendarWidget: React.FC = () => {
  const dragControls = useDragControls();

  const handleDragStart = (e: React.PointerEvent) => {
    dragControls.start(e);
  };

  const today = useMemo(() => new Date(), []);
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  // Memoize days calculation to avoid unnecessary re-renders
  const calendarCells = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    const cells: (number | null)[] = [];

    // Add empty padding cells for starting week offset
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }

    return cells;
  }, [currentYear, currentMonth]);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      className="absolute top-24 right-6 z-30 select-none"
      style={{ touchAction: "none" }}
    >
      <GlassCard
        aspectSquare={false}
        hoverType="default"
        className="w-[240px] rounded-[20px] pt-[20px] pl-[16px] pr-[16px] pb-[16px]"
      >
        <div className="w-full flex flex-col" style={{ padding: "15px" }}>
          {/* Centered Top Handle Capsule (Dragger) */}
          <div
            className="w-full pb-2.5 mb-4 border-b border-zinc-200/50 dark:border-zinc-100/25 flex justify-center"
            style={{ paddingBottom: "5px" }}
          >
            <div
              onPointerDown={handleDragStart}
              className="w-10 h-1 bg-zinc-400/60 dark:bg-zinc-600/50 rounded-full cursor-grab active:cursor-grabbing hover:bg-zinc-500 dark:hover:bg-zinc-400 transition-colors"
              style={{ marginBottom: "5px" }}
            />
          </div>

          {/* Header */}
          <div
            className="flex justify-between items-center mb-4 px-1"
            style={{ paddingBottom: "15px", paddingTop: "15 px" }}
          >
            <span className="text-[15px] font-bold font-sans tracking-[-0.03em] leading-none text-[var(--theme-text-main)]">
              {monthNames[currentMonth]}
            </span>
            <span className="text-[15px] font-medium font-sans text-[var(--theme-text-muted)]">
              {currentYear}
            </span>
          </div>

          {/* Weekday Row */}
          <div className="grid grid-cols-7 text-center mb-[12px]">
            {weekdayLabels.map((label, i) => (
              <span
                key={i}
                className="text-[12px] font-medium font-sans text-[var(--theme-text-muted)] tracking-wider"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-x-[4px] gap-y-[8px] text-center text-[14px] font-sans font-medium">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return (
                  <div key={`empty-${idx}`} className="aspect-square w-full" />
                );
              }

              const isToday = day === currentDay;

              return (
                <div
                  key={`day-${day}`}
                  className="flex items-center justify-center aspect-square w-full"
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-[30px] h-[30px] rounded-[10px] transition-all duration-200",
                      isToday
                      ? "border-[1.5px] border-[var(--theme-accent)] bg-[var(--theme-accent-muted)] text-[var(--theme-accent)] font-semibold"
                      : "text-[var(--theme-text-main)]",
                    )}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default CalendarWidget;
