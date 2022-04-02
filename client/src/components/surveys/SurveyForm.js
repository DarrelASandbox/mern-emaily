import { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Title', name: 'title' },
  { label: 'Subject', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'email' },
];

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ label, name }) => (
      <Field
        key={name}
        name={name}
        component={SurveyField}
        type='text'
        label={label}
      />
    ));
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit((values) => console.log(values))}>
          {this.renderFields()}
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'surveyForm' })(SurveyForm);
