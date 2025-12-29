import { MajorHead } from './MajorHead';
import { SubMajorHead } from './SubMajorHead';

export class ModusOperation {
  constructor(
    public active: boolean,
    public cidCrimeCategory: MajorHead,
    public cidCrimeCategoryId: number,
    public cidCrimeCategoryType: SubMajorHead,
    public cidCrimeSubCategoryId: number,
    public createdBy: any,
    public createdDate: any,
    public crimeCategoryName: string,
    public crimeSubCategoryTypeName: string,
    public descriptionDetails: string,
    public id: number,
    public name: string,
    public updatedBy: any,
    public updatedDate: any
  ) {}
}
