import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import { useTranslation } from "react-i18next";
import csc from "country-state-city";

import { AuthContext } from "../../auth/authContext";
import NewTag from "./NewTag";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    display: "flex",
  },
  searchInput: {
    flexGrow: "1",
  },
}));

export default function EventDetail(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [reflesh, setReflesh] = useState(false);
  const [event, setEvent] = useState({});
  const [country, setCountry] = useState("109");
  const [state, setState] = useState("0");
  const [city, setCity] = useState("0");
  const [generalTags, setGeneralTags] = useState([]);
  const [organizationTags, setOrganizationTags] = useState([]);
  const [characterTags, setCharacterTags] = useState([]);
  const [generalTagInputs, setGeneralTagInputs] = useState([]);
  const [organizationTagInputs, setOrganizationTagInputs] = useState([]);
  const [characterTagInputs, setCharacterTagInputs] = useState([]);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  const handleClose = () => {
    setRedirect(true);
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeState = (event) => {
    setState(event.target.value);
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  const handleGeneralTagInputs = (event, value) => {
    setGeneralTagInputs(value);
  };
  const handleCharacterTagInputs = (event, value) => {
    setCharacterTagInputs(value);
  };
  const handleOrganizationTagInputs = (event, value) => {
    setOrganizationTagInputs(value);
  };

  useEffect(() => {
    setLoading(true);
    const url = "/events/" + props.match.params.id + "/";
    axios
      .get(url)
      .then((response) => {
        setEvent(response.data);
        setCountry(response.data.country.toString());
        setState(response.data.state.toString());
        setCity(response.data.city.toString());
        if (response.data.organization_tag.length) {
          setOrganizationTagInputs(
            organizationTags.filter((el) =>
              response.data.organization_tag
                .map((el2) => el2 === el.url)
                .reduce((prev, current) => prev + current)
            )
          );
        }
        if (response.data.character_tag.length) {
          setCharacterTagInputs(
            characterTags.filter((el) =>
              response.data.character_tag
                .map((el2) => el2 === el.url)
                .reduce((prev, current) => prev + current)
            )
          );
        }
        if (response.data.general_tag.length) {
          setGeneralTagInputs(
            generalTags.filter((el) =>
              response.data.general_tag
                .map((el2) => el2 === el.url)
                .reduce((prev, current) => prev + current)
            )
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  }, [characterTags, generalTags, organizationTags, props.match.params.id]);

  useEffect(() => {
    const url = "/organization_tags/";
    axios
      .get(url)
      .then((response) => {
        setOrganizationTags(response.data.results);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [reflesh]);
  useEffect(() => {
    const url = "/character_tags/";
    axios
      .get(url)
      .then((response) => {
        setCharacterTags(response.data.results);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [reflesh]);
  useEffect(() => {
    const url = "/general_tags/";
    axios
      .get(url)
      .then((response) => {
        setGeneralTags(response.data.results);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [reflesh]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = {
      name: e.target.name.value,
      start_datetime: e.target.start_datetime.value,
      end_datetime: e.target.end_datetime.value,
      description: e.target.description.value,
      url: e.target.url.value,
      twitter_id: e.target.twitter_id.value,
      country: country,
      state: state,
      city: city,
      place: e.target.place.value,
      organization_tag: organizationTagInputs.map((el) => el.url),
      character_tag: characterTagInputs.map((el) => el.url),
      general_tag: generalTagInputs.map((el) => el.url),
    };
    const url = "/events/" + props.match.params.id + "/";
    axios
      .put(url, postData, {
        headers: { Authorization: "JWT " + authContext.token },
      })
      .then((response) => {
        setRedirect(response.data.id);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div>
      {redirect ? <Redirect to={"/events/" + props.match.params.id} /> : null}
      <Dialog open onClose={handleClose}>
        <DialogTitle>{t("イベント編集")}</DialogTitle>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={submitHandler}>
            <DialogContent>
              <TextField
                required
                name="name"
                label={t("イベント名")}
                type="text"
                defaultValue={event.name}
                fullWidth
                className={classes.field}
              />
              <TextField
                name="start_datetime"
                label={t("開始時刻")}
                type="datetime-local"
                defaultValue={event.start_datetime.slice(0, -1)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.field}
              />
              <TextField
                name="end_datetime"
                label={t("終了時刻")}
                type="datetime-local"
                defaultValue={event.end_datetime.slice(0, -1)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.field}
              />
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="country">{t("国名")}</InputLabel>
                <Select
                  labelId="country"
                  value={country}
                  onChange={handleChangeCountry}
                >
                  {csc.getAllCountries().map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="state">{t("都道府県名・州名")}</InputLabel>
                <Select
                  labelId="state"
                  value={state}
                  onChange={handleChangeState}
                >
                  {csc.getStatesOfCountry(country).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="city">{t("市名")}</InputLabel>
                <Select labelId="city" value={city} onChange={handleChangeCity}>
                  {csc.getCitiesOfState(state).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="place"
                label={t("会場名")}
                type="text"
                defaultValue={event.place}
                fullWidth
                className={classes.field}
              />
              <TextField
                name="description"
                label={t("詳細")}
                type="text"
                defaultValue={event.description}
                fullWidth
                multiline
                rows={4}
                className={classes.field}
              />
              <div className={classes.formControl}>
                <Autocomplete
                  name="organization_tag"
                  multiple
                  options={organizationTags}
                  getOptionLabel={(option) => option.name}
                  value={organizationTagInputs}
                  onChange={handleOrganizationTagInputs}
                  className={classes.searchInput}
                  filterSelectedOptions
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        key={option.name}
                        label={option.name}
                        {...getTagProps({ index })}
                        color="danger"
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="主催者タグ"
                      placeholder={t("タグを追加")}
                    />
                  )}
                />
                <NewTag kind="organization" reflesh={setReflesh} />
              </div>
              <div className={classes.formControl}>
                <Autocomplete
                  name="character_tag"
                  multiple
                  options={characterTags}
                  getOptionLabel={(option) => option.name}
                  value={characterTagInputs}
                  onChange={handleCharacterTagInputs}
                  className={classes.searchInput}
                  filterSelectedOptions
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        key={option.name}
                        label={option.name}
                        {...getTagProps({ index })}
                        color="primary"
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="キャラクタータグ"
                      placeholder={t("タグを追加")}
                    />
                  )}
                />
                <NewTag kind="character" reflesh={setReflesh} />
              </div>
              <div className={classes.formControl}>
                <Autocomplete
                  name="general_tag"
                  multiple
                  value={generalTagInputs}
                  onChange={handleGeneralTagInputs}
                  options={generalTags}
                  getOptionLabel={(option) => option.name}
                  className={classes.searchInput}
                  filterSelectedOptions
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        key={option.name}
                        label={option.name}
                        {...getTagProps({ index })}
                        color="secondary"
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="一般タグ"
                      placeholder={t("タグを追加")}
                    />
                  )}
                />
                <NewTag kind="general" reflesh={setReflesh} />
              </div>
              <TextField
                name="url"
                label={t("公式ページURL")}
                type="text"
                defaultValue={event.url}
                fullWidth
                className={classes.field}
              />
              <TextField
                name="twitter_id"
                label={t("公式Twitter")}
                type="text"
                defaultValue={event.twitter_id}
                fullWidth
                className={classes.field}
              />
              {error.detail}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" disabled={loading}>
                {t("キャンセル")}
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {t("送信")}
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </div>
  );
}
