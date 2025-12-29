export class FeedBack {
    constructor(
      public active: boolean,
      public id: number,
      public citizenName: string,
      public citizenEmail: string,
      public citizenMobile: number,
      public feedbackComments: number,
      public districtId: number,
      public districtName: string,
     ) {}
  }
  