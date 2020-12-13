const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

const IndexRoutes = require('./routers/index');
const HondaRoutes = require('./routers/Honda');
const KawasakiRoutes = require('./routers/Kawasaki');
const ReserveRoutes = require('./routers/Reserve');
const SuzukiRoutes = require('./routers/Suzuki');
const YamahaRoutes = require('./routers/Yamaha');

app.use('/index', IndexRoutes);

app.listen(8085);

console.log('tes');