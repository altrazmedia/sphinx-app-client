import React from "react";
import PropTypes from "prop-types";

import { Button, Icon } from "components/common";

/**
 * Displays a question with it's options
 */
const Question = props => {

  const { question, remove } = props;

  return (
    <div className="test-schema-question">
      <div className="test-schema-question__header">
        <h3>{question.content}</h3>
        {
          remove ? 
            // Displaying remove button if 'remove' function is provided in props
            <div className="test-schema-question__options">
              <Button 
                variant="icon"
                icon="trash-alt"
                onClick={remove}
                color="error"
                size="small"
                type="button"
              />
            </div>
          : null
        }
      </div>
      <ul className="test-schema-question__options">
        {
          question.options.map((option, index) => (
            <li className="test-schema-question__option" key={index}>
              <Icon size="small" name={option.correct ? "check-circle" : "times-circle"} color={option.correct ? "success" : "error"} />
              {option.content}
            </li>
          ))
        }
      </ul>
    </div>
  )

}

Question.propTypes = {
  question: PropTypes.shape({
    content: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      correct: PropTypes.bool,
      content: PropTypes.string.isRequired
    }))
  }),
  // question data
  remove: PropTypes.func,
  // function to be called after clicking 'Remove' button; Button should not be displayed, if this function is undefined
}

export default Question;