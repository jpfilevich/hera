"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* node native */
const fs = require("fs");
/* External modules */
const request = require("request");
const progress = require('request-progress');
class App {
    getContent(url) {
        // return new pending promise
        return new Promise((resolve, reject) => {
            // select http or https module, depending on reqested url
            const lib = url.startsWith('https') ? require('https') : require('http');
            const req = lib.get(url, (response) => {
                // handle http errors
                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error('Failed to load page, status code: ' + response.statusCode));
                }
                // temporary data holder
                const body = [];
                // on every content chunk, push it to the data array
                response.on('data', (chunk) => body.push(chunk));
                // we are done, resolve promise with those joined chunks
                response.on('end', () => resolve(body.join('')));
            });
            // handle connection errors of the request
            req.on('error', (err) => reject(err));
        });
    }
    get(urls, callback) {
        if (typeof urls == "string") {
            urls = [urls];
        }
        let promises = new Array();
        for (let i = 0; i < urls.length; ++i) {
            promises.push(this.getContent(urls[i]));
        }
        Promise.all(promises)
            .then((html) => callback(null, html))
            .catch((err) => callback(err));
    }
    download(urls, callback) {
        if (typeof urls == "string") {
            urls = [urls];
        }
        // The options argument is optional so you can omit it 
        progress(request('https://az412801.vo.msecnd.net/vhd/VMBuild_20141027/VirtualBox/IE11/Windows/IE11.Win8.1.For.Windows.VirtualBox.zip'), {}).on('progress', function (state) {
            // The state is an object that looks like this: 
            // { 
            //     percent: 0.5,               // Overall percent (between 0 to 1) 
            //     speed: 554732,              // The download speed in bytes/sec 
            //     size: { 
            //         total: 90044871,        // The total payload size in bytes 
            //         transferred: 27610959   // The transferred payload size in bytes 
            //     }, 
            //     time: { 
            //         elapsed: 36.235,        // The total elapsed seconds since the start (3 decimals) 
            //         remaining: 81.403       // The remaining seconds to finish (3 decimals) 
            //     } 
            // } 
            console.log('progress', state);
        }).on('error', function (err) {
            // Do something with err 
            console.log("error happend");
        }).on('end', function () {
            // Do something after request finishes 
            console.log("end happend");
            callback(null);
        }).pipe(fs.createWriteStream('IE11.Win8.1.For.Windows.VirtualBox.zip'));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map