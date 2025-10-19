export interface File {
  name: string;
  url: string;
  isMain?: boolean;
}

export interface Lesson {
  title: string;
  youtubeId?: string;
  videoUrl?: string;
  files?: File[];
}

export interface Chapter {
  id: string;
  title: string;
  introduction: Lesson;
  content: Lesson[];
}

export interface CourseData {
  title: string;
  chapters: Chapter[];
}

export interface User {
  name: string;
  email: string;
  password?: string; // Should not be stored long-term in a real app
  unlockedChapters: string[];
  avatar: string;
}
