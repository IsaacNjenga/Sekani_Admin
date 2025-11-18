import { useMemo } from "react";
import { Calendar, Badge } from "antd";

const toISODate = (item) => {
  return item.date;
};

function ScheduleCalendar({
  scheduleData = [],
  viewScheduleDetails,
  schedulesLoading,
  schedulesRefresh,
}) {
  const eventsByDate = useMemo(() => {
    const map = {};
    (scheduleData || []).forEach((item) => {
      const key = toISODate(item);
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }, [scheduleData]);

  const dateCellRender = (value) => {
    // value is moment/dayjs/date object — convert to YYYY-MM-DD
    const y = value.year();
    const m = String(value.month() + 1).padStart(2, "0");
    const d = String(value.date()).padStart(2, "0");
    const key = `${y}-${m}-${d}`;

    const list = eventsByDate[key] || [];
    if (list.length === 0) return null;

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
              e.stopPropagation();
              viewScheduleDetails({ date: key, items: [ev] });
            }}
            title={`${ev.time} — ${ev.name}`}
          >
            <Badge status="processing" />
            <span
              style={{
                fontSize: 12,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
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
