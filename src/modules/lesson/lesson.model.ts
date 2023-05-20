import mongoose from "mongoose";
import { student } from "../student/student.model";

export const lesson = "Lesson";

const Schema = mongoose.Schema;

export const LessonModel = new Schema(
  {
    name: { type: String },
    studentId: { type: Schema.Types.ObjectId, ref: student },
  },
  { timestamps: true }
);

LessonModel.index({ name: "text" }, { weights: { name: 1 } });

export const LessonProviders = [
  {
    provide: "LESSON_MODEL",
    useFactory: (connection: mongoose.Connection) =>
      connection.model(lesson, LessonModel),
    inject: ["DATABASE_CONNECTION"],
  },
];
