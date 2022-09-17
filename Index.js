var express = require("express");
var app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Html" },
  { id: 2, name: "CSS" },
  { id: 3, name: "JavaScript" },
  { id: 4, name: "React" },
];

// @desc    HomePage
// @route   GET /
app.get("/", (req, res) => {
  res.send("<h1>Welocme to HomePage</h1>");
});

// @desc    Gets All Courses
// @route   GET /api/courses/
app.get("/api/courses/", (req, res) => {
  res.send(courses);
});

// @desc    Gets Single Courses
// @route   GET /api/courses/:id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((x) => x.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Cannot Find the requested resource");
  res.send(course);
});

// @desc    Create a Courses
// @route   POST /api/courses
app.post("/api/courses/", (req, res) => {
  if (!req.body.name && req.body.name.listen < 3)
    return res
      .status(400)
      .send(
        "The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications"
      );

  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(newCourse);
  res.send(courses);
});

// @desc    Update a Courses
// @route   PUT /api/courses/:id
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((x) => x.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Cannot Find the requested resource");

  if (!req.body.name && req.body.name.listen < 3)
    return res
      .status(400)
      .send(
        "The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications"
      );

  course.name = req.body.name;
  res.send(course);
});

// @desc    Delete Courses
// @route   DELETE /api/courses/:id
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((x) => x.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Cannot Find the requested resource");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listning on port ${port}......`));
