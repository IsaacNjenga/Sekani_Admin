import React, { useState } from "react";
import { Card } from "antd";
import ScheduleTable from "../components/ScheduleTable";
import ScheduleCalendar from "../components/ScheduleCalendar";

const tabList = [
  {
    key: "tab1",
    tab: "Table View",
  },
  {
    key: "tab2",
    tab: "Calendar View",
  },
];

const contentList = {
  tab1: <ScheduleTable />,
  tab2: <ScheduleCalendar />,
};
function Schedules() {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
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
    </div>
  );
}

export default Schedules;
