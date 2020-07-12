import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    maxWidth: "700px",
  },
  cardContent: {
    paddingBottom: "0",
  },
  iconText: {
    display: "inline-flex",
    verticalAlign: "middle",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  stars: {
    display: "inline-flex",
    padding: "0 !important",
  },
  grid: {
    padding: 0,
  },
}));

const Chart = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const data = [
    { name: 2016, count: 18, count_days: 5 },
    { name: 2017, count: 15, count_days: 10 },
    { name: 2018, count: 8, count_days: 13 },
    { name: 2019, count: 19, count_days: 30 },
    { name: 2020, count: 23, count_days: 25 },
  ];

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
              {t("分析する")}
            </Typography>
            <Typography>
              {t("登録情報から傾向を分析。次のイベントの参考にしましょう。")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
                  name="参加数 A"
                  dataKey="count"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  name="参加数 B"
                  dataKey="count_days"
                  stroke={theme.palette.success.main}
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Chart;
