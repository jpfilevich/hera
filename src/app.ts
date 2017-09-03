/* node native */
import * as fs from "fs"
/* External modules */
import * as request from "request"
const progress = require('request-progress');
/* namespaces */
import {url, html, ICallback, Utils} from "./utils";

export default class App {

  private getContent(url: string) {
    // return new pending promise
    return new Promise((resolve, reject) => {
        // select http or https module, depending on reqested url
        const lib = url.startsWith('https') ? require('https') : require('http');
        const req = lib.get(url, (response: any) => {
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
        req.on('error', (err:any) => reject(err))
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

  public download(urls: string | Array<string>, callback: ICallback): void {
    if (typeof urls == "string"){
      urls = [urls];
    }
    // The options argument is optional so you can omit it 
    progress(request('https://az412801.vo.msecnd.net/vhd/VMBuild_20141027/VirtualBox/IE11/Windows/IE11.Win8.1.For.Windows.VirtualBox.zip'), {
        // throttle: 2000,                    // Throttle the progress event to 2000ms, defaults to 1000ms 
        // delay: 1000,                       // Only start to emit after 1000ms delay, defaults to 0ms 
        // lengthHeader: 'x-transfer-length'  // Length header to use, defaults to content-length 

    }).on('progress', function (state:any) {
        console.log('progress', state);

    }).on('error', function (err:any) {
        console.log("error happend")

    }).on('end', function () {
        console.log("end happend")
        callback(null);

    }).pipe(fs.createWriteStream('IE11.Win8.1.For.Windows.VirtualBox.zip'));
  }
}