import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const TagDetail = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      {props.organizationTags.length ? (
        <div>
          <Typography>Organization</Typography>
          {props.organizationTags.map((tag) => (
            <Chip
              key={tag.id}
              size="small"
              label={tag.name}
              className={classes.chip}
              color=""
            />
          ))}
        </div>
      ) : null}
      {props.characterTags.length ? (
        <div>
          <Typography>Character</Typography>
          {props.characterTags.map((tag) => (
            <Chip
              key={tag.id}
              size="small"
              label={tag.name}
              className={classes.chip}
              color="primary"
            />
          ))}
        </div>
      ) : null}
      {props.generalTags.length ? (
        <div>
          <Typography>General</Typography>
          {props.generalTags.map((tag) => (
            <Chip
              key={tag.id}
              size="small"
              label={tag.name}
              className={classes.chip}
              color="secondary"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TagDetail;
