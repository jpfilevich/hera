/* node native */
import * as fs from "fs";

/* External modules aka 3rd party */
import * as mocha from "mocha";
import {expect} from 'chai';

/* namespaces aka Internal modules */
import Hera from "../dist/app";
import {html, Utils} from "../dist/utils";

describe("app",()=>{
  
  let hera: Hera = new Hera();

  it("#get",(done)=>{
    hera.get(["http://vshare.io/d/9ac2027","http://vshare.io/d/21969c1"], (err: Error, res: any) => {
      res.forEach((body:html) => {
        console.log(Utils.getLink(body));
      })
      done();
    })
  });

  //it.only("#download",(done)=>{
  it.only("#download",(done)=>{
    hera.download("https://az412801.vo.msecnd.net/vhd/VMBuild_20141027/VirtualBox/IE11/Windows/IE11.Win8.1.For.Windows.VirtualBox.zip",(err,res)=>{
      done()
    });
  });

});