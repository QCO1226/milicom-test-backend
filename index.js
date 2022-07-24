const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

var  corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) =>{
    res.json({message: 'Welcome to the milicom test'})
})

app.get('/comics/total', (req, res) =>{
    axios.get('https://xkcd.com/info.0.json')
        .then((response) =>{
            res.json({total: response.data.num});
        })
        .catch((error)=>{
            res.json(error);
        })
})

app.get('/comic/:id', (req, res) =>{
    const id = req.params.id;

    axios.get(`https://xkcd.com/${id}/info.0.json`)
        .then((response) =>{
            res.json(response.data);
        })
        .catch((error)=>{
            res.json(error);
        })
})

app.listen({port: process.env.PORT || 4000}, ()=>{
    console.log("Server is running")
})
