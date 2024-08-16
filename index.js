import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;
const yourBearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VkMjBlMDU3ZjY3YzA0Njc4ODQyMWJhZTA3NjI1NiIsIm5iZiI6MTcyMjg3MzQ1Mi4yNTQzNjMsInN1YiI6IjY2YjBmNGJmNTUwNDZjZjIzOWViNzc4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0omKPI04MmliYldMTJUoYWreUqHUj9DlinE5-HDU6TE';
const config = { 
  headers: {
    Authorization: `Bearer ${yourBearerToken}`
  } 
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static("public"));
app.set("view engine", "ejs"); 



// API route to fetch movies based on page number
app.get(`/`, async (req, res) => {
  const page = req.query.page || 1;
  
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}`, config);
    const result = response.data;
    res.render('index.ejs', {content : result});
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});