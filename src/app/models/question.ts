export class Question {
    constructor(
        public active: boolean,
        public id: number,
        public questionName: string,
        public questionDescription: string,
        public answer1Title: string,
        public answer2Title: string,
        public answer3Title: string,
         
    ) { }
}