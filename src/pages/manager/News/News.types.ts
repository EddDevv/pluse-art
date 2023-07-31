export interface INewsList {
  items: INews[];
  totalCount: number;
  currentPage: number;
}

export interface INews {
  id: string;
  objectName: string;
  desc: string;
  text: string;
  image: string;
  imageGallery: string[];
  publishDate: string;
  isPublic: boolean;
  visitorsCount: number;
}

// export type IFormInput = {
//   publishedAt: string;
//   expiredAt: string;
//   isPublic: boolean;
//   image: File[] | string;
// };
export type IFormInput = {
  objectName: string;
  desc: string;
  text: string;
  publishTimestamp: Date | number | string;
  finishTimestamp?: Date | number | string;
  isPublic: boolean;
};

export type IContent = {
  lang: string;
  title: string;
  preview: string;
  text: string;
};
