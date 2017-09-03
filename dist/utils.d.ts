export interface html extends String {
}
export interface ICallback {
    (error: Error | null, result?: any): void;
}
export declare class Utils {
    static getLink(body: html): string;
}
