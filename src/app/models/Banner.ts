export class Banners {
  constructor(
    public active: boolean,
    public id: number,
    public name: string,
    public url: string,
    public priority: number,
    public type: string
  ) {}
}