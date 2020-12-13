const express = require('express');
const router = express.Router();

router.get('/',
    async(req,res) =>{
        res.render('pages/honda');
    }
);

router.post('',
    async(req,res)=> {
        res.render('pages/Honda');
    }
);

console.log('AH MANTAP');