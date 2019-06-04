import React from "react";
import PropTypes from "prop-types";

// Displaying a clock counting to the end of the test
const TestClock = props => {

  const { seconds } = props;

  if (seconds === null) { return null }

  const className = seconds <= 180 ? "text-error" : "";

  let _minutes = Math.floor(seconds / 60);
  if (_minutes < 10) {
    _minutes = "0" + String(_minutes)
  }

  let _seconds = seconds % 60;
  if (_seconds < 10) {
    _seconds = "0" + String(_seconds)
  }

  return (
    <p className={`test-solve__clock ${className}`}>
      {_minutes}:{_seconds}
    </p>
  )

}

TestClock.propTypes = {
  seconds: PropTypes.number,
  // seconds untill the test end, could be null
}

export default TestClock;
