import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}

      <button
        className='yellow white-text darken-3 btn-flat'
        onClick={onCancel}>
        back
      </button>

      <button className='green white-text btn-flat right'>
        Send Survey <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
