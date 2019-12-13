let express = require('express')
let db = require('./models')
let app = express();
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/articles', (req, res) => {
    db.article.findAll()
    .then(articles => {
        res.render('articles/show', { articles })
    })
    .catch(function(err){
    console.log('Err', err)
    res.render('error')
})
    res.render('articles/index');
  });

app.get('/new', (req, res) => {
    res.render('articles/new');
  });

app.get('/articles/:id', (req, res) => {
    res.render('articles/show')
})


app.post('/new', function(req, res) {
    console.log('Posted!')
    db.article.create(req.body)
    .then(newArticle => {
        console.log('Wow.')
        res.redirect('articles/show')
    })
    .catch(err => {
        console.log('Err', err)
        res.render('error')
    })
})

app.listen(3000, () => {console.log('🦥Rootin and Tootin🦦')})

// app.post('/faves', (req, res) => {
//     db.movie.create(req.body)
//     .then(newMovie => {
//       console.log('YAY!')
//       res.redirect('/faves')
//     })
//     .catch(err => {
//       console.log('Err', err) //Message appears on terminal (for developer)
//       res.render('error') //Vague error page shown to user.
//     })
//   })