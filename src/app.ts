/* node native */
/* External modules aka 3rd party */
import * as Request from "request"
/* namespaces aka Internal modules */
import {html, ICallback, Utils} from "./utils";

export default class App {

  private getContent(url: string) {
    // return new pending promise
    return new Promise((resolve, reject) => {
        // select http or https module, depending on reqested url
        const lib = url.startsWith('https') ? require('https') : require('http');
        const request = lib.get(url, (response: any) => {
          // handle http errors
          if (response.statusCode < 200 || response.statusCode > 299) {
             reject(new Error('Failed to load page, status code: ' + response.statusCode));
           }
          // temporary data holder
          const body:any = [];
          // on every content chunk, push it to the data array
          response.on('data', (chunk:any) => body.push(chunk));
          // we are done, resolve promise with those joined chunks
          response.on('end', () => resolve(body.join('')));
        });
        // handle connection errors of the request
        request.on('error', (err:any) => reject(err))
      })
  }
  
  public get(urls: string | Array<string>, callback: ICallback): void {
    if (typeof urls == "string"){
      urls = [urls];
    }
    let promises: Array<{}> = new Array();
    for (let i = 0; i < urls.length; ++i) {
      promises.push(this.getContent(urls[i]));
    }
    Promise.all(promises)
      .then((html) => callback(null, html))
      .catch((err) => callback(err));
  }
}