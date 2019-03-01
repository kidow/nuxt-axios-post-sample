# nuxt-axios-post-sample
I made this two subfolders for demonstrating how Nuxt(front server) can communiacate with Express(remote api server).

---
## How to test?

1. Clone this repo.
   
2. In each folder(`express_api_server`, `vue_front_server`), download dependency.
- In `express_api_server` folder, run `npm install` (because it is generated using `express-generator`)
- In `vue_front_server` folder, run `yarn` (because it is generated using `create-nuxt-app`)

3. In each folder, run server.
- In `express_api_server` folder, run `npm start`. I already install nodemon dependency so it would refresh automatically when changed.
- In `vue_front_server` folder, run `yarn dev`. Nuxt already serve that so i didn't install extra dependency.
- then Express server will be hosted on http://localhost:3001/ and Nuxt server will be hosted on http://localhost:3000/
(if you search in files "Here is what I changed" you would see all of my amend)

4. In (chrome) brower, go to http://localhost:3000/. you will see small "test" button. click it. 

5. F12 (DevTools) > Application > Cookies > "hi" cookies! > Done. CoolCoolCool.

---
## How it worked?
In nuxt(actually, axios) if you want to get Cookies in the response from remote api server, you have to change some configuration.

```Javascript
// express_api_server/app.js


var allowedOrigins = ['http://localhost:3000']; // appropriate origin address
var cors = require("cors") // this library makes cors handling easier.
app.use(cors({
  credentials: true, // --> configures the Access-Control-Allow-Credentials CORS header
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
      'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);      
  }
}))
// ALl above come from https://expressjs.com/en/resources/middleware/cors.html
```

I allowed **exactly** localhost:**3000**. So CORS wouldn't block me.

For clear flow, i used local session using `session-file-store` and `express-session`.

At this point, the data (`{data:123, data2:456}`) will send to api server properly. But not opposite side yet.

To get proper information(response), Something should be done at the Nuxt(front) side too.


```Javascript
// vue_front_server/pages/index.vue

async fetchSomething() {
    const ip = await this.$axios.post('http://localhost:3001',{data:123, data2:456},{withCredentials: true})
    // ...
}
```
In vue(front-end server / client-side), I made axios call using `{withCredentials: true}` options. This means <i>"I will use explicit CORS policy. So get my info RIGHT NOW!"</i>. I have to set this value true because I tried to send `json data` to server as above seen.

In this settings, if you clicked the button then the server(in this sample, express server - http://localhost:3001/) have to return **proper** `Access-Control-Allow-Origin` value. you can't use just whidcard(`*`).

If you have any question please ask me! I will glad to anwser that. Thank you.


