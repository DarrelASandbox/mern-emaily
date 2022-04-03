import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => (
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
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat white-text'>
            cancel
          </Link>
          <button type='submit' className='teal btn-flat right white-text'>
            next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) errors[name] = 'You must provide a value';
  });
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
