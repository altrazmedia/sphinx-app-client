import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { Trans, withTranslation } from "react-i18next";
import moment from "moment";

import { ColumnView } from "components/common";

const PRIMARY_RGB = [28, 139, 106];
const SECONDARY_RGB = [40, 80, 100];

// Finished tests stats
const Stats = props => {
  const { testSchema, t } = props;

  if (testSchema.tests.length === 0) {
    return (
      <div className="segemnt">
        <h2>
          <Trans i18nKey="testSchema.stats.noTests" />
        </h2>
      </div>
    );
  }

  const testsChartData = {
    labels: testSchema.tests.map(
      test =>
        `${test.course.code.toUpperCase()}, ${moment(test.end)
          .local()
          .format("DD.MM.YYYY")}`
    ),
    datasets: [
      {
        data: testSchema.tests.map(test => test.averageScore),
        backgroundColor: `rgba(${SECONDARY_RGB.join(", ")}, .65)`,
        borderColor: `rgb(${SECONDARY_RGB.join(", ")})`,
        borderWidth: 1,
        label: t("testSchema.stats.averageScore"),
      },
    ],
  };

  const questionsChartData = {
    labels: testSchema.questions.map(question => question.content),
    datasets: [
      {
        data: testSchema.questions.map(question => question.asked),
        backgroundColor: `rgba(${SECONDARY_RGB.join(", ")}, .65)`,
        borderColor: `rgb(${SECONDARY_RGB.join(", ")})`,
        borderWidth: 1,
        label: t("testSchema.stats.asked"),
      },
      {
        data: testSchema.questions.map(question => question.answeredCorrectly),
        backgroundColor: `rgba(${PRIMARY_RGB.join(", ")}, .65)`,
        borderColor: `rgb(${PRIMARY_RGB.join(", ")})`,
        borderWidth: 1,
        label: t("testSchema.stats.correct"),
      },
    ],
  };

  return (
    <>
      <div className="segment">
        <ColumnView>
          <ColumnView.Item
            name={<Trans i18nKey="testSchema.stats.totalTests" />}
            value={testSchema.tests.length}
          />
          <ColumnView.Item
            name={<Trans i18nKey="testSchema.stats.totalAttempts" />}
            value={testSchema.totalAttempts}
          />
          <ColumnView.Item
            name={<Trans i18nKey="testSchema.stats.averageScore" />}
            value={<span>{testSchema.averageScore}%</span>}
          />
        </ColumnView>
      </div>
      <div className="segment">
        <h2>
          <Trans i18nKey="testSchema.stats.testsScores" />
        </h2>
        <Bar
          data={testsChartData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 100,
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div className="segment">
        <h2>
          <Trans i18nKey="testSchema.stats.questions" />
        </h2>
        <Bar
          data={questionsChartData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </>
  );
};

Stats.propTypes = {
  testSchema: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    tests: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalAttempts: PropTypes.number.isRequired,
    averageScore: PropTypes.number.isRequired,
  }),
};

export default withTranslation()(Stats);
