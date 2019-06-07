import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Trans, withTranslation } from "react-i18next";
import { Select, Illustration, Loader, PageHeader, Button, FAB } from "components/common";

import Table from "./Table";

import { fetchTestsSchemasList } from "actions/testsSchemasActions";

class TestsSchemasList extends PureComponent {

  componentDidMount = () => {
    if (this.props.subjectSelected) {
      this.props.fetchTestsSchemasList({ subject: this.props.subjectSelected })
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.subjectSelected !== prevProps.subjectSelected) {
      this.props.fetchTestsSchemasList({ subject: this.props.subjectSelected })
    }
  }

  render = () => {

    const { subjectSelected, changeSubject, subjects, testsSchemas } = this.props;

    return (
      <>
        <PageHeader 
          header={<Trans i18nKey="testsSchemas.header" />} 
          description={<Trans i18nKey="testsSchemas.description" />} 
        />
        <p>
          <Trans i18nKey="testsSchemas.info.a" />
        </p>
        <p>
          <Trans i18nKey="testsSchemas.info.b" />
        </p>
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
            <FAB to="/tests-schemas/add" icon="plus" />
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

export default connect(READ, EMIT)(withTranslation()(TestsSchemasList));