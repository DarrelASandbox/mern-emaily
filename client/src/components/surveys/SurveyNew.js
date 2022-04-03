import { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { new: true };
  //   }

  state = { showFormReview: false };

  renderContent() {
    return this.state.showFormReview ? (
      <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false })}
      />
    ) : (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// If SurveyNew is unmounted, (default behavior by redux form)
// dump form values with reduxForm({ form: 'surveyForm' })
// Refer to SurveyForm.js destroyOnUnmount: false
export default reduxForm({ form: 'surveyForm' })(SurveyNew);
