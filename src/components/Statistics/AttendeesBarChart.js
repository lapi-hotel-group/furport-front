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
} from "recharts";
import { useTheme } from "@material-ui/core/styles";

export default function AttendeesBarChart(props) {
  const theme = useTheme();
  const data = [
    { name: "[1, 10)", count: 0 },
    { name: "[10, 20)", count: 0 },
    { name: "[20, 50)", count: 0 },
    { name: "[50, 100)", count: 0 },
    { name: "[100, 200)", count: 0 },
    { name: "[200, 500)", count: 0 },
    { name: "[500, 1000)", count: 0 },
    { name: "[1000, 2000)", count: 0 },
    { name: "[2000, 5000)", count: 0 },
    { name: "[5000, 10000)", count: 0 },
    { name: "[10000, ∞)", count: 0 },
  ];

  props.events
    .filter((event) =>
      props.attends
        .map((el) => el === event.id)
        .reduce((prev, current) => prev + current)
    )
    .forEach((event) => {
      if (0 < event.attendees && event.attendees < 10) {
        data[0].count++;
      } else if (event.attendees < 20) {
        data[1].count++;
      } else if (event.attendees < 50) {
        data[2].count++;
      } else if (event.attendees < 100) {
        data[3].count++;
      } else if (event.attendees < 200) {
        data[4].count++;
      } else if (event.attendees < 500) {
        data[5].count++;
      } else if (event.attendees < 1000) {
        data[6].count++;
      } else if (event.attendees < 2000) {
        data[7].count++;
      } else if (event.attendees < 5000) {
        data[8].count++;
      } else if (event.attendees < 10000) {
        data[9].count++;
      } else {
        data[10].count++;
      }
    });
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
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}
