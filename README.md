# PROBABLEMENTE FALTE EDITARR EL ARCHIVO .vscode/task.js

https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/


## dev

`npm i <pkg> --save-dev` recomendadas

* **jshint**: syntax checker (no compatible con TypeScript, usar solo si el proyecto es JS puro)
* **browserify**: requires browser side y minimizacion aka *.min.js (?)
* **mocha**: tests
* **stylus**: ??

## npm scripts & testing

* `npm run` listea los comandos disponibles

* comandos con argumentos

  ```
  "scripts": {
    ...
    "test": "mocha test/", # sin parametros
    "test:xunit": "npm run test -- --reporter xunit" # con parametros
    ...
  }
  ```

  ejemplo de uso:
  
  `npm run test --anothertest.js` se transforma en `mocha test/ anothertest.js`

  `npm run test -- --grep parser` se transforma en `mocha test/ --grep parser` Es decir, le pasa el parametro `--grep` al comando `test/`. **Y a su vez, `mocha test/ --grep parser` es muy util porque correra unicamente aquellos test con la palabra *parser* en su titulo.**


### Dependencias en comandos

Existen dos formas

  1. Usando `pre` y `post`
  2. Usando los operadores bash

* ejemplo de pre y post, en scripts npm

  ```
  "scripts": {
    ...
    "prepublish": "npm run build # also runs npm run prebuild",    
    "prebuild": "npm run test # also runs npm run pretest",
    "pretest": "npm run lint"
    ...
  }
  ```

* synatx Bash

  `&&` for chaining tasks

  `&` for running tasks simaltaneously

  `<` for inputting the contents (stdin) of a file to a command

  `>` for redirecting output (stdout) of a command and dumping it to a file
  
  `|` for redirecting output (stdout) of a command and sending it to another command
  
  ejemplo:
  
  ```
  {
      "lint": "jshint **",
      "build:css": "stylus assets/styles/main.styl > dist/main.css",
      "build:js": "browserify assets/scripts/main.js > dist/main.js",
      "build": "npm run build:css && npm run build:js",
      "prebuild:js": "npm run lint"
  }
  ```
  
###  Archivos multiples / "wildcards"
Usando `*`

ejemplo:  

```
"devDependencies": {
  "jshint": "latest"
},
"scripts": {
  "lint": "jshint *.js"
}
```

### Multiple tasks / "dependencias"
```
 {
  "lint": "jshint **",
  "build:css": "stylus assets/styles/main.styl > dist/main.css",
  "build:js": "browserify assets/scripts/main.js > dist/main.js",
  "build": "npm run build:css && npm run build:js",
  "prebuild:js": "npm run lint"
}
```

### Streaming to multiple tasks

```
 {
  "build:css": "autoprefixer -b 'last 2 versions' < assets/styles/main.css | cssmin > dist/main.css"
}
```

### Version Bumping

Simply run npm version patch to increment the patch number (e.g. 1.1.1 -> 1.1.2), npm version minor to increment the minor version number (e.g. 1.1.1 -> 1.2.0) or npm version major (e.g. 1.1.1 -> 2.0.0). It’ll commit and tag up your package for you, all that is left is to git push and npm publish.

### Clean

```
"scripts": {
  "clean": "rm -r dist/*"
}
```

### Watch

```
"devDependencies": {
  "stylus": "latest",
  "jade": "latest",
  "browserify": "latest",
  "watch": "latest",
},
"scripts": {
  "build:js": "browserify assets/scripts/main.js > dist/main.js",
  "build:css": "stylus assets/styles/main.styl > dist/main.css",
  "build:html": "jade assets/html/index.jade > dist/index.html",
  "build": "npm run build:js && npm run build:css && npm run build:html",
  "build:watch": "watch 'npm run build' .",
}
```

luego correr una vez: `npm run build:watch` y pronto el pollo

alternativo con watchify:

```
"scripts": {
  "start": "npm run build-js && npm run build-css && serve .",
  "watch": "npm run watch-js & npm run watch-css & serve .",
  
  "build-css": "rework-npm index.css | cleancss -o build/build.css",
  "build-js": "browserify --extension=.jsx --extension=.js index.js | uglifyjs > build/build.js",
  
  "watch-js": "watchify --extension=.jsx --extension=.js index.js -o build/build.js --debug --verbose",
  "watch-css": "nodemon -e css --ignore build/build.css --exec 'rework-npm index.css -o build/build.css'"
}
```


### LiveReload

```
"devDependencies": {
  "live-reload": "latest",
},
"scripts": {
  "livereload": "live-reload --port 9091 dist/",
}
```

```
<!-- In your HTML file -->
<script src="//localhost:9091"></script>
```

# completo

```
  "scripts": {
    "clean": "rimraf dist/*",

    "prebuild": "npm run clean -s",
    "build": "npm run build:scripts -s && npm run build:styles -s && npm run build:markup -s",
    "build:scripts": "browserify -d assets/scripts/main.js -p [minifyify --compressPath . --map main.js.map --output dist/main.js.map] | hashmark -n dist/main.js -s -l 8 -m assets.json 'dist/{name}{hash}{ext}'",
    "build:styles": "stylus assets/styles/main.styl -m -o dist/ && hashmark -s -l 8 -m assets.json dist/main.css 'dist/{name}{hash}{ext}'",
    "build:markup": "jade assets/markup/index.jade --obj assets.json -o dist",

    "test": "karma start --singleRun",

    "watch": "parallelshell 'npm run watch:test -s' 'npm run watch:build -s'",
    "watch:test": "karma start",
    "watch:build": "nodemon -q -w assets/ --ext '.' --exec 'npm run build'",

    "open:prod": "opener http://example.com",
    "open:stage": "opener http://staging.example.internal",
    "open:dev": "opener http://localhost:9090",

    "deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",
    "deploy:stage": "s3-cli sync ./dist/ s3://example-com/stage-site/",

    "serve": "http-server -p 9090 dist/",
    "live-reload": "live-reload --port 9091 dist/",

    "dev": "npm run open:dev -s & parallelshell 'npm run live-reload -s' 'npm run serve -s' 'npm run watch -s'"
  }
```
