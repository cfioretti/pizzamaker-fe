import axios from 'axios';
import Config from '../Config/Config';

axios.defaults.baseURL = Config.baseurl;

export default axios;
