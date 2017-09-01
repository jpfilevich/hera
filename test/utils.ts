/* node native */
import * as fs from "fs";

/* External modules aka 3rd party */
import * as mocha from "mocha";
import * as should from "should";

/* namespaces aka Internal modules */
import {html, Utils} from "../dist/utils";

describe("html-type",()=>{

  it("should be no diff from string",()=>{
    let body: html = "some string lolz";
  });

});

describe("getLink",()=>{

  it("should be able to get the link (fs.read) #1",(done) => {
    fs.readFile('test/assets/res.html', 'utf8', (error, body) => {
      should.not.exist(error);
      should.exist(body);
      let link: string = "";

      (function () { 
        link = Utils.getLink(body);
      }).should
        .not.throw(/Couldn't find link/)
        .and.not.throw(Error);

      link
        .should
        .be.an.String() // .be.an.Object()
        .and.not.empty()
        .and.match(/http:\/\//);

      // user.should.have.property('name', 'tj');
      // user.should.have.property('pets').with.lengthOf(4);

      // console.log("    " + link);
      done();
    });
  });
  
  it("should not be able to get the link - #2",() => {
    let body: html = `href="http://">Click-here`
      , link: string = "";

    (function () {
      link = Utils.getLink(body);
    }).should
      .throw(Error, /Couldn't find link/);
  });

});