import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Portal, Button } from "components/common";

import Navigation from "./Navigation";
import Question from "./Question";
import axios from "config/axios";

class SolveTest extends PureComponent {

  state = {
    questions: [ ...this.props.questions ],
    activeQuestion: { ...this.props.questions[0] } // currently displayed question
  }

  changeActiveQuestion = questionId => {
    const questionIndex = this.state.questions.findIndex(question => question._id === questionId);
    this.setState({ activeQuestion: { ...this.state.questions[questionIndex] } })
  }

  /**
   * User has clicked one of the options
   */
  toggleAnswer = optionId => {
    this.setState(state => {
      const activeQuestion = { ...state.activeQuestion };
      const answer = [ ...activeQuestion.answer ];
      const optionIndex = answer.indexOf(optionId);
      if (optionIndex === -1) {
        // Option is not marked
        answer.push(optionId)
      }
      else {
        // Option is marked 
        answer.splice(optionIndex, 1);
      }

      return { activeQuestion: { ...activeQuestion, answer } }

    })

  }

  /**
   * Close button clicked
   */
  handleCloseButton = async () => {
    await this.sendAnswer(); // Sending the answer to the currently open question before closing the window
    this.props.close();
  }

  /**
   * Navigation button clicked
   * @param {String} questionId id of question which should be displayed
   */
  handleNavigationClick = async questionId => {
    await this.sendAnswer(); // Sending the answer to the currently open question before displaying another one
    this.changeActiveQuestion(questionId);
  }


  /**
   * Sending the answer to the server (if changes are detected)
   */
  sendAnswer = () => {

    return new Promise((resolve) => {
      const { activeQuestion, questions } = this.state;
  
      const activeQuestionIndex = questions.findIndex(question => question._id === activeQuestion._id);
  
      const currentAnswer = activeQuestion.answer;
      const prevAnswer = questions[activeQuestionIndex].answer;
  
      let hasAnswerChanged = false;
  
      if (currentAnswer.length !== prevAnswer.length) {
        hasAnswerChanged = true;
      }
      else {
        for (let option of currentAnswer) {
          if (!prevAnswer.includes(option)) {
            hasAnswerChanged = true;
            break
          }
        } 
      }

      if (!hasAnswerChanged) {
        // There are no changes in the answer, no need to send anything to the server
        resolve();
        return;
      }

      axios.put(`tests/answer/${this.props.testId}/${questions[activeQuestionIndex]._id}`, { answer: currentAnswer })
        .then(() => {
          this.setState(state => {
            // Changing the answers in local state
            const questions = [ ...state.questions ];
            questions[activeQuestionIndex].answer = currentAnswer;

          })
          resolve();
        })
        .catch(err => {
          console.log(err)
          resolve();
          // TODO: handling the error
        })

    })

    

    
  }



  render = () => {

    const { questions, activeQuestion } = this.state;
    const { name } = this.props;

    return (
      <Portal>
        <div className="test-solve">
          <div className="test-solve__content">
            <Button
              variant="icon"
              icon="times"
              className="test-solve__close-btn"
              onClick={this.handleCloseButton}
              size="small"
            />
            <header className="test-solve__header">
              <h2>{name}</h2>
            </header>
            <Question 
              question={activeQuestion}
              handleOptionClick={this.toggleAnswer}
            />
            <Navigation
              questions={questions}
              active={activeQuestion._id}
              handleClick={this.handleNavigationClick}
            />
          </div>
        </div>
      </Portal>
    )

  }

}

SolveTest.propTypes = {
  testId: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  close: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default SolveTest;