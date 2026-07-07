import express from "express";
import fs from "fs";
import csv from "csv-parser";

const app = express();
const PORT = 8000;

let students = [];

fs.createReadStream("StudentsPerformance.csv")
  .pipe(csv())
  .on("data", (row) => students.push(row))
  .on("end", () => {
    console.log("CSV Loaded");
  });

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/top10", (req, res) => {
  res.json(students.slice(0, 10));
});

app.get("/students/info", (req, res) => {
  const columns = Object.keys(students[0]);

  const info = columns.map((column) => ({
    column,
    type: typeof students[0][column],
    nonNullCount: students.filter((s) => s[column] !== "").length,
  }));

  res.json(info);
});

app.get("/students/nulls", (req, res) => {
  const result = {};

  Object.keys(students[0]).forEach((column) => {
    result[column] = students.filter(
      (row) =>
        row[column] === "" || row[column] === null || row[column] === undefined,
    ).length;
  });

  res.json(result);
});

app.get("/students/stats", (req, res) => {
  const numericColumns = ["math score", "reading score", "writing score"];

  const stats = {};

  numericColumns.forEach((column) => {
    const values = students.map((s) => Number(s[column]));

    const sum = values.reduce((a, b) => a + b, 0);

    stats[column] = {
      min: Math.min(...values),
      max: Math.max(...values),
      mean: sum / values.length,
    };
  });

  res.json(stats);
});

app.get("/students/education-count", (req, res) => {
  const count = {};

  students.forEach((student) => {
    const education = student["parental level of education"];
    count[education] = (count[education] || 0) + 1;
  });

  res.json(count);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
