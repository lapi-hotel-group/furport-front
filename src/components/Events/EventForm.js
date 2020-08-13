import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {} from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import csc from "../../utils/csc";

import { AuthContext } from "../../auth/authContext";
import GoogleMapLocation from "./GoogleMapLocation";
import NewTag from "./NewTag";
import DeleteButton from "./DeleteButton";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: "primary",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  form: {
    display: "block",
    textAlign: "center",
    "& .MuiTextField-root, .MuiButton-root": {
      display: "inline-block",
    },
  },
  formControl: {
    display: "flex",
  },
  searchInput: {
    flexGrow: "1",
  },
}));

const initDate = new Date();
initDate.setMinutes(0);

const EventForm = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const params = useParams();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  let eventData = {
    start_datetime: initDate,
    end_datetime: initDate,
    country: "109",
    state: "",
    city: "",
    openness: "0",
    attendees: 0,
    organization_tag: [],
    character_tag: [],
    general_tag: [],
  };

  if (props.edit) {
    eventData = props.events.find((el) => el.id.toString() === params.id);
    if (eventData) {
      eventData.start_datetime = new Date(eventData.start_datetime);
      eventData.end_datetime = new Date(eventData.end_datetime);
      eventData.googleMapLocation = {
        description: eventData.google_map_description,
        place_id: eventData.google_map_place_id,
      };
    }
  }

  const {
    register,
    watch,
    handleSubmit,
    errors: formErrors,
    setError: setFormError,
    clearErrors,
    setValue,
    control,
  } = useForm({
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: eventData,
  });

  const submitHandler = (data) => {
    setLoading(true);
    const postData = {
      ...data,
      start_datetime: data.start_datetime.toISOString(),
      end_datetime: data.end_datetime.toISOString(),
      google_map_place_id: data.googleMapLocation
        ? data.googleMapLocation.place_id
        : "",
      google_map_description: data.googleMapLocation
        ? data.googleMapLocation.description
        : "",
    };
    const url = props.edit ? "/events/" + params.id + "/" : "/events/";
    axios
      .request({
        method: props.edit ? "put" : "post",
        url: url,
        data: postData,
        headers: { Authorization: "Bearer " + authContext.token },
      })
      .then((response) => {
        const newEvents = [...props.events];
        if (props.edit) {
          newEvents[
            props.events.findIndex((el) => el.id === response.data.id)
          ] = response.data;
        } else {
          newEvents.push({ ...response.data, stars: 0, attends: 0 });
        }
        props.setEvents(newEvents);
        history.push("/events/" + response.data.id);
      })
      .catch((err) => {
        if (err.response) {
          Object.entries(err.response.data).forEach(([key, value]) => {
            setFormError(key, { type: "manual", message: value });
          });
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
      <DialogContent style={{ overflow: "visible" }}>
        <Grid container spacing={3} align="left">
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="name"
              label={t("イベント名")}
              inputRef={register({
                required: true,
                maxLength: {
                  value: 255,
                  message: t("255文字以内にしてください。"),
                },
              })}
              error={formErrors.name}
              helperText={formErrors.name ? formErrors.name.message : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="start_datetime"
              control={control}
              render={({ onChange, value }) => (
                <KeyboardDateTimePicker
                  required
                  fullWidth
                  ampm={false}
                  format="yyyy/MM/dd HH:mm"
                  label={t("開始時刻")}
                  onChange={onChange}
                  onBlur={() => {
                    setValue("end_datetime", value);
                  }}
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              as={KeyboardDateTimePicker}
              name="end_datetime"
              control={control}
              required
              fullWidth
              ampm={false}
              format="yyyy/MM/dd HH:mm"
              label={t("終了時刻")}
              minDate={watch("start_datetime")}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required variant="outlined" fullWidth>
              <InputLabel>{t("国名")}</InputLabel>
              <Controller
                name="country"
                control={control}
                render={({ onChange, value }) => (
                  <Select label={t("国名*")} onChange={onChange} value={value}>
                    {csc.getAllCountries().map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl required variant="outlined" fullWidth>
              <InputLabel>{t("都道府県・州名")}</InputLabel>
              <Controller
                name="state"
                control={control}
                render={({ onChange, value }) => (
                  <Select
                    label={t("都道府県・州名*")}
                    onChange={onChange}
                    value={value}
                  >
                    {csc.getStatesOfCountry(watch("country")).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>{t("市名")}</InputLabel>
              <Controller
                name="city"
                control={control}
                render={({ onChange, value }) => (
                  <Select label={t("市名*")} onChange={onChange} value={value}>
                    {csc.getCitiesOfState(watch("state")).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="place"
              label={t("会場名")}
              inputRef={register({
                maxLength: {
                  value: 255,
                  message: t("255文字以内にしてください。"),
                },
              })}
              error={formErrors.place}
              helperText={formErrors.place ? formErrors.place.message : null}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="googleMapLocation"
              control={control}
              render={({ onChange, value }) => (
                <GoogleMapLocation value={value} handler={onChange} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="attendees"
              type="number"
              label={t("参加者数：不明の場合0としてください")}
              inputRef={register({
                required: true,
                pattern: {
                  value: /^\d+?$/,
                  message: t("0以上の整数を入力してください。"),
                },
                validate: (value) =>
                  value <= 2147483647 || t("入力値が大きすぎます。"),
              })}
              error={formErrors.attendees}
              helperText={
                formErrors.attendees ? formErrors.attendees.message : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>{t("公開度")}</InputLabel>
              <Controller
                name="openness"
                control={control}
                render={({ onChange, value }) => (
                  <Select
                    label={t("公開度*")}
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value="0">{t("オープン")}</MenuItem>
                    <MenuItem value="1">{t("友達限定")}</MenuItem>
                    <MenuItem value="2">{t("クローズド")}</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="url"
              label={t("公式ページURL")}
              inputRef={register({
                maxLength: {
                  value: 255,
                  message: t("255文字以内にしてください。"),
                },
              })}
              error={formErrors.url}
              helperText={formErrors.url ? formErrors.url.message : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="twitter_id"
              label={t("公式Twitter")}
              inputRef={register({
                maxLength: {
                  value: 255,
                  message: t("255文字以内にしてください。"),
                },
              })}
              placeholder="twitter"
              error={formErrors.twitter_id}
              helperText={
                formErrors.twitter_id ? formErrors.twitter_id.message : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="search_keywords"
              label={t("検索キーワード（略称など）")}
              inputRef={register({
                maxLength: {
                  value: 255,
                  message: t("255文字以内にしてください。"),
                },
              })}
              placeholder="JMoF, じぇいもふ"
              error={formErrors.search_keywords}
              helperText={
                formErrors.search_keywords
                  ? formErrors.search_keywords.message
                  : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0} align="left">
              <Grid item xs={12} className={classes.formControl}>
                <Controller
                  name="organization_tag"
                  control={control}
                  render={({ onChange, value }) => (
                    <Autocomplete
                      multiple
                      options={props.organizationTags}
                      getOptionLabel={(option) => option.name}
                      className={classes.searchInput}
                      onChange={(event, value) => {
                        onChange(value);
                      }}
                      value={value}
                      filterSelectedOptions
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            key={option.name}
                            label={option.name}
                            {...getTagProps({ index })}
                            style={{
                              color: "white",
                              backgroundColor: theme.palette.error.main,
                            }}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={t("主催者タグ")}
                          placeholder={t("タグを追加")}
                        />
                      )}
                    />
                  )}
                />
                <NewTag
                  kind="organization"
                  tags={props.organizationTags}
                  setTags={props.setOrganizationTags}
                  tagValue={watch("organization_tag")}
                  tagHandler={(v) => setValue("organization_tag", v)}
                />
              </Grid>
              <Grid item xs={12} className={classes.formControl}>
                <Controller
                  name="character_tag"
                  control={control}
                  render={({ onChange, value }) => (
                    <Autocomplete
                      multiple
                      options={props.characterTags}
                      getOptionLabel={(option) => option.name}
                      className={classes.searchInput}
                      onChange={(event, value) => {
                        onChange(value);
                      }}
                      value={value}
                      filterSelectedOptions
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            key={option.name}
                            label={option.name}
                            {...getTagProps({ index })}
                            style={{
                              color: "white",
                              backgroundColor: theme.palette.primary.main,
                            }}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={t("キャラクタータグ")}
                          placeholder={t("タグを追加")}
                        />
                      )}
                    />
                  )}
                />
                <NewTag
                  kind="character"
                  tags={props.characterTags}
                  setTags={props.setCharacterTags}
                  tagValue={watch("character_tag")}
                  tagHandler={(v) => setValue("character_tag", v)}
                />
              </Grid>
              <Grid item xs={12} className={classes.formControl}>
                <Controller
                  name="general_tag"
                  control={control}
                  render={({ onChange, value }) => (
                    <Autocomplete
                      multiple
                      options={props.generalTags}
                      getOptionLabel={(option) => option.name}
                      className={classes.searchInput}
                      onChange={(event, value) => {
                        onChange(value);
                      }}
                      value={value}
                      filterSelectedOptions
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            key={option.name}
                            label={option.name}
                            {...getTagProps({ index })}
                            style={{
                              color: "white",
                              backgroundColor: theme.palette.secondary.main,
                            }}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={t("一般タグ")}
                          placeholder={t("タグを追加")}
                        />
                      )}
                    />
                  )}
                />
                <NewTag
                  kind="general"
                  tags={props.generalTags}
                  setTags={props.setGeneralTags}
                  tagValue={watch("general_tag")}
                  tagHandler={(v) => setValue("general_tag", v)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              name="description"
              label={t("詳細")}
              inputRef={register({
                maxLength: {
                  value: 1000,
                  message: t("1000文字以内にしてください。"),
                },
              })}
              error={formErrors.description}
              helperText={
                formErrors.description ? formErrors.description.message : null
              }
            />
            <Typography align="center" color="error">
              {formErrors.non_field_errors
                ? formErrors.non_field_errors.message
                : null}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" color="error">
            {error}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        {props.edit && eventData ? (
          <>
            <DeleteButton
              id={params.id}
              events={props.events}
              setEvents={props.setEvents}
            />{" "}
          </>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          onClick={() => clearErrors("non_field_errors")}
        >
          {props.edit ? t("送信") : t("作成")}
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>{" "}
        <Button
          onClick={props.handleClose}
          variant="contained"
          color="secondary"
          disabled={loading}
        >
          {t("キャンセル")}
        </Button>
      </DialogActions>
    </form>
  );
};

export default EventForm;
