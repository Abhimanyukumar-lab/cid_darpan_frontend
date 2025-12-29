export class CriminalList {
    constructor(
      public active: boolean,
      public id: number,
      public title: string,
      public description: string,
      public link: string,
      public priority: number,
      public language: string,
      public type: string,
    ) {}
  }
  