// completeness-summary.model.ts
export interface Completeness {
    level: string;
    name: string;
    type: string;
    total: number;
    complete100: number;
    above50: number;
    below50: number;
}