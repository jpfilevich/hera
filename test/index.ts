import "mocha";
import * as assert from "assert";
import {SmokeTest} from "../build/hera";

describe("index",()=>{

  it("should say 'hello world'",()=>{

    SmokeTest.HelloWorld();
    assert.ok(1==2-1);

  });

});