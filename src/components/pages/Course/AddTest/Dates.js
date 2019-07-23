import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { Input, Checkbox, Button } from "components/common";

import moment from "moment";

const Dates = props => {
  const {
    startDate,
    startTime,
    duration,
    startNow,
    handleChange,
    t,
    previous,
    confirm,
  } = props;

  const handleCheckboxChange = e => {
    handleChange("startNow")(e.target.checked);
  };

  const handleInputChange = e => {
    handleChange(e.target.name)(e.target.value);
  };

  const getMinTime = () => {
    if (moment().isSame(moment(startDate, "YYYY-MM-DD"), "D")) {
      // If start day is today, then minimal time is current time
      return moment().format("HH:mm");
    }
    return undefined;
  };

  const handleSubmit = e => {
    e.preventDefault();
    confirm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Checkbox
        label={t("test.startNow")}
        checked={startNow}
        onChange={handleCheckboxChange}
      />
      <br />
      <br />
      <br />
      {!startNow && (
        <>
          <b>{t("test.startDate")}</b>
          <Input
            type="date"
            fullWidth
            name="startDate"
            value={startDate}
            onChange={handleInputChange}
            min={moment().format("YYYY-MM-DD")}
          />
          <b>{t("test.startTime")}</b>
          <Input
            type="time"
            fullWidth
            name="startTime"
            value={startTime}
            onChange={handleInputChange}
            min={getMinTime()}
          />
        </>
      )}
      <b>{t("test.duration")}</b>
      <Input
        type="number"
        fullWidth
        name="duration"
        value={duration}
        onChange={handleInputChange}
        min="3"
      />
      <hr />
      <Button.Group align="space-between">
        <Button
          variant="icon"
          icon="angle-left"
          onClick={previous}
          size="small"
          type="button"
        />
        <Button
          variant="icon"
          icon="angle-right"
          color="primary"
          size="small"
          disabled={!confirm}
          type="submit"
        />
      </Button.Group>
    </form>
  );
};

Dates.propTypes = {
  startDate: PropTypes.string.isRequired, // day of test start (YYYY-MM-DD)
  startTime: PropTypes.string.isRequired, // time of test start (HH:mm)
  startNow: PropTypes.bool.isRequired, // should test start immediately
  duration: PropTypes.string, // number as a string; test duration
  previous: PropTypes.func.isRequired, // going back to previuos step
  confirm: PropTypes.func, // form submition, can be undefined (then button should be disabled)
};

export default withTranslation()(Dates);
