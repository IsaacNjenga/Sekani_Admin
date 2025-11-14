// src/pages/Schedules.jsx
import React, { useState } from "react";
import { Card } from "antd";
import ScheduleTable from "../components/ScheduleTable";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleDetails from "../components/ScheduleDetails";
import { scheduleData } from "../assets/data/data"; // your data

const tabList = [
  { key: "tab1", tab: "Table View" },
  { key: "tab2", tab: "Calendar View" },
];

function Schedules() {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewScheduleDetails = (payload) => {
    // payload can be a single item or { date: 'YYYY-MM-DD', items: [...] }
    setLoading(true);
    setContent(payload);
    setOpenScheduleModal(true);
    setTimeout(() => setLoading(false), 120);
  };

  const onTab1Change = (key) => setActiveTabKey1(key);

  const contentList = {
    tab1: (
      <ScheduleTable
        scheduleData={scheduleData}
        viewScheduleDetails={(item) => viewScheduleDetails(item)}
      />
    ),
    tab2: (
      <ScheduleCalendar
        scheduleData={scheduleData}
        viewScheduleDetails={(payload) => viewScheduleDetails(payload)}
      />
    ),
  };

  return (
    <div>
      <Card
        style={{ width: "100%" }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>

      <ScheduleDetails
        content={content}
        openScheduleModal={openScheduleModal}
        setOpenScheduleModal={setOpenScheduleModal}
        loading={loading}
      />
    </div>
  );
}

export default Schedules;
