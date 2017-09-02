export interface html extends String {}

export interface ICallback {
    ( error: Error|null, result?: any ) : void;
}

export class Utils {
  static getLink(body: html): string {
    let patt: RegExp  = /href\=\"(.+)\"\>Click\shere/gi
      , match: RegExpExecArray|null = patt.exec(<string> body)
    
    // pretty null check.
    // but no error is thrown
    //return match![1];

    if (!match)
      throw new Error("Couldn't find link");
    
    return match[1];
  }
}