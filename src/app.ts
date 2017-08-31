/* externals */
import * as Request from "request"

(function main(): number {
  let link: string = "http://vshare.io/d/9ac2027";

  let r = Request.defaults({
    jar: true,
    gzip: true,
    headers:
    {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.8,en;q=0.6',
      'Connection': 'keep-alive',
      'Host': 'www.amazon.com',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
    }
  })

  r(link, function(error, response, body) {
    if (error || response.statusCode != 200)
      console.log("rainbow ERROR!", response.statusCode, error);
    else
      console.log(body);
  })

  return 0;
})();