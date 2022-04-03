import axios from 'axios';
import { FETCH_SURVEYS, FETCH_USER } from './types';

const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

const handleToken = (token) => async (dispatch) => {
  try {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

const submitSurvey = (values, navigate) => async (dispatch) => {
  try {
    const res = await axios.post('/api/surveys', values);
    dispatch({ type: FETCH_USER, payload: res.data });
    navigate('/surveys');
  } catch (error) {
    console.log(error);
  }
};

const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export { fetchUser, handleToken, submitSurvey, fetchSurveys };
