import axios from 'axios';
import { FETCH_USER } from './types';

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

export { fetchUser, handleToken };
