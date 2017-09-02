/* node native */
import * as fs from "fs";

/* External modules aka 3rd party */
import * as mocha from "mocha";
import {expect} from 'chai';

/* namespaces aka Internal modules */
import Hera from "../dist/app";
import {html, Utils} from "../dist/utils";

describe("app",()=>{

  it("#get",(done)=>{
    let hera: Hera = new Hera();
    hera.get(["http://vshare.io/d/9ac2027","http://vshare.io/d/21969c1"], (err: Error, res: any) => {
      res.forEach((body:html) => {
        console.log(Utils.getLink(body));
      })
      done();
    })
  });

});