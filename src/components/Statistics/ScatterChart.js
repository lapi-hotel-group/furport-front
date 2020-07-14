import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Scatter,
  ScatterChart,
} from "recharts";
import { useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

export default function MyScatterChart(props) {
  const theme = useTheme();
  const { t } = useTranslation();

  let data = {};
  data = props.events.map((event) => ({
    date: new Date(event.start_datetime).getTime(),
    attendees: event.attendees,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="date"
          name={t("開催日時")}
          domain={["dataMin", "dataMax"]}
          tickFormatter={(tickItem) => new Date(tickItem).toLocaleDateString()}
        />
        <YAxis
          type="number"
          dataKey="attendees"
          name={t("参加者数")}
          unit={t("人")}
          scale="log"
          domain={["dataMin", "dataMax"]}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value) =>
            value > 100000 ? new Date(value).toLocaleDateString() : value
          }
          itemStyle={{
            color: theme.palette.text.primary,
          }}
          contentStyle={{
            backgroundColor: theme.palette.background.default,
          }}
        />
        <Legend />
        <Scatter
          name={t("オープン")}
          data={data}
          fill={theme.palette.primary.main}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
