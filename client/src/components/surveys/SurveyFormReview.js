import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../actions';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const navigate = useNavigate();

  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}

      <button
        className='yellow white-text darken-3 btn-flat'
        onClick={onCancel}>
        back
      </button>

      <button
        onClick={() => submitSurvey(formValues, navigate)}
        className='green white-text btn-flat right'>
        Send Survey <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
