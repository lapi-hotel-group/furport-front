import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export default function AttendCountYearChart(props) {
  const theme = useTheme();
  const { t } = useTranslation();

  if (!props.events.length) {
    return (
      <Typography align="center">
        {t("common:messages.no-attended-events")}
      </Typography>
    );
  }

  const data = [];
  const filterdEvents = props.events.map((event) => ({
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
  const nowYear = new Date().getFullYear();
  for (let y = mostOldYear; y <= nowYear; y++) {
    data.push({
      name: y,
      count: filterdEvents.filter(
        // eslint-disable-next-line
        (el) => el.date.getFullYear() === y
      ).length,
      count_days: filterdEvents
        .filter(
          // eslint-disable-next-line
          (el) => el.date.getFullYear() === y
        )
        .map((el) => el.days)
        .reduce((a, b) => a + b, 0),
    });
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.success.main}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.success.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.default,
          }}
        />
        <Legend />
        <Area
          type="monotone"
          name="参加回数"
          dataKey="count"
          stroke={theme.palette.primary.main}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          name="参加日数"
          dataKey="count_days"
          stroke={theme.palette.success.main}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
