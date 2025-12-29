export class CIDUploadCase {
  constructor(
  // Basic Info
  public active: boolean,
  public id: number,
  public districtId: number,
  public districtName: string,
  public designationId: number,
  public designationName: string,
  public subdivisionId: number,
  public subdivisionName: string,
  public circleOfficerName: string,
  public circleName: string,
  public circleContact: string,
  public circleMobile: string,
  public circleEmail: string,
  public circleAddress: string,
  public circleImage: string,
  public joiningDate: string,
  public priority: number,

  // Crime Info
  public cidCrimeCategoryName: string,
  public cidCrimeCategoryTypeName: string,
  public cidCrimeModusName: string,
  public policestationName: string,
  public ioName: string,
  public srNSR: string,
  public ioMobile: string,
  public caseNo: string,
  public section: string,
  public placeOfOccurance: string,
  public location: string,
  public address1: string,
  public address2: string,
  public date: string, // or Date
  public cashCollection: string,
  public lootedItems: string,
  public otherEvidence: string,
  public remark: string,

  // Complainant Info
  public nameComplainant: string,
  public ageComplainant: string,
  public genderComplainant: string,
  public contactComplainant: string,
  public fatherNameComplainant: string,
  public motherNameComplainant: string,

  // Accused Info
  public accusedName: string,
  public accusedContact: string,

  // Chargesheet Info
  public chargesheet: string,
  public chargesheetDetails: string,

  // FIR Info
  public firNonFir: string,
  public reportDate: string,
  public caseDate: string
  ) {}
}
