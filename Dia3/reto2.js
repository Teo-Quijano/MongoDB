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

MarksModel.aggregate([
  {
    $match: {
      $or: [{ mark: { $gt: 8 } }, { date: { $lt: new Date("2021,12,31") } }],
    },
  },
  {
    $project: { _id: 0, student_first_name: 1, student_last_name: 1, mark: 1 },
  },
])
  .then((result) => {
    console.log("Notas mayores a 8 o del Año Pasado", result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([
  { $match: { date: { $lt: new Date("2021,09,15") } } },
  { $group: { _id: [{ $avg: "$mark" }, "$subject_name"] } },
])
  .then((result) => {
    console.log("Notas Ultimos 12 Meses", result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([
  { $match: { date: { $lt: new Date("2021,09,15") } } },
  {
    $group: {
      _id: { Alumno: "$student_first_name", "Nota Media": { $avg: "$mark" } },
    },
  },
])
  .then((result) => {
    console.log("Nota Media por Alumno 12 Meses", result);
  })
  .catch((error) => {
    console.log(error);
  });

MarksModel.aggregate([
  { $unwind: "$teachers" },
  { $match: { "teachers.teacher_first_name": "Audi" } },
  {
    $group: {
      _id: {
        Alumno: "$student_first_name",
        Asignatura: "$subject_name",
        Profesor: "$teachers.teacher_first_name",
      },
    },
  },
])
  .then((result) => {
    console.log("Nombre de Alumno asignados al Profesor", result);
  })
  .catch((error) => {
    console.log(error);
  });