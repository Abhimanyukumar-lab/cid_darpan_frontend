import { MajorHead } from './MajorHead';

export class SubMajorHead {
  constructor(
    public active: boolean,
    public allowAccused: boolean,
    public allowCashCollection: boolean,
    public allowDeceased: boolean,
    public allowLootedItems: boolean,
    public allowOtherEvidence: boolean,
    public allowVictim: boolean,
    public cidCrimeCategoryId: number,
    public createdBy: any,
    public createdDate: any,
    public crimeCategory: MajorHead,
    public id: number,
    public typeOfCrime: string,
    public updatedBy: any,
    public updatedDate: any
  ) {}
}
