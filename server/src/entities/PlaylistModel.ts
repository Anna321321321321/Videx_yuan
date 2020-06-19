import { Mongoose, IPlaylistSchema } from 'videx/server/mongodb';
import IPlaylist from './IPlaylist';
import * as uuid from 'uuid';

export default class PlaylistModel implements IPlaylist {
  private document_: IPlaylistSchema;

  constructor(document) {
    this.document_ = document;
  }

  public getName(): string {
    return this.document_.name;
  }

  public toObject(): {
    id: string;
    lessons: {
      name: string;
      _id: string;
      preview: string;
      duration: string;
      releaseDate: Date;
    }[];
    courseId: string;
    name: string;
  } {
    return {
      id: this.document_.id,
      lessons: this.document_.lessons,
      courseId: this.document_.courseId,
      name: this.document_.name
    };
  }

  public getId(): string {
    return this.document_._id;
  }

  public static async findByPlaylistName(name: string): Promise<any> {
    const document = await Mongoose.find('Playlist', { name: name });
    return document;
  }

  public static async findByCourseId(courseId: string): Promise<any> {
    const documents = await Mongoose.find('Playlist', { courseId: courseId });
    return documents;
  }

  public static async findByCourseIdAndName(
    courseId: string,
    name: string
  ): Promise<IPlaylist[]> {
    const documents = await Mongoose.find('Playlist', {
      courseId: courseId,
      name: name
    });
    return documents.map(document => new PlaylistModel(document));
  }

  public static async findById(id: string): Promise<IPlaylist> {
    const document: any = await Mongoose.findById('Playlist', id);
    return document ? new PlaylistModel(document) : null;
  }

  public static async create(
    lessons: {
      name: string;
      _id: string;
      preview: string;
      duration: string;
      releaseDate: Date;
    }[],
    courseId: string,
    name: string
  ): Promise<IPlaylist> {
    const id = uuid.v4();
    await Mongoose.create('Playlist', {
      _id: id,
      lessons: lessons,
      courseId: courseId,
      name: name
    });

    return await PlaylistModel.findById(id);
  }

  public async setLessons(lessons) {
    this.document_ = await Mongoose.findByIdAndUpdate(
      'Playlist',
      this.document_.id,
      {
        $set: {
          lessons: lessons
        }
      }
    );
  }
}
