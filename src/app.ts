/* node native */
import * as fs from "fs"
/* External modules */
import * as request from "request"
const progress = require('request-progress');
/* namespaces */
import {html, ICallback, Utils} from "./utils";

export default class App {

  static getContent(url: string) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? require('https') : require('http');
        const req = lib.get(url, (response: any) => {
          if (response.statusCode < 200 || response.statusCode > 299) {
             reject(new Error('Failed to load page, status code: ' + response.statusCode));
           }
          const body:any = [];
          response.on('data', (chunk:any) => body.push(chunk));
          response.on('end', () => resolve(body.join('')));
        });
        req.on('error', (err:any) => reject(err))
      })
  }
  
  /**
   * returns the "wget-able" files's url of a given vshare link
   */
  static get(urls: string | Array<string>, callback: ICallback): any {
    if (typeof urls == "string"){
      urls = [urls];
    }
    let promises: Array<{}> = new Array();
    for (let i = 0; i < urls.length; ++i) {
      promises.push(App.getContent(urls[i]));
    }
    Promise.all(promises)
      .then((htmls) => callback(null, htmls.map(Utils.getLink)))
      .catch((err) => callback(err));
  }

  static wget(url: string, filename: string, callback: any): void {
    progress(request(url))
      .on('progress', function (state:any) {
        let output: string =
            `${filename}: downloaded ${state.percent*100}% - \
            at ${Math.round(state.speed/100*60)}MiB/s -\
            ETA ${Utils.msTom(state.time.remaining)}`
        console.log(output);
    }).on('error', function (err:any) {
        console.log(err)
    }).on('end', function () {
        console.log("easy peasy lemon squeezy")
        callback();
    }).pipe(fs.createWriteStream('test/out/' + filename));
  }

  static download(links: string | Array<string>): void {
    if (typeof links == "string") {
      links = [links];
    }
    // first, le' me get the wgetable url of EVERY vshare link
    App.get(links, (err: Error, res: any) => {
      if (err){
        throw new Error("Couldn't fetch some of the links");
      }
      // synchronize sequence of async wget's
      // one download at a time. The internet bandwidth dawg!!
      // smells like déclassé code :(
      (function next(i:number){
        if (i < res.length) {
          App.wget(res[i], `download-${Math.random().toString().substr(10,5)}`, ()=>{next(++i)});
        }
      })(0);

    });    
  }
}