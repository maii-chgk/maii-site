require("dotenv").config();

const { default: axios } = require("axios");

const apiUrl = process.env.API_URL;
const apiPageSize = 500;

module.exports = async () => {
  try {
    const res = await axios.get(`${apiUrl}/news-items?_limit=${apiPageSize}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
