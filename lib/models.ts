import mongoose, { Model, Schema } from "mongoose";

export type UserRole = "admin" | "teacher" | "student";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  approved: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "teacher", "student"], default: "student" },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const LectureEntrySchema = new Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

export interface ICourse extends mongoose.Document {
  title: string;
  description: string;
  teacherId: mongoose.Types.ObjectId;
  fee: number;
  published: boolean;
  students: mongoose.Types.ObjectId[];
  lectures: { _id: mongoose.Types.ObjectId; title: string; videoUrl: string; order: number }[];
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fee: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lectures: [LectureEntrySchema],
  },
  { timestamps: true },
);

export interface IMeeting extends mongoose.Document {
  studentId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  topic: string;
  requestedAt: Date;
  scheduledFor?: Date;
  status: "requested" | "approved" | "rejected";
}

const MeetingSchema = new Schema<IMeeting>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    requestedAt: { type: Date, default: Date.now },
    scheduledFor: { type: Date },
    status: { type: String, enum: ["requested", "approved", "rejected"], default: "requested" },
  },
  { timestamps: true },
);

export interface IMessage extends mongoose.Document {
  fromUserId: mongoose.Types.ObjectId;
  toUserId: mongoose.Types.ObjectId;
  message: string;
  seen: boolean;
}

const MessageSchema = new Schema<IMessage>(
  {
    fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export interface IBlog extends mongoose.Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorId?: mongoose.Types.ObjectId;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

function getModel<T extends mongoose.Document>(name: string, schema: Schema<T>): Model<T> {
  return (mongoose.models[name] as Model<T>) || mongoose.model<T>(name, schema);
}

export const UserModel = getModel<IUser>("User", UserSchema);
export const CourseModel = getModel<ICourse>("Course", CourseSchema);
export const MeetingModel = getModel<IMeeting>("Meeting", MeetingSchema);
export const MessageModel = getModel<IMessage>("Message", MessageSchema);
export const BlogModel = getModel<IBlog>("Blog", BlogSchema);

export interface IAssignment extends mongoose.Document {
  courseId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  dueAt?: Date;
  submissions: { studentId: mongoose.Types.ObjectId; answer: string; submittedAt: Date }[];
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueAt: { type: Date },
    submissions: [
      {
        studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        answer: { type: String, required: true },
        submittedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export interface IAnnouncement extends mongoose.Document {
  authorId: mongoose.Types.ObjectId;
  title: string;
  body: string;
  audience: "all" | "course";
  courseId?: mongoose.Types.ObjectId;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    audience: { type: String, enum: ["all", "course"], default: "all" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true },
);

export interface IPayment extends mongoose.Document {
  studentId: mongoose.Types.ObjectId;
  courseId?: mongoose.Types.ObjectId;
  amount: number;
  label: string;
  status: "pending" | "paid";
  paidAt?: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    amount: { type: Number, required: true },
    label: { type: String, required: true },
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
    paidAt: { type: Date },
  },
  { timestamps: true },
);

export const AssignmentModel = getModel<IAssignment>("Assignment", AssignmentSchema);
export const AnnouncementModel = getModel<IAnnouncement>("Announcement", AnnouncementSchema);
export const PaymentModel = getModel<IPayment>("Payment", PaymentSchema);
