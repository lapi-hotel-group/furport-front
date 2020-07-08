import React, { useState, useEffect } from "react";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Tag = (props) => {
  const classes = useStyles();

  const [tags, setTags] = useState([]);
  const [tagGroups, setTagGroups] = useState([]);

  useEffect(() => {
    const url = "/tags/";
    axios
      .get(url)
      .then((response) => {
        setTags(response.data.results);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    const url = "/tag_groups/";
    axios
      .get(url)
      .then((response) => {
        setTagGroups(response.data.results);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={classes.search}>
      {tagGroups.map((tagGroup) => (
        <div key={tagGroup.id}>
          <Typography>{tagGroup.name}</Typography>
          {tags
            .filter((tag) => props.tags.find((el) => el === tag.url))
            .filter((tag) => tag.group === tagGroup.url)
            .map((tag) => (
              <Chip
                key={tag.id}
                size="small"
                label={tag.name}
                color={tagGroup.color}
                className={classes.chip}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default Tag;
