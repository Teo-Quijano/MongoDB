require("./bbdd");
const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  teacher_first_name: String,
  teacher_last_name: String,
});

const MarksSchema = new mongoose.Schema({
  date: Date,
  mark: Number,
  student_first_name: String,
  student_last_name: String,
  group_name: String,
  subject_name: String,
  teachers: [TeacherSchema],
});

let MarksModel = mongoose.model("MarkArbol", MarksSchema, "marktArbol");

let alumno1 = new MarksModel({
  date: new Date("2022,03,14"),
  mark: 8,
  student_first_name: "Fields",
  student_last_name: "Charman",
  group_name: "Web Developer",
  subject_name: "Javascript",
  teachers: [
    {
      teacher_first_name: "Leonore",
      teacher_last_name: "Scorrer",
    },
  ],
});

let alumno2 = new MarksModel({
  date: new Date("2022,02,11"),
  mark: 8,
  student_first_name: "Shandee",
  student_last_name: "Rippin",
  group_name: "Data Scientist",
  subject_name: "SQL",
  teachers: [
    {
      teacher_first_name: "Sollie",
      teacher_last_name: "Murdoch",
    },
  ],
});

let alumno3 = new MarksModel({
  date: new Date("2022,02,02"),
  mark: 9,
  student_first_name: "Annnora",
  student_last_name: "Slater",
  group_name: "Mobile Developer",
  subject_name: "HTML",
  teachers: [
    {
      teacher_first_name: "Redd",
      teacher_last_name: "Westlake",
    },
  ],
});

let alumno4 = new MarksModel({
  date: new Date("2022,11,09"),
  mark: 7,
  student_first_name: "Aggie",
  student_last_name: "Leavy",
  group_name: "Ethical Hacker",
  subject_name: "Angular",
  teachers: [
    {
      teacher_first_name: "Car",
      teacher_last_name: "Swatland",
    },
  ],
});

let alumno5 = new MarksModel({
  date: new Date("2022,12,17"),
  mark: 7,
  student_first_name: "Brigg",
  student_last_name: "Coundley",
  group_name: "Data Security",
  subject_name: "Typescript",
  teachers: [
    {
      teacher_first_name: "Audi",
      teacher_last_name: "Sunners",
    },
  ],
});

let alumno6 = new MarksModel({
  date: new Date("2021,08,28"),
  mark: 8,
  student_first_name: "Rodrique",
  student_last_name: "Guinn",
  group_name: "Web Developer",
  subject_name: "Javascript",
  teachers: [
    {
      teacher_first_name: "Leonore",
      teacher_last_name: "Scorrer",
    },
  ],
});

let alumno7 = new MarksModel({
  date: new Date("2021,07,25"),
  mark: 10,
  student_first_name: "Skelly",
  student_last_name: "Ollander",
  group_name: "Data Scientist",
  subject_name: "SQL",
  teachers: [
    {
      teacher_first_name: "Sollie",
      teacher_last_name: "Murdoch",
    },
  ],
});

let alumno8 = new MarksModel({
  date: new Date("2021,09,25"),
  mark: 6,
  student_first_name: "Ailene",
  student_last_name: "Gresswell",
  group_name: "Mobile Developer",
  subject_name: "HTML",
  teachers: [
    {
      teacher_first_name: "Redd",
      teacher_last_name: "Westlake",
    },
  ],
});

let alumno9 = new MarksModel({
  date: new Date("2022,03,05"),
  mark: 7,
  student_first_name: "Alasteir",
  student_last_name: "Stellman",
  group_name: "Ethical Hacker",
  subject_name: "Angular",
  teachers: [
    {
      teacher_first_name: "Car",
      teacher_last_name: "Swatland",
    },
  ],
});

let alumno10 = new MarksModel({
  date: new Date("2021,02,12"),
  mark: 9,
  student_first_name: "Maura",
  student_last_name: "Stothard",
  group_name: "Data Security",
  subject_name: "Typescript",
  teachers: [
    {
      teacher_first_name: "Audi",
      teacher_last_name: "Sunners",
    },
  ],
});

alumno1
  .save()
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno2.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno3.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno4.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno5.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno6.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno7.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno8.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno9.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
    return alumno10.save();
  })
  .then((data) => {
    console.log("Nuevo Alumno Agregado");
  })

  .catch((err) => {
    console.log(err + "Error");
  });

MarksModel.aggregate([
  { $match: { subject_name: "Javascript" } },
  { $group: { _id: null, "Nota Media": { $avg: "$mark" } } },
])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([{ $count: "Numero Total Alumnos" }])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([
  {
    $project: {
      "Nombre Estudiante": "$student_first_name",
      "Apellido Estudiante": "$student_last_name",
      _id: 0,
    },
  },
])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([
  { $unwind: "$teachers" },
  {
    $project: {
      _id: 0,
      "teachers.teacher_first_name": 1,
      "teachers.teacher_last_name": 1,
    },
  },
])
  .then((result) => {
    console.log("Nombres y Apellidos Profesores", result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([
  { $group: { _id: { Grupo: "$group_name" }, "Numero Alumnos": { $sum: 1 } } },
  { $sort: { Grupo: -1 } },
])
  .then((result) => {
    console.log("Nombres Ordenados al Inverso", result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([
  [
    { $group: { _id: "$subject_name", nota_media: { $avg: "$mark" } } },
    { $match: { nota_media: { $gt: 5 } } },
    { $sort: { nota_media: -1 } },
    { $limit: 5 },
  ],
])
  .then((result) => {
    console.log("Tercio Superior de Alumnos/Notas", result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([
  { $unwind: "$teachers" },
  {
    $group: {
      _id: [
        "$teachers.teacher_first_name",
        "$teachers.teacher_last_name",
        "$subject_name",
      ],
      Repeticiones: { $sum: 1 },
    },
  },
])
  .then((result) => {
    console.log("Profesores por Asignatura", result);
  })
  .catch((error) => {
    console.log(error);
  });