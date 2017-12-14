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
          const stream:any = [];
          response.on('data', (chunk:any) => stream.push(chunk));
          response.on('end', () => {
            let document = stream.join('');
            let res = {
              link: Utils.getLink(document), 
              fileName: Utils.getFileName(document)
            };
            resolve(res)
          });
        });
        req.on('error', (err:any) => reject(err))
      })
  }
  
  /**
   * returns the "wget-able" files' of a given vshare url(s)
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
      .then((htmls) => callback(null, htmls))
      .catch((err) => callback(err));
  }

  static wget(url: string, filename: string, callback: any): void {
    progress(request(url))
      .on('progress', function (state:any) {
        let output: string =
            `${filename.substr(0,14)} | `
            +`${(state.percent*100).toFixed(1)}% | `
            +`ETA ${Utils.msTom(state.time.remaining)}`;
        console.log(output);
    }).on('error', function (err:any) {
        console.log(err)
    }).on('end', function () {
        console.log("easy peasy lemon squeezy")
        callback();
    }).pipe(fs.createWriteStream("test/out/" + filename));
  }

  static download(links: string | Array<string>): void {
    if (typeof links == "string") {
      links = [links];
    }
    // first, le' me get the wgetable url of EVERY vshare link
    App.get(links, (err: Error, res: any) => {
      if (err) {
        throw new Error("Couldn't fetch some of the links");
      }
      // synchronize sequence of async wget's
      // one download at a time. The internet bandwidth dawg!!
      // smells like déclassé code :(
      (function next(i:number){
        if (i < res.length) {
          let fileName = res[i].fileName + res[i].link.substr(-4);
          App.wget(res[i].link, fileName, ()=>{next(++i)});
        }
      })(0);
    });    
  }

}
