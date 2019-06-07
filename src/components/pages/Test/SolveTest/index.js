import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "config/axios";
import { Trans } from "react-i18next";

import { Portal, Button } from "components/common";

import Confirmation from "./Confirmation";
import Navigation from "./Navigation";
import Question from "./Question";
import Clock from "./Clock";

class SolveTest extends PureComponent {

  state = {
    questions: [ ...this.props.questions ],
    activeQuestion: { ...this.props.questions[0] }, // currently displayed question
    finished: false, // test is finished
    confirmationPageDisplayed: false, // displays confirmation page with info about answered questions
    clock: null, // seconds until test is finished
  }

  componentDidMount = () => {
    this.setClock();
  }

  componentWillUnmount = () => {
    if (this.clockRunTimeout) {
      clearTimeout(this.clockRunTimeout)
    }
    if (this.clockRunInterval) {
      clearInterval(this.clockRunInterval)
    }
  }

  setClock = () => {
    const { end } = this.props;
    const diff = moment(end).local().diff(moment(), "second");
    if (diff <= 0) {
      this.setState({ finished: true })
    }
    else if (diff <= 600) {
      // Test will be finished in 10 less than minutes
      this.runClock()
    }
    else {
      // Clock will start running 10 mins before the end
      const secondsUntil10mins = diff - 600;
      this.clockRunTimeout = setTimeout(this.runClock, secondsUntil10mins * 1000)
    }
  }

  runClock = () => {
    const { end } = this.props;
    this.clockRunInterval = setInterval(() => {
      const diff = moment(end).diff(moment(), "second");
      if (diff <= 0) {
        this.setState({ finished: true })
      }
      else {
        this.setState({ clock: diff })
      }
    })
  }

  changeActiveQuestion = questionId => {
    const questionIndex = this.state.questions.findIndex(question => question._id === questionId);
    this.setState({ 
      activeQuestion: { ...this.state.questions[questionIndex] },
      confirmationPageDisplayed: false 
    })
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


  redirectToConfirmationPage = async () => {
    await this.sendAnswer(); // Sending the answer to the currently open question before displaying confirmation page
    this.setState({ confirmationPageDisplayed: true })
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
          if (err.response.status === 400 && err.response.reason === "test_not_ongoing") {
            // Test is finished
            this.setState({ finished: true })
          }
          else {
            resolve();
            // TODO: handling the error
          }
        })

    })
    
  }


  render = () => {

    const { questions, activeQuestion, finished, clock, confirmationPageDisplayed } = this.state;
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
            {
              finished ? 
                <div className="test-solve__info">
                  <h2 className="text-error"><Trans i18nKey="test.finished.header" /></h2>
                  <p><Trans i18nKey="test.finished.description" /></p>
                  <Button variant="text" onClick={this.props.close}>
                    <Trans i18nKey="close" />
                  </Button>
                </div>
              : 
                <div className="test-solve__main">
                  <Clock seconds={clock} />
                  {
                    confirmationPageDisplayed ? 
                      <Confirmation
                        totalQuestions={questions.length}
                        answeredQuestions={questions.filter(question => question.answer.length > 0).length}
                        close={this.props.close}
                      />  
                    :
                    <Question 
                      question={activeQuestion}
                      handleOptionClick={this.toggleAnswer}
                    />
                  }
                  <Navigation
                    questions={questions}
                    active={activeQuestion._id}
                    handleClick={this.handleNavigationClick}
                    confirmationPageDisplayed={confirmationPageDisplayed}
                    redirectToConfirmationPage={this.redirectToConfirmationPage}
                  />
                </div>
            }
            
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