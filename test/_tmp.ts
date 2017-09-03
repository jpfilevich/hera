import Hera from "../dist/app";

//let hera: Hera = new Hera();
let urls: Array<string> = [
    //"https://az412801.vo.msecnd.net/vhd/VMBuild_20141027/VirtualBox/IE11/Windows/IE11.Win8.1.For.Windows.VirtualBox.zip"
    "http://vshare.io/d/9ac2027",
    "http://vshare.io/d/21969c1"
  ];
Hera.download(urls);