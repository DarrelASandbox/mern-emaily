import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Header = () => <h1>Header</h1>;
const Landing = () => <a href='/auth/google'>Sign In With Google</a>;
const Dashboard = () => <h1>Dashboard</h1>;
const SurveyNew = () => <h1>SurveyNew</h1>;

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/surveys' element={<Dashboard />} />
      <Route path='/surveys/new' element={<SurveyNew />} />
    </Routes>
  </BrowserRouter>
);

export default App;
