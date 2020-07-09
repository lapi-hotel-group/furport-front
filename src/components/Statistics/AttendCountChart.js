import React from "react";
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
      .map((event) => new Date(event.start_datetime));
    const mostOld = filterdEvents.reduce((a, b) =>
      a.getTime() < b.getTime() ? a : b
    );
    const mostOldYear = mostOld.getFullYear();
    const mostOldMonth = mostOld.getMonth() + 1;
    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth() + 1;
    for (let y = mostOldYear, m = mostOldMonth; y <= nowYear; y++) {
      for (; m <= 12 && (y < nowYear || m <= nowMonth); m++) {
        data.push({
          name: y + "-" + m,
          count: filterdEvents.filter(
            // eslint-disable-next-line
            (el) => el.getFullYear() === y && el.getMonth() + 1 === m
          ).length,
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
          left: 20,
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
        <Legend
          verticalAlign="top"
          wrapperStyle={{
            lineHeight: "40px",
          }}
        />
        <ReferenceLine y={0} />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
        <Bar dataKey="count" name="参加数" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
