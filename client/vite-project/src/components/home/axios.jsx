import axios from "axios";
const axiosBase = axios.create({
	baseURL: "http://localhost:1234/api",
});
export default axiosBase;