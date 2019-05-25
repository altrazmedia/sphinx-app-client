import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Trans } from "react-i18next";
import { Select, Illustration, Loader, PageHeader, Button } from "components/common";

import Table from "./Table";

import { fetchTestsSchemasList } from "actions/testsSchemasActions";

class TestsSchemasList extends PureComponent {

  componentDidUpdate = prevProps => {
    if (this.props.subjectSelected !== prevProps.subjectSelected) {
      this.props.fetchTestsSchemasList({ subject: this.props.subjectSelected })
    }
  }

  render = () => {

    const { subjectSelected, changeSubject, subjects, testsSchemas } = this.props;

    return (
      <>
        <PageHeader header={<Trans i18nKey="testsSchemas.header" />} />
        <Select 
          value={subjectSelected}
          fullWidth
          onChange={changeSubject}
          options={subjects.data.map(subject => ({
            text: subject.name,
            value: subject._id
          }))}
          placeholder={<Trans i18nKey={subjects.loading ? "common.loadingData" : "pickSubject"}/>}
        />
        {
          !subjectSelected ? 
            <Illustration 
              image="choice" 
              header={<Trans i18nKey={"pickSubject"}/>}
              description={<Trans i18nKey={"pickSubject.description"} />}
            />
          : testsSchemas.loading ? 
            <Loader />
          : testsSchemas.error ? 
            <Illustration 
              variant={testsSchemas.error.status === 403 ? "notPermitted" : "fetchError"}
            />
          : testsSchemas.data.length === 0 ? 
            <>
              <Illustration 
                variant={"empty"}
                description={<Trans i18nKey={"testsSchemas.emptyList"} />}
              />
              <Button.Group align="center">
                <Button to="/tests-schemas/add" variant="text">
                  <Trans i18nKey={"testsSchema.createNew"}/>
                </Button>
            </Button.Group>
            </>
          :
          <>
            <div className="segment">
              <Table tests={testsSchemas.data} />
            </div>
            <Button.Group align="right">
              <Button to="/tests-schemas/add" variant="text" icon="plus">
                <Trans i18nKey={"testsSchema.createNew"}/>
              </Button>
            </Button.Group>
            
          </>
        }
      </>
    )

  }

}

const READ = state => ({
  subjects: state.subjects,
  testsSchemas: state.testsSchemas.list
})

const EMIT = dispatch => ({
  fetchTestsSchemasList: payload => dispatch(fetchTestsSchemasList(payload))
})

export default connect(READ, EMIT)(TestsSchemasList);