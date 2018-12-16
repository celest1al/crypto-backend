const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const BASE_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=IDR";
const API_KEY = "a2d6e4f1-17d3-4bb1-b7c5-a2ec2ff8ba14";

app.use(cors());

app.get("/cryptocurrencies", (req, res, next) => {
    if (Object.keys(req.query).length > 2) {
        axios.get(`${BASE_URL}&sort=${req.query.sort}&sort_dir=${req.query.sort_dir}&start=${req.query.start}&limit=${req.query.limit}`,{
            headers: {
                "X-CMC_PRO_API_KEY": API_KEY
            }
        })
        .then((response) => {
            res.send(response.data.data)
        })
        .catch(error => {
            res.send(error.response.data)
        })
    } else {
        axios.get(`${BASE_URL}&start=${req.query.start}&limit=${req.query.limit}`,{
            headers: {
                "X-CMC_PRO_API_KEY": API_KEY
            }
        })
        .then(response => {
            res.send(response.data.data)
        })
        .catch(error => {
            res.send(error.response.data)
        })
    }
})

app.listen(4444, () => {
    console.log("Server is running on http://localhost:4444")
})
