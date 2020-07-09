import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Tag = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      {props.generalTags
        .filter((tag) => props.tags.find((el) => el === tag.url))
        .map((tag) => (
          <Chip
            key={tag.id}
            size="small"
            label={tag.name}
            color="secondary"
            className={classes.chip}
          />
        ))}
    </div>
  );
};

export default Tag;
