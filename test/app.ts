/* node native */
import * as fs from "fs";

/* External modules aka 3rd party */
import * as mocha from "mocha";
import {expect} from 'chai';

/* namespaces aka Internal modules */
import Hera from "../dist/app";

describe("app",()=>{

  it("#get",(done)=>{
    let hera: Hera = new Hera();
    hera.get("http://vshare.io/d/9ac2027", (err: Error, res: any) => {
      console.log(res);
      done();
    })
  });

});