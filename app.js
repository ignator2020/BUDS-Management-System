const express = require('express');
const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended:false,limit:"2mb"}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json({limit:"2mb"}));

const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3000;

const instituteRouter = require('./src/routes/instituteRoutes')();

app.use('/institute', instituteRouter);

app.get('/', (req, res) => {
  res.send('Buds Management API.')
});

app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}.`);
});
