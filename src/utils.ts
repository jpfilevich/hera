export interface html extends String {}

export interface ICallback {
    ( error: Error|null, result?: any ) : void;
}

export class Utils {
  static getLink(body: string): string {
    let patt: RegExp  = /href\=\"(.+)\"\>Click\shere/gi
      , match: RegExpExecArray|null = patt.exec(<string> body)
    
    // pretty null check.
    // but no error is thrown
    //return match![1];

    if (!match)
      throw new Error("Couldn't find link");
    
    return match[1];
  }

  static getFileName(body: string): string {
    let patt: RegExp  = /\<div\sid\=\"404\"\sstyle\=\".+\"\>(\s|\n)?(.+)\<br\/\>\s?\<iframe/mgi
      , match: RegExpExecArray|null = patt.exec(<string> body)

    if (!match)
      //throw new Error("Couldn't find link");
      return `download-${Math.random().toString().substr(10,5)}`
    
    return match[2];
  }

  /**
   * milliseconds to minutes:seconds
   */
  static msTom(ms:number):string {
    let m:number = Math.floor(ms / 60000)
      , s:string = ((ms % 60000) / 1000).toFixed(0);
    return `${m}m:${s}s`;
  }
}