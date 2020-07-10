import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
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
import { DateTimePicker } from "@material-ui/pickers";
import { useTranslation } from "react-i18next";
import csc from "country-state-city";

import { AuthContext } from "../../auth/authContext";
import NewTag from "./NewTag";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "fixed",
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

export default function NewEvent(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [country, setCountry] = useState("109");
  const [state, setState] = useState("0");
  const [city, setCity] = useState("0");
  const [generalTagInputs, setGeneralTagInputs] = useState([]);
  const [organizationTagInputs, setOrganizationTagInputs] = useState([]);
  const [characterTagInputs, setCharacterTagInputs] = useState([]);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = {
      name: e.target.name.value,
      start_datetime: startDate.toISOString(),
      end_datetime: endDate.toISOString(),
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
    const url = "/events/";
    axios
      .post(url, postData, {
        headers: { Authorization: "JWT " + authContext.token },
      })
      .then((response) => {
        const newEvent = [...props.events];
        newEvent.push({ ...response.data, stars: 0, attends: 0 });
        props.setEvents(newEvent);
        setRedirect(response.data.id);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  if (!authContext.token) {
    return null;
  }

  return (
    <div>
      {redirect ? <Redirect to={"/events/" + redirect} /> : null}
      <Tooltip title="Add" aria-label="add" onClick={handleClickOpen}>
        <Fab color="primary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("イベント作成")}</DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <TextField
              required
              name="name"
              label={t("イベント名")}
              type="text"
              fullWidth
              className={classes.field}
            />
            <DateTimePicker
              required
              name="start_datetime"
              inputVariant="outlined"
              label={t("開始時刻")}
              value={startDate}
              onChange={setStartDate}
              className={classes.field}
            />
            <DateTimePicker
              required
              name="end_datetime"
              inputVariant="outlined"
              label={t("終了時刻")}
              value={endDate}
              onChange={setEndDate}
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
                className={classes.field}
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
                className={classes.field}
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
              <Select
                labelId="city"
                value={city}
                onChange={handleChangeCity}
                className={classes.field}
              >
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
              fullWidth
              className={classes.field}
            />
            <TextField
              name="description"
              label={t("詳細")}
              type="text"
              fullWidth
              multiline
              rows={4}
              className={classes.field}
            />
            <div className={classes.formControl}>
              <Autocomplete
                name="organization_tag"
                multiple
                options={props.organizationTags}
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
              <NewTag
                kind="organization"
                tags={props.organizationTags}
                setTags={props.setOrganizationTags}
                tagValue={organizationTagInputs}
                tagHandler={setOrganizationTagInputs}
              />
            </div>
            <div className={classes.formControl}>
              <Autocomplete
                name="character_tag"
                multiple
                options={props.characterTags}
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
                    tagValue={characterTagInputs}
                    tagHandler={setCharacterTagInputs}
                  />
                )}
              />
              <NewTag
                kind="character"
                tags={props.characterTags}
                setTags={props.setCharacterTags}
              />
            </div>
            <div className={classes.formControl}>
              <Autocomplete
                name="general_tag"
                multiple
                value={generalTagInputs}
                onChange={handleGeneralTagInputs}
                options={props.generalTags}
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
              <NewTag
                kind="general"
                tags={props.generalTags}
                setTags={props.setGeneralTags}
                tagValue={generalTagInputs}
                tagHandler={setGeneralTagInputs}
              />
            </div>
            <TextField
              name="url"
              label={t("公式ページURL")}
              type="text"
              fullWidth
              className={classes.field}
            />
            <TextField
              name="twitter_id"
              label={t("公式Twitter")}
              type="text"
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
              {t("作成")}
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
