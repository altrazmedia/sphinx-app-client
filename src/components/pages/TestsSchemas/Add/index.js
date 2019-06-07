import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "config/axios";

import { Button, Input, Select, ErrorMessage, PageHeader } from "components/common";
import { withTranslation } from "react-i18next";

import QuestionForm from "./QuestionForm";
import Question from "../Question";

class AddTestSchema extends PureComponent {

  state = {
    subject: "",
    questions: [],
    name: "",
    description: "",
    errors: {},
    errorMsg: "",
    displayNewQuestionForm: false
  }

  componentDidMount = () => {
    const subject = this.getSubjectCodeById(this.props.defaultSubject) // in props there is an id of selected subject - we need it's code
    this.setState({ subject })
  }

  /**
   * Finds the subject by id and returns it's code
   * @param {String} id
   * @returns {String}
   */
  getSubjectCodeById = id => {
    const { subjects } = this.props;
    const matched = subjects.data.find(subject => subject._id === id);
    if (matched) { return matched.code }
    return ""
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState(state => ({ 
      [name]: value,
      errors: {
        ...state.errors,
        [name]: "" // Resetting an error of the edited field 
      }
    }))
  }

  handleSubjectChange = subject => {
    this.setState({ subject })
  }

  /** Opens modal with form to add a new question */
  openNewQuestionForm = () => {
    this.setState({ displayNewQuestionForm: true })
  }

  /** Closes a new question form */
  closeNewQuestionForm = () => {
    this.setState({ displayNewQuestionForm: false })
  }

  /**
   * Adds a new question
   * @param {Object} question
   */
  confirmQuestionForm = question => {
    this.closeNewQuestionForm();
    this.setState(state => ({
      questions: [ ...state.questions, question ]
    }))
  }

  /** Removes the question with given index
   * @param {Number} index
   */
  removeQuestion = index => () => {
    this.setState(state => {
      const questions = [ ...state.questions ];
      questions.splice(index, 1);
      return { questions }
    })
  }


  /**
   * Checking if all the fields are filled correctly, setting the 'errors' and 'errorMsg' in state
   * @returns {Boolean} true => all the fields are filled correctly
   */
  validate = () => {

    const { name, subject, questions } = this.state;
    const { t } = this.props;
    const errors = {};
    const errorMsg = [];

    if (name.trim().length === 0) {
      errors.name = t("emptyField");
    }

    if (!subject) {
      // No subject have been selected
      errorMsg.push(t("testsSchemas.noSubjectError"))
    }

    if (questions.length === 0) {
      // No question have been created
      errorMsg.push(t("testsSchemas.noQuestions"));
    }

    this.setState({ errors, errorMsg: errorMsg.join(". ") })
    
    if (errorMsg.length > 0 || Object.keys(errors).length > 0) {
      // Some errors occurred
      return false
    }
    return true

  }

  
  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) {
      const { name, subject, questions, description } = this.state;
      const testSchema = { name, subject, questions, description };
      this.saveTestSchema(testSchema)
    }

  }

  /**
   * Sends the data to the server
   */
  saveTestSchema = testSchema => {
    axios.post("testsSchemas", testSchema)
      .then(() => {
        // Test Schema has been successfully created - redirecting to testsSchemas main page
        // TODO: add a Toast message about successfull operation
        this.props.history.push("/tests-schemas")
      })
      .catch(err => {
        this.setState({ errorMsg: `${this.props.t("operationError")} (${err.response.status})` })
      })
  }


  render = () => {

    const { name, subject, description, questions, errors, displayNewQuestionForm, errorMsg } = this.state;
    const { subjects, t } = this.props;

    return (
      <>
        <PageHeader header={t("testsSchemas.create.header")} />
        <form className="test-schema-form" onSubmit={this.handleSubmit}>
          <div className="segment">
            <Select
              value={subject}
              options={subjects.data.map(subject => ({
                text: subject.name,
                value: subject.code
              }))}
              fullWidth
              placeholder={t("pickSubject")}
              onChange={this.handleSubjectChange}
            />
            <Input 
              value={name}
              error={errors.name}
              onChange={this.handleInputChange}
              name="name"
              fullWidth
              icon="tag"
              placeholder={t("testsSchemas.nameFull")}
              required
            />
            <Input 
              value={description}
              error={errors.description}
              onChange={this.handleInputChange}
              name="description"
              fullWidth
              icon="info-circle"
              placeholder={t("testsSchemas.shortDescription")}
            />
            <h2>{t("testsSchemas.questions")}</h2>
              
            {
              questions.map((question, index) => {
                return (
                  <Question question={question} remove={this.removeQuestion(index)} />
                )
              })
            }

            <Button.Group align="right">
              <Button variant="text" onClick={this.openNewQuestionForm} type="button" icon="plus">{t("testsSchemas.addQuestion")}</Button>
            </Button.Group>

            <ErrorMessage content={errorMsg} fullWidth /> 

          </div>
          <Button.Group align="right">
            <Button type="submit">{t("save")}</Button>
          </Button.Group>
        </form>
        <QuestionForm 
          isOpen={displayNewQuestionForm} 
          cancel={this.closeNewQuestionForm} 
          confirm={this.confirmQuestionForm}
        />

      </>
    )
  }

}

AddTestSchema.propTypes = {
  defaultSubject: PropTypes.string,
  // id of subject selected on tests list
}


const READ = state => ({
  subjects: state.subjects
})


export default connect(READ)(withTranslation()(AddTestSchema));