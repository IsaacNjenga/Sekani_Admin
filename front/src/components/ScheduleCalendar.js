// src/components/ScheduleCalendar.jsx
import React, { useMemo } from "react";
import { Calendar, Badge,  } from "antd";

/**
 * Helpers
 */
const toISODate = (item) => {
  // Normalize date to YYYY-MM-DD (assumes item.date is YYYY-MM-DD)
  // If your date format differs you can adapt parsing here.
  return item.date;
};

function ScheduleCalendar({ scheduleData = [], viewScheduleDetails }) {
  // map date string => array of items
  const eventsByDate = useMemo(() => {
    const map = {};
    (scheduleData || []).forEach((item) => {
      const key = toISODate(item);
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }, [scheduleData]);

  // render small list of badges inside each date
  const dateCellRender = (value) => {
    // value is moment/dayjs/date object — convert to YYYY-MM-DD
    const y = value.year();
    const m = String(value.month() + 1).padStart(2, "0"); // month() zero-based
    const d = String(value.date()).padStart(2, "0");
    const key = `${y}-${m}-${d}`;

    const list = eventsByDate[key] || [];
    if (list.length === 0) return null;

    // show up to 3 badges, then "+N"
    const visible = list.slice(0, 3);

    return (
      <div style={{ padding: 6 }}>
        {visible.map((ev, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 4,
              cursor: "pointer",
            }}
            onClick={(e) => {
              // prevent parent selection handler override
              e.stopPropagation();
              viewScheduleDetails({ date: key, items: [ev] });
            }}
            title={`${ev.time} — ${ev.name}`}
          >
            <Badge status="processing" />
            <span style={{ fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {ev.time} • {ev.name}
            </span>
          </div>
        ))}

        {list.length > 3 && (
          <div
            onClick={() => viewScheduleDetails({ date: key, items: list })}
            style={{ fontSize: 12, color: "#1890ff", cursor: "pointer" }}
          >
            +{list.length - 3} more
          </div>
        )}
      </div>
    );
  };

  // clicking a date opens modal with that date's items
  const onSelect = (value) => {
    const y = value.year();
    const m = String(value.month() + 1).padStart(2, "0");
    const d = String(value.date()).padStart(2, "0");
    const key = `${y}-${m}-${d}`;
    const list = eventsByDate[key] || [];
    viewScheduleDetails({ date: key, items: list });
  };

  return <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />;
}

export default ScheduleCalendar;
