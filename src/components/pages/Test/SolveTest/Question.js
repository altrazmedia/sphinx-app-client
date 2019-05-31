import React from "react";
import PropTypes from "prop-types";


const Question = props => {

  const { question, handleOptionClick } = props;
  const { answer, content, options } = question;

  return (
    <div className="test-solve__question question">
      <h1 className="question__content">{content}</h1>
      <div className="question__options">
        {
          options.map(option => {
            const isMarked = answer.includes(option._id);
            return (
              <div 
                key={option._id}
                className={`question__option ${isMarked ? "marked" : ""}`} 
                onClick={() => handleOptionClick(option._id)}
              >
                {option.content}
              </div>
            )
          })
        }
      </div>
    </div>
  )

}

Question.propTypes = {
  question: PropTypes.shape({
    answer: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  handleOptionClick: PropTypes.func.isRequired,
}

export default Question;