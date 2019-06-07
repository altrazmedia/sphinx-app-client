import React from "react";
import PropTypes from "prop-types";

import { Icon } from "components/common";

/**
 * Set of buttons to navigate through questions
 */
const TestNavigation = props => {

  const { questions, active, handleClick, confirmationPageDisplayed, redirectToConfirmationPage } = props;

  const handleQuestionClick = question => {
    if (redirectToConfirmationPage || question._id !== active) {
      handleClick(question._id);
    }
  }

  return (
    <nav className="test-solve__nav">
      {
        questions.map(question => {
          const isAnswered = question.answer.length > 0;
          const isActive = !confirmationPageDisplayed && question._id === active;

          return (
            <button 
              className={`test-solve__nav-btn ${isActive ? "active" : ""}`}
              onClick={() => handleQuestionClick(question)}
              key={question._id}
            >
              {
                // displaying the icon to mark the questions that have been already answered
                isAnswered && <Icon name="check" color="inverted" size="small" />
              }
            </button>
          )
        })
      }
      <button 
        className={`test-solve__nav-btn ${confirmationPageDisplayed ? "active" : ""}`}
        onClick={redirectToConfirmationPage}
      >
        {
          <Icon name="circle" color="inverted" size="small" />
        }
      </button>
    </nav>
  )

}

TestNavigation.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.string.isRequired, // id of currently open question
  handleClick: PropTypes.func.isRequired, // handling the clicks on one of the navigation buttons
  redirectToConfirmationPage: PropTypes.func.isRequired,
  confirmationPageDisplayed: PropTypes.bool
}

export default TestNavigation;