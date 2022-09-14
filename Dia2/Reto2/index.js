require("./bbdd");
const mongoose = require("mongoose");

const teachersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  groups: [String],
});

const subjectsSchema = new mongoose.Schema({
  title: String,
  teachers: [teachersSchema],
});

const marksSchema = new mongoose.Schema({
  date: Date,
  mark: Number,
  subject: subjectsSchema,
});

const studentsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  marks: [marksSchema],
});

let StudentModel = mongoose.model(
  "StudentArbol",
  studentsSchema,
  "studentArbol"
);

let student1 = new StudentModel({
  firstName: "Audi",
  lastName: "Sunners",
  marks: [
    {
      date: new Date("2022"),
      mark: 6,
      subject: {
        title: "Javascript",
        teachers: [
          {
            firstName: "Tonnie",
            lastName: "MacKessock",
            groups: ["Web Developer"],
          },
        ],
      },
    },
  ],
});

let student2 = new StudentModel({
  firstName: "Ailene",
  lastName: "Gresswell",
  marks: [
    {
      date: new Date("2022"),
      mark: 9,
      subject: {
        title: "HTML",
        teachers: [
          {
            firstName: "Maura",
            lastName: "Stothard",
            groups: ["Data Scientist"],
          },
        ],
      },
    },
  ],
});

let student3 = new StudentModel({
  firstName: "Skelly",
  lastName: "Ollander",
  marks: [
    {
      date: new Date("2022"),
      mark: 7,
      subject: {
        title: "Angular",
        teachers: [
          {
            firstName: "Brigg",
            lastName: "Coundley",
            groups: ["Ethical Hacker"],
          },
        ],
      },
    },
  ],
});

let student4 = new StudentModel({
  firstName: "Stanfield",
  lastName: "Drever",
  marks: [
    {
      date: new Date("2022"),
      mark: 10,
      subject: {
        title: "Typescript",
        teachers: [
          {
            firstName: "Redd",
            lastName: "Westlake",
            groups: ["Mobile Developer"],
          },
        ],
      },
    },
  ],
});

student1
  .save()
  .then((data) => {
    console.log("Documento agregado");
    return student2.save();
  })
  .then((data) => {
    console.log("Documento agregado");
    return student3.save();
  })
  .then((data) => {
    console.log("Documento agregado");
    return student4.save();
  })
  .then((data) => {
    console.log("Documento agregado");
  })
  .catch((err) => {
    console.log(err + "Error al Guardar");
  });

StudentModel.find({ firstName: "Audi" })
  .then(function (item) {
    let notas = item[0].marks;
    for (let i = 0; i < notas.length; i++) {
      console.log("Notas: " + notas[i].mark);
    }
  })
  .catch(function () {
    console.log("Error");
  });

StudentModel.find({ firstName: "Ailene" })
  .then(function (items) {
    let asignatura = items[0].marks;
    for (let i = 0; i < asignatura.length; i++) {
      console.log("Asignaturas: " + asignatura[i].subject.title);
    }
  })
  .catch(function (err) {
    console.log("Error" + err);
  });

StudentModel.find({ firstName: "Skelly" })
  .then(function (items) {
    let asignatura = items[0].marks;
    for (let i = 0; i < asignatura.length; i++) {
      console.log("Profesores: " + asignatura[i].subject.teachers);
    }
  })
  .catch(function (err) {
    console.log("Error" + err);
  });