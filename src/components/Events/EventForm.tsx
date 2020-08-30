import React, { useState, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
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
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import csc from "../../utils/csc";
import qs from "qs";
import moment from "moment-timezone";

import { AuthContext } from "../../auth/authContext";
import GoogleMapLocation from "./GoogleMapLocation";
import NewTag from "./NewTag";
import DeleteButton from "./DeleteButton";
import SameEventModal from "./SameEventModal";

import { Event, Tag } from "../../models";
import { IWritableEvent } from "../../types";

interface EventFormProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
  organizationTags: Tag[];
  setOrganizationTags: React.Dispatch<React.SetStateAction<Tag[] | null>>;
  characterTags: Tag[];
  setCharacterTags: React.Dispatch<React.SetStateAction<Tag[] | null>>;
  generalTags: Tag[];
  setGeneralTags: React.Dispatch<React.SetStateAction<Tag[] | null>>;
  handleClose: () => void;
  edit: boolean;
}

const useStyles = makeStyles({
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
    flexGrow: 1,
  },
});

const EventForm: React.FC<EventFormProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sameEventsName, setSameEventsName] = useState(null);
  const [subDataBuf, setSubDataBuf] = useState<IWritableEvent | null>(null);

  let eventData: Event;
  if (!props.edit) {
    const q = qs.parse(location.search.substr(1));
    eventData = new Event().setDataByQuery(q);
  } else {
    eventData =
      Object.assign(
        {},
        props.events.find((el) => el.id.toString() === params.id)
      ) || new Event();
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

  const submitHandler = (data: IWritableEvent) => {
    setLoading(true);
    const postData = {
      ...data,
      start_datetime: data.start_datetime.utc().format("YYYY-MM-DDTHH:mm"),
      end_datetime: data.end_datetime.utc().format("YYYY-MM-DDTHH:mm"),
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
          ] = new Event().setDataByAPI(response.data);
        } else {
          newEvents.push(
            new Event().setDataByAPI({ ...response.data, stars: 0, attends: 0 })
          );
        }
        props.setEvents(newEvents);
        history.push("/events/" + response.data.id);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.message === "Same day event") {
            setSameEventsName(err.response.data.events_name);
            setSubDataBuf(data);
          } else {
            Object.entries(err.response.data).forEach(([key, value]) => {
              setFormError(key, { type: "manual", message: value as string });
            });
            setSameEventsName(null);
          }
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  };

  return (
    <>
      {sameEventsName && subDataBuf ? (
        <SameEventModal
          sameEventsName={sameEventsName}
          setSameEventsName={setSameEventsName}
          subDataBuf={subDataBuf}
          submitHandler={submitHandler}
        />
      ) : null}
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <DialogContent style={{ overflow: "visible" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label={t("common:form.event-name.label")}
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 255,
                    message: t(
                      "common:form.validations.max-string-length.message",
                      {
                        maxLength: 255,
                      }
                    ),
                  },
                })}
                error={!!formErrors.name}
                helperText={formErrors.name ? formErrors.name.message : null}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="start_datetime"
                control={control}
                render={({ onChange, value }) =>
                  watch("no_time") ? (
                    <KeyboardDatePicker
                      required
                      fullWidth
                      format="YYYY/MM/DD"
                      label={t("glossary:words.start-datetime")}
                      onChange={(d) => onChange(moment(d))}
                      onBlur={() => {
                        setValue("end_datetime", value);
                      }}
                      value={value.utc()}
                    />
                  ) : (
                    <KeyboardDateTimePicker
                      required
                      fullWidth
                      ampm={false}
                      format="YYYY/MM/DD HH:mm"
                      label={t("common:form.start-datetime.label")}
                      onChange={(d) => onChange(moment(d))}
                      onBlur={() => {
                        setValue("end_datetime", value);
                      }}
                      value={value.tz(watch("timezone"))}
                    />
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="end_datetime"
                control={control}
                render={({ onChange, value }) =>
                  watch("no_time") ? (
                    <KeyboardDatePicker
                      required
                      fullWidth
                      format="YYYY/MM/DD"
                      label={t("glossary:words.end-datetime")}
                      onChange={(d) => onChange(moment(d))}
                      value={value.utc()}
                      minDate={watch("start_datetime")}
                    />
                  ) : (
                    <KeyboardDateTimePicker
                      required
                      fullWidth
                      ampm={false}
                      format="YYYY/MM/DD HH:mm"
                      label={t("common:form.end-datetime.label")}
                      onChange={(d) => onChange(moment(d))}
                      value={value.tz(watch("timezone"))}
                      minDate={watch("start_datetime")}
                    />
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl required variant="outlined" fullWidth>
                <Controller
                  name="timezone"
                  control={control}
                  render={({ onChange, value }) => (
                    <Autocomplete
                      options={moment.tz.names()}
                      getOptionLabel={(option) => option}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      value={value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t("common:form.timezone.label")}
                          variant="outlined"
                        />
                      )}
                      disabled={watch("no_time")}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <Controller
                  control={control}
                  name="no_time"
                  render={({ onChange, value }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          onChange={(e) => onChange(e.target.checked)}
                          checked={value}
                        />
                      }
                      label={t("glossary:words.all-day")}
                    />
                  )}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <FormControl required variant="outlined" fullWidth>
                <InputLabel>{t("common:form.country.label")}</InputLabel>
                <Controller
                  name="country"
                  control={control}
                  render={({ onChange, value }) => (
                    <Select
                      label={t("common:form.country.label-required")}
                      onChange={onChange}
                      value={value}
                    >
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
                <InputLabel>{t("common:form.state.label")}</InputLabel>
                <Controller
                  name="state"
                  control={control}
                  render={({ onChange, value }) => (
                    <Select
                      label={t("common:form.state.label-required")}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="place"
                label={t("common:form.place.label")}
                inputRef={register({
                  maxLength: {
                    value: 255,
                    message: t(
                      "common:form.validations.max-string-length.message",
                      {
                        maxLength: 255,
                      }
                    ),
                  },
                })}
                error={!!formErrors.place}
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
                label={t("common:form.attendees.label", {
                  temporaryPlacing: 0,
                })}
                inputRef={register({
                  required: true,
                  min: {
                    value: 0,
                    message: t("common:form.validations.min-integer.message", {
                      lowerLimit: 0,
                    }),
                  },
                  max: {
                    value: 2147483647,
                    message: t(
                      "common:form.validations.min-integer.error.input-is-too-large"
                    ),
                  },
                })}
                error={!!formErrors.attendees}
                helperText={
                  formErrors.attendees ? formErrors.attendees.message : null
                }
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>{t("common:form.openness.label")}</InputLabel>
                <Controller
                  name="openness"
                  control={control}
                  render={({ onChange, value }) => (
                    <Select
                      label={t("common:form.openness.label-required")}
                      onChange={onChange}
                      value={value}
                    >
                      <MenuItem value="0">
                        {t("common:enum.openness.open")}
                      </MenuItem>
                      <MenuItem value="1">
                        {t("common:enum.openness.friend_only")}
                      </MenuItem>
                      <MenuItem value="2">
                        {t("common:enum.openness.private")}
                      </MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="url"
                label={t("common:form.official_web_url.label")}
                inputRef={register({
                  maxLength: {
                    value: 255,
                    message: t(
                      "common:form.validations.max-string-length.message",
                      {
                        maxLength: 255,
                      }
                    ),
                  },
                })}
                error={!!formErrors.url}
                helperText={formErrors.url ? formErrors.url.message : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="twitter_id"
                label={t("common:form.official_twitter_id.label")}
                inputRef={register({
                  maxLength: {
                    value: 255,
                    message: t(
                      "common:form.validations.max-string-length.message",
                      {
                        maxLength: 255,
                      }
                    ),
                  },
                })}
                placeholder="twitter"
                error={!!formErrors.twitter_id}
                helperText={
                  formErrors.twitter_id ? formErrors.twitter_id.message : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="search_keywords"
                label={t("common:form.search-keywords.label")}
                inputRef={register({
                  maxLength: {
                    value: 255,
                    message: t(
                      "common:form.validations.max-string-length.message",
                      {
                        maxLength: 255,
                      }
                    ),
                  },
                })}
                placeholder={t("common:form.search-keywords.placeholder")}
                error={!!formErrors.search_keywords}
                helperText={
                  formErrors.search_keywords
                    ? formErrors.search_keywords.message
                    : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={0}>
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
                            label={t("common:form.organization-tag.label")}
                            placeholder={t(
                              "common:form.organization-tag.placeholder"
                            )}
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
                    tagHandler={(v: Tag[]) => setValue("organization_tag", v)}
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
                            label={t("common:form.character-tag.label")}
                            placeholder={t(
                              "common:form.character-tag.placeholder"
                            )}
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
                    tagHandler={(v: Tag[]) => setValue("character_tag", v)}
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
                            label={t("common:form.general-tag.label")}
                            placeholder={t(
                              "common:form.general-tag.placeholder"
                            )}
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
                    tagHandler={(v: Tag[]) => setValue("general_tag", v)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                name="description"
                label={t("common:form.event-detail.label")}
                inputRef={register({
                  maxLength: {
                    value: 1000,
                    message: t(
                      "common:form.validations.max-string-length.message",
                      {
                        maxLength: 1000,
                      }
                    ),
                  },
                })}
                error={!!formErrors.description}
                helperText={
                  formErrors.description ? formErrors.description.message : null
                }
              />
              {/* <Typography align="center" color="error">
                {formErrors.non_field_errors?.message}
              </Typography> */}
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
            {props.edit
              ? t("common:ui.button.submit")
              : t("common:ui.button.create")}
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
            {t("common:ui.button.cancel")}
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

export default EventForm;
