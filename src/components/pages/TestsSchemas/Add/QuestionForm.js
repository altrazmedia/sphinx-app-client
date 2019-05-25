import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Modal, Input, Button, Checkbox, ErrorMessage } from "components/common";
import { withTranslation } from "react-i18next";

/**
 * Displays and validates form to add a new question
 * Returns valid and ready to save data
 */
class QuestionForm extends PureComponent {


  state = {
    content: "",
    options: [],
    errors: {},
    errorMsg: ""
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isOpen !== this.props.isOpen) {
      // Resetting all the values on form closing/ opening
      this.setState({
        content: "",
        options: [],
        errors: {},
        errorMsg: ""
      })
    }
  }


  handleContentChange = e => {
    const { value } = e.target;
    this.setState(state => ({ 
      content: value,
      errors: {...state.errors, content: ""} // Reseting the error in that field
    }))
  }

  /**
   * Option content change
   * @param {Number} index Index of the edited option
   */
  handleOptionContentChange = index => e => {
    const { value } = e.target;
    this.handleOptionChange(index, "content", value);
  }

  /**
   * Option corectness change
   * @param {Number} index Index of the edited option
   */
  handleOptionCorrectChange = index => e => {
    const { checked } = e.target;
    this.handleOptionChange(index, "correct", checked)
  }

  /**
   * Option values edited
   * @param {Number} index Index of the edited question
   * @param {String} name "correct" || "content"
   * @param {Boolean|String} value
   */
  handleOptionChange = (index, name, value) => {
    this.setState(state => {
      const options = [ ...state.options ];
      const option = options[index];
      option[name] = value;
      options[index] = option;
      return { 
        options,
        errors: {
          ...state.errors,
          [`option-${index}`]: name === "content" ? "" : state.errors[`option-${index}`] // Reseting the error if User is editing option content
        }
      }
    })
  }

  /**
   * Removes the option with given index
   */
  removeOption = index  => () => {
    this.setState(state => {
      const options = [ ...state.options ];
      options.splice(index, 1);
      return { options }
    })
  }

  /**
   * Validates all fields, sets errors and errorMsg values in state
   * @returns {Boolean} true => all fields are filled correctly
   */
  validate = () => {

    const errors = {};
    let errorMsg = "";
    const { t } = this.props;
    const { content, options } = this.state;

    if (content.trim().length === 0) {
      errors.content = t("emptyField");
    }

    if (options.length < 2) {
      // Every question has to have at least 2 answers
      errorMsg = t("testsSchemas.noOptionsError")
    }
    else {

      if (options.filter(option => option.correct).length === 0) {
        // There is no answer marked as correct
        errorMsg = t("testsSchemas.noCorrectOptionsError");
      }

      options.forEach((option, index) => {
        // Checking if every options has content provided
        if (option.content.trim().length === 0) {
          errors[`option-${index}`] = t("emptyField");
        }
      })

    }

    this.setState({ errors, errorMsg });
    
    if (errorMsg || Object.keys(errors).length > 0) {
      // There are some errors
      return false
    }
    return true

  }

  /**
   * Adds a new blank option
   */
  addOption = () => {
    this.setState(state => ({
      options: [
        ...state.options,
        { content: "", correct: false }
      ]
    }))
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) {
      // All the fields have been filled correctly
      const question = { 
        content: this.state.content,
        options: this.state.options
      }

      // Sending the data to the component above
      this.props.confirm(question);
    }
  }

  render = () => {

    const { isOpen, cancel, t } = this.props;
    const { content, options, errors, errorMsg } = this.state;

    return (
      <Modal isOpen={isOpen} title={t("testsSchemas.addQuestion")} >
        <Modal.Content>
          <form className="new-question-form" onSubmit={this.handleSubmit} id="question-form" >

            <Input
              value={content}
              placeholder={t("testsSchemas.questionContent")}
              onChange={this.handleContentChange}
              fullWidth
              name="questionContent"
              error={errors.content}
            />
            
            {
              options.length > 0 ? 
                <table className="table new-question-form__table">
                  <thead>
                    <tr>
                      <th>{t("testsSchemas.answers")}</th>
                      <th>{t("testsSchemas.correctAnswer")}</th>
                      <th>{t("remove")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      options.map((option, index) => {
                        return (
                          <tr>
                            <td>
                              <Input 
                                value={option.content}
                                onChange={this.handleOptionContentChange(index)}
                                className="new-question-form__option-input"
                                error={errors[`option-${index}`]}
                              />  
                            </td>
                            <td>
                              <Checkbox 
                                checked={Boolean(option.correct)}
                                onChange={this.handleOptionCorrectChange(index)}
                              />
                            </td>
                            <td>
                              <Button.Group align="center" className="new-question-form__remove-btn" >
                                <Button 
                                  variant="icon"
                                  icon="trash-alt"
                                  onClick={this.removeOption(index)}
                                  color="error"
                                  size="small"
                                  type="button"
                                />
                              </Button.Group>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                : null 
              }
              <Button type="button" variant="text" onClick={this.addOption}>{t("testsSchemas.addAnswer")}</Button>
            <ErrorMessage fullWidth content={errorMsg} />
          </form>
        </Modal.Content>
        <Modal.Buttons>
          <Button variant="text" onClick={cancel} type="button">
            {t("cancel")}      
          </Button>
          <Button type="submit" form="question-form" >
            {t("save")}      
          </Button>
        </Modal.Buttons>
      </Modal>
    )

  }

}


QuestionForm.propTypes = {
  confirm: PropTypes.func.isRequired,
  // Form confirmation; sends the question data
  cancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  // Should form be displayed

}

export default withTranslation()(QuestionForm);