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

const TagDetail = (props) => {
  const classes = useStyles();

  const [generalTags, setGeneralTags] = useState([]);
  const [organizationTags, setOrganizationTags] = useState([]);
  const [characterTags, setCharacterTags] = useState([]);

  useEffect(() => {
    const url = "/general_tags/";
    axios
      .get(url)
      .then((response) => {
        setGeneralTags(response.data.results);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    const url = "/organization_tags/";
    axios
      .get(url)
      .then((response) => {
        setOrganizationTags(response.data.results);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    const url = "/character_tags/";
    axios
      .get(url)
      .then((response) => {
        setCharacterTags(response.data.results);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={classes.search}>
      {props.organization_tags.length ? (
        <div>
          <Typography>Organization</Typography>
          {organizationTags
            .filter((tag) =>
              props.organization_tags.find((el) => el === tag.url)
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
      {props.character_tags.length ? (
        <div>
          <Typography>Character</Typography>
          {characterTags
            .filter((tag) => props.character_tags.find((el) => el === tag.url))
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
      {props.general_tags.length ? (
        <div>
          <Typography>General</Typography>
          {generalTags
            .filter((tag) => props.general_tags.find((el) => el === tag.url))
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
