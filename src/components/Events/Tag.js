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
      {props.generalTags.map((tag) => (
        <Chip
          clickable
          key={tag.id}
          size="small"
          label={tag.name}
          color="secondary"
          className={classes.chip}
          onClick={() => {
            if (props.generalTagsQuery.find((el) => el === tag.name)) {
              props.setGeneralTagsQuery(
                props.generalTagsQuery.filter((el) => el !== tag.name)
              );
            } else {
              props.setGeneralTagsQuery([...props.generalTagsQuery, tag.name]);
            }
          }}
        />
      ))}
    </div>
  );
};

export default Tag;
