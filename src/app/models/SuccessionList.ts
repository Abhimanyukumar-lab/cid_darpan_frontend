export class SuccessionList {
    constructor(
      public active: boolean,
      public id: number,
      public title: string,
      public releasedBy: string,
      public link: string,
      public date: string,
      public description: string,
      public priority: number,
      public language: string,
      public type: string
    ) {}
  }