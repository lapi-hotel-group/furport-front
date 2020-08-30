import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import csc from "../../utils/csc";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function AreaPieChart(props) {
  const { t } = useTranslation();
  const theme = useTheme();

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.secondary.main,
  ];

  const data = [];
  let filterdEventsArea;
  if (props.variant === "country") {
    filterdEventsArea = props.events.map((event) =>
      t(csc.getCountryById(event.country.toString()).name)
    );
  } else if (props.variant === "attendees") {
    filterdEventsArea = props.events.map((event) =>
      event.attendees < 10
        ? "[0, 10)"
        : event.attendees < 20
        ? "[10, 20)"
        : event.attendees < 50
        ? "[20, 50)"
        : event.attendees < 100
        ? "[50, 100)"
        : event.attendees < 200
        ? "[100, 200)"
        : event.attendees < 500
        ? "[200, 500)"
        : event.attendees < 1000
        ? "[500, 1000)"
        : event.attendees < 2000
        ? "[1000, 2000)"
        : event.attendees < 5000
        ? "[2000, 5000)"
        : event.attendees < 10000
        ? "[1000, 10000)"
        : "[10000, ∞)"
    );
  } else if (props.variant === "openness") {
    filterdEventsArea = props.events.map((event) =>
      event.openness === 0
        ? t("common:enum.openness.open")
        : event.openness === 1
        ? t("common:enum.openness.friend_only")
        : t("common:enum.openness.private")
    );
  } else {
    filterdEventsArea = props.events.map((event) =>
      t(csc.getStateById(event.state.toString()).name)
    );
  }

  for (const area of filterdEventsArea) {
    const index = data.findIndex((el) => el.name === area);
    if (index !== -1) {
      data[index].count++;
    } else {
      data.push({ name: area, count: 1 });
    }
  }

  data.sort((a, b) => b.count - a.count);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Legend iconType="circle" />
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="count"
          legendType="line"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[Math.min(index, COLORS.length - 1)]}
            />
          ))}
        </Pie>
        <Tooltip
          itemStyle={{
            color: theme.palette.text.primary,
          }}
          contentStyle={{
            backgroundColor: theme.palette.background.default,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
