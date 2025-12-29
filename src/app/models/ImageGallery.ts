export class ImageGallery {
    constructor(
      public active: boolean,
      public id: number,
      public title: string,
      public description: string,
      public releasedBy: string,
      public link: string,
      public language: string,
      public type: string,
    ) {}
  }
  