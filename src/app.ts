/* node native */
/* External modules aka 3rd party */
import * as Request from "request"
/* namespaces aka Internal modules */
import {html, ICallback, Utils} from "./utils";

export default class App {

  private r: Request.CoreOptions;

  constructor() {
    this.r = Request.defaults({
      jar: true,
      gzip: true,
      headers:
      {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.8,en;q=0.6',
        'Connection': 'keep-alive',
        'Host': 'vshare.io',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
      }
    });
  }

  doAjax(uri: string, ugly: any) {
    return new Promise(function(resolve, reject) {
      Request(uri, ugly, (err, res, body) => {
        if (err || res.statusCode != 200) {
          return reject(err);
        }
        console.log("done una")
        resolve(body);
      });
    });
  }
  
  get(urls: string | Array<string>, callback: ICallback): void {    
    //let downloadLinks: Array<string>;
    if (typeof urls == "string"){
      urls = [urls];
    }
    let promises: Array<{}> = new Array();
    for (let i = 0; i < urls.length; ++i) {
      promises.push(this.doAjax(urls[i], this.r));
    }
    Promise.all(promises).then((body:any) => {
      console.log("YEYEYE")
    }, (err) => {
      console.log(err)
    });

    // url.forEach((elem: string) => {
    //   Request(elem, this.r, (err, res, body) => {
    //     if (err || res.statusCode != 200) {
    //       callback(err)
    //     }
    //     let link = Utils.getLink(body);
    //     downloadLinks.push(link);
    //   });

    //   // hay que promisify esto y la concha de tu madre all boys
    //   callback(null, downloadLinks);
    // });
  }
}

let hera: App = new App();

//sexy
// ( value >= 0.5 )
//   ? callback( null, value )
//   : callback( new Error( "Oops, random number too low." ) )