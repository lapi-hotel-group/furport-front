import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    width: "100%",
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  searchInput: {
    flexGrow: "1",
  },
  searchButton: {
    marginLeft: theme.spacing(1),
    height: "56px",
  },
}));

const Search = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleChangeSearch = (event) => {
    props.setSearch(event.target.value);
  };

  return (
    <div className={classes.search}>
      <TextField
        id="outlined-search"
        label={t("app:components.events.search.form.label")}
        placeholder={t("app:components.events.search.form.placeholder")}
        value={props.search}
        onChange={handleChangeSearch}
        type="search"
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.searchInput}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.searchButton}
      >
        {t("common:ui.button.search")}
      </Button>
    </div>
  );
};

export default Search;
