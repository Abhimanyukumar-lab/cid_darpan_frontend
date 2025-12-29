export class NewsEvents {
    constructor(
      public active: boolean,
      public id: number,
      public title: string,
      public description: string,
      public link: string,
      public language: string,
      public type: string,
    ) {}
  }
  