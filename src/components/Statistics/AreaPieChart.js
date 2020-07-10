import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import csc from "country-state-city";
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
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.secondary.main,
  ];

  const data = [];
  if (props.attends.length) {
    let filterdEventsArea;
    if (props.variant === "country") {
      filterdEventsArea = props.events
        .filter((event) =>
          props.attends
            .map((el) => el === event.id)
            .reduce((prev, current) => prev + current)
        )
        .map((event) => t(csc.getCountryById(event.country.toString()).name));
    } else {
      filterdEventsArea = props.events
        .filter((event) =>
          props.attends
            .map((el) => el === event.id)
            .reduce((prev, current) => prev + current)
        )
        .map((event) => t(csc.getStateById(event.state.toString()).name));
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
  }

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
      </PieChart>
    </ResponsiveContainer>
  );
}
