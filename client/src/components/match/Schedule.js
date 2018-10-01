import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import dates from "./date";
import events from "./events";
import localizer from "react-big-calendar/lib/localizers/globalize";
import globalize from "globalize";

import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const globalizeLocalizer = localizer(globalize);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const Schedule = props => (
  <BigCalendar
    localizer={globalizeLocalizer}
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours")}
    defaultDate={new Date(2015, 3, 1)}
  />
);

export default Schedule;
