import { useState } from "react";
import { Card } from "antd";
import ScheduleTable from "../components/ScheduleTable";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleDetails from "../components/ScheduleDetails";
import useFetchAllSchedules from "../hooks/fetchAllSchedules";
import { CalendarOutlined, TableOutlined } from "@ant-design/icons";

const tabList = [
  {
    key: "tab1",
    tab: (
      <span style={{ fontFamily: "Raleway", fontSize: 18 }}>
        <TableOutlined /> Table View
      </span>
    ),
  },
  {
    key: "tab2",
    tab: (
      <span style={{ fontFamily: "Raleway", fontSize: 18 }}>
        <CalendarOutlined /> Calendar View
      </span>
    ),
  },
];

function Schedules() {
  const [activeTabKey1, setActiveTabKey1] = useState("tab2");
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { allSchedules, schedulesLoading, schedulesRefresh } =
    useFetchAllSchedules();

  const viewScheduleDetails = (payload) => {
    setLoading(true);
    setContent(payload);
    setOpenScheduleModal(true);
    setTimeout(() => setLoading(false), 120);
  };

  const onTab1Change = (key) => setActiveTabKey1(key);

  const contentList = {
    tab1: (
      <ScheduleTable
        viewScheduleDetails={(item) => viewScheduleDetails(item)}
      />
    ),
    tab2: (
      <ScheduleCalendar
        scheduleData={allSchedules}
        viewScheduleDetails={(payload) => viewScheduleDetails(payload)}
        schedulesLoading={schedulesLoading}
        schedulesRefresh={schedulesRefresh}
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
        schedulesRefresh={schedulesRefresh}
      />
    </div>
  );
}

export default Schedules;
