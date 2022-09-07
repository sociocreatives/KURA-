import { render } from 'react-dom';
import App from './App';
import './App.css';
import './main.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// eslint-disable-next-line react/jsx-filename-extension
render(<App />, document.getElementById('root'));
