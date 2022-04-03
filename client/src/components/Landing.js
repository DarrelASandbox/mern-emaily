import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Emaily!</h1>
      <p>Collect feedback from your users</p>
      <div className='fixed-action-btn'>
        <Link to='/surveys/new' className='btn-floating btn-large red'>
          <i className='large material-icons'>add</i>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
