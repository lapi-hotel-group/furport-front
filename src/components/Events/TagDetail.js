import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const TagDetail = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <div className={classes.search}>
      {props.organizationTags.length ? (
        <div>
          <Typography>{t("glossary:words.organization-tag")}</Typography>
          {props.organizationTags.map((tag) => (
            <Chip
              key={tag.id}
              size="small"
              label={tag.name}
              className={classes.chip}
              style={{
                color: "white",
                backgroundColor: theme.palette.error.main,
              }}
              clickable={!props.dashboard}
              onClick={() => {
                if (props.dashboard) {
                  // Do Nothing
                } else if (
                  props.organizationTagsQuery.find((el) => el === tag.name)
                ) {
                  props.setOrganizationTagsQuery(
                    props.organizationTagsQuery.filter((el) => el !== tag.name)
                  );
                } else {
                  props.setOrganizationTagsQuery([
                    ...props.organizationTagsQuery,
                    tag.name,
                  ]);
                }
              }}
            />
          ))}
        </div>
      ) : null}
      {props.characterTags.length ? (
        <div>
          <Typography>{t("glossary:words.character-tag")}</Typography>
          {props.characterTags.map((tag) => (
            <Chip
              key={tag.id}
              size="small"
              label={tag.name}
              className={classes.chip}
              color="primary"
              style={{
                color: "white",
              }}
              clickable={!props.dashboard}
              onClick={() => {
                if (props.dashboard) {
                  // Do Nothing
                } else if (
                  props.characterTagsQuery.find((el) => el === tag.name)
                ) {
                  props.setCharacterTagsQuery(
                    props.characterTagsQuery.filter((el) => el !== tag.name)
                  );
                } else {
                  props.setCharacterTagsQuery([
                    ...props.characterTagsQuery,
                    tag.name,
                  ]);
                }
              }}
            />
          ))}
        </div>
      ) : null}
      {props.generalTags.length ? (
        <div>
          <Typography>{t("glossary:words.general-tag")}</Typography>
          {props.generalTags.map((tag) => (
            <Chip
              key={tag.id}
              size="small"
              label={tag.name}
              className={classes.chip}
              color="secondary"
              style={{
                color: "white",
              }}
              clickable={!props.dashboard}
              onClick={() => {
                if (props.dashboard) {
                  // Do Nothing
                } else if (
                  props.generalTagsQuery.find((el) => el === tag.name)
                ) {
                  props.setGeneralTagsQuery(
                    props.generalTagsQuery.filter((el) => el !== tag.name)
                  );
                } else {
                  props.setGeneralTagsQuery([
                    ...props.generalTagsQuery,
                    tag.name,
                  ]);
                }
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TagDetail;
