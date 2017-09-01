/* node native */
import * as fs from "fs";

/* External modules aka 3rd party */
import * as mocha from "mocha";
import {expect} from 'chai';

/* namespaces aka Internal modules */
import {html, Utils} from "../dist/utils";

describe("html-type",()=>{

  it("should be no diff from the good ol' string",()=>{
    let body: html = "";
    
    expect(() => { 
        body = "some string lolz";
    }).to.not.throw(Error);

    expect(body)
      .to.be.equal("some string lolz")
      .and.be.have.lengthOf(16);
  });

});

describe("getLink",()=>{

  it("should be able to get the link (fs.read) #1",(done) => {
    fs.readFile('test/assets/res.html', 'utf8', (error, body) => {
      
      expect(error).to.not.exist;
      expect(body).to.exist;

      let link: string = "";

      expect(() => {
        link = Utils.getLink(body)
      }).to.not.throw(Error)

      // Alternatively, if you need to test multiple properties.
      // var err = chai.assert.throw(foo);
      // expect(err).to.have.property('name').with.lengthOf(4);
      // expect(err).to.have.property('code', 'EBADCODE');

      expect(link)
        .to.be.a("string")
        .and.match(/http:\/\//)

      // console.log("    " + link);
      done();
    });
  });
  
  it("should not be able to get the link #2",() => {
    let body: html = `href="http://">Click-here`
      , link: string = "";

    expect(() => {
      link = Utils.getLink(body);
    }).to.throw(Error);
  });

});