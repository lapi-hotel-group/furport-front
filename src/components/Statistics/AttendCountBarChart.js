import React from "react";
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Brush,
} from "recharts";
import { useTheme } from "@material-ui/core/styles";

export default function AttendCountChart(props) {
  const theme = useTheme();
  const data = [];
  if (props.attends.length) {
    const filterdEvents = props.events
      .filter((event) =>
        props.attends
          .map((el) => el === event.id)
          .reduce((prev, current) => prev + current)
      )
      .map((event) => ({
        date: new Date(event.start_datetime),
        days: Math.max(
          Math.ceil(
            (new Date(event.end_datetime) - new Date(event.start_datetime)) /
              86400000
          ),
          1
        ),
      }));
    const mostOld = filterdEvents.reduce((a, b) =>
      a.date.getTime() < b.date.getTime() ? a : b
    );
    const mostOldYear = mostOld.date.getFullYear();
    const mostOldMonth = mostOld.date.getMonth() + 1;
    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth() + 1;
    for (let y = mostOldYear, m = mostOldMonth; y <= nowYear; y++) {
      for (; m <= 12 && (y < nowYear || m <= nowMonth); m++) {
        data.push({
          name: y + "-" + m,
          count: filterdEvents.filter(
            // eslint-disable-next-line
            (el) => el.date.getFullYear() === y && el.date.getMonth() + 1 === m
          ).length,
          count_days: filterdEvents
            .filter(
              // eslint-disable-next-line
              (el) =>
                el.date.getFullYear() === y && el.date.getMonth() + 1 === m
            )
            .map((el) => el.days)
            .reduce((a, b) => a + b, 0),
        });
      }
      m = 1;
    }
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.default,
          }}
        />
        <ReferenceLine y={0} />
        <Bar
          dataKey="count"
          name="参加回数"
          fill={theme.palette.primary.main}
        />
        <Bar
          dataKey="count_days"
          name="参加日数"
          fill={theme.palette.success.main}
        />
        <Brush
          fill={theme.palette.background.default}
          stroke={theme.palette.primary.main}
        />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}
