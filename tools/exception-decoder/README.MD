# How to use this tool

1. Open your local `webpack.jenkins.config.js` file

2. Add `sourceMap: true` to `webpack.optimize.UglifyJsPlugin`

3. Run `yarn run build:client`

4. Copy/Paste output `js` & `.map` file to this folder

5. Update the `index.html` file with the error stack

6. run `python -m SimpleHTTPServer 7500`

7. Open `http://localhost:7500/` in the browser

8. Check the console for the converted call stack
