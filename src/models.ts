import { Schema, model, Document } from 'mongoose';

interface IPublication extends Document {
  title: string;
  author: string;
  link: string;
  publishedDate: Date;
}

const publicationSchema = new Schema<IPublication>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  link: { type: String, required: true },
  publishedDate: { type: Date, required: true },
});

const Publication = model<IPublication>('Publication', publicationSchema);

export default Publication;
