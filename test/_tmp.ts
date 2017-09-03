import Hera from "../dist/app";

let hera: Hera = new Hera();
let urls: Array<string> = [
    "http://vshare.io/d/9ac2027",
    "http://vshare.io/d/21969c1"
  ];
hera.download(urls,()=>{});