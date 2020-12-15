// Imports
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const authenticateUser = require("./middlewares/authenticateUser");



const app = express()
const port = 5002

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')   

// Routes
app.get('/', (req, res) => {
    res.render('utama', { title: 'Home Page'})
})

app.get('/utama', (req, res) => {
    res.render('utama', { title: 'Home Page'})
})


app.get('/honda', (req, res) => {
    res.render('honda', { title: 'Motor Honda'})
})

app.get('/yamaha', (req, res) => {
    res.render('yamaha', { title: 'Motor Yamaha'})
})

app.get('/suzuki', (req, res) => {
    res.render('suzuki', { title: 'Motor Suzuki'})
})

app.get('/kawasaki', (req, res) => {
    res.render('kawasaki', { title: 'Motor Kawasaki'})
})


mongoose
  .connect("mongodb+srv://WPAdmin:<LmMJkVUkMTQQ5q4z>@cluster0.vn9p5.mongodb.net/cluster0?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to mongodb cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.urlencoded({ extened: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// cookie session
app.use(
  cookieSession({
    keys: ["Huha"],
  })
);

// route for serving frontend files
app
  .get("/index", (req, res) => {
    res.render("index", { title: 'Pemesanan'});
  })
  .get("/login", (req, res) => {
    res.render("login", { title: 'Login'});
  })
  .get("/register", (req, res) => {
    res.render("register", { title: 'Daftar'});
  })

  .get("/home", authenticateUser, (req, res) => {
    res.render("home", { user: req.session.user, title: 'Klik menu lain.' });
  });

// route for handling post requirests
app
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExits = await User.findOne({ email });

    if (!doesUserExits) {
      res.send("invalid username or password");
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) {
      res.send("invalid useranme or password");
      return;
    }

    // else he\s logged in
    req.session.user = {
      email,
    };


    res.redirect("/home");
  })
  .post("/register", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExitsAlreay = await User.findOne({ email });

    if (doesUserExitsAlreay) {
      res.send("A user with that email already exits please try another one!");
      return;
    }

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword });

    latestUser
      .save()
      .then(() => {
        res.send("registered account!");
        return;
      })
      .catch((err) => console.log(err));
  });

//logout
app.get("/logout", authenticateUser, (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});




app.listen(port, () => console.info(`App listening on port ${port}`))

console.log('Listening at 5002......')
