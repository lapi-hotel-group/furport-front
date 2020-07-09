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
      {props.organizationTagsNow.length ? (
        <div>
          <Typography>Organization</Typography>
          {props.organizationTags
            .filter((tag) =>
              props.organizationTagsNow.find((el) => el === tag.url)
            )
            .map((tag) => (
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
      {props.characterTagsNow.length ? (
        <div>
          <Typography>Character</Typography>
          {props.characterTags
            .filter((tag) =>
              props.characterTagsNow.find((el) => el === tag.url)
            )
            .map((tag) => (
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
      {props.generalTagsNow.length ? (
        <div>
          <Typography>General</Typography>
          {props.generalTags
            .filter((tag) => props.generalTagsNow.find((el) => el === tag.url))
            .map((tag) => (
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
