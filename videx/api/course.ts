import { LessonStatus } from './lesson';

export interface GETCourses {
  metadata: {
    adminAccess: boolean;
  };
  courses: {
    metadata: {
      contributorAccess: boolean;
      ownerAccess: boolean;
    };
    id: string;
    name: string;
  }[];
}

export interface GETCourseEdit {
  id: string;
  name: string;
  releaseDate: Date;
}

export interface GETCourse {
  metadata: {
    id: string;
    name: string;
    releaseDate: Date;
    adminAccess: boolean;
  };
  lessons: {
    metadata: {
      status: LessonStatus;
      publish: boolean;
    };
    id: string;
    name: string;
    summary: string;
    preview: string;
    releaseDate: string;
  }[];
}

export interface GETCourseShareableLink {
  link: string;
}
