## About The Project

- Node with React: Fullstack Web Development
- Build and deploy fullstack web apps with NodeJS, React, Redux, Express, and MongoDB.
- Tutorial for Emaily
- [Stephen Grider](https://github.com/StephenGrider)

&nbsp;

## Notes

### App Overview

- Someone uses startup owner's app/service
- Startup owner wants feedback
- Send customer an email requesting feedback
- Get tabulation of results
- Make app/service better with feedback

&nbsp;

### App User Flow & Tech Stack

- User signs up via Google OAuth (Express server + MongoDB + PassportJS)
- User pays for email credits via stripe (Stripe + MongoDB)
- User creates a new 'campaign' (React + Redux)
- User enters list of emails to send survey to (React + Redux + Redux Form)
- We send email to list of surveyees (Email Provider)
- Surveyees click on link in email to provide feedback (Email Provider + Express + MongoDB)
- We tabulate feedback (MongoDB?)
- User can see report of all survey responses (Mongo + React + Redux)

&nbsp;

### Deployment Checklist

- Dynamic Port Binding
- Specify Node Environment
- Specify Start Script
- Create .gitignore file

&nbsp;

### OAuth Flow

- <u>Password Library Components</u>
  - passport: General helpers for handling auth in Express apps
  - passport strategy: [List of Strategies](https://github.com/jaredhanson/passport/wiki/Strategies)

![diagrams-003.5-oauth](diagrams/diagrams-003.5-oauth.png)

- [What's the difference between OpenID and OAuth?](https://stackoverflow.com/questions/1087031/whats-the-difference-between-openid-and-oauth)
- [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2)
- [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849)
  1. Go to the Google Cloud Platform Console
  2. Create new project
  3. Create credentials
  4. <b>User consent:</b> OAuth consent screen
  5. <b>Authorized domains:</b> Not setup in this tutorial (Require hosting domain)
  6. <b>Web applications</b>
     - <b>JavaScript origins:</b>
       - <code>http://localhost:3000</code>
       - <code>http://localhost:4000</code>
       - <code>https://emaily-30-mar-2022.herokuapp.com</code>
     - <b>Authorized redirect URIs:</b>
       - <code>http://localhost:3000/auth/google/callback</code>
       - <code>http://localhost:4000/auth/google/callback</code>
       - <code>https://emaily-30-mar-2022.herokuapp.com/auth/google/callback</code>

![diagrams-011.5-check-id-in-db](diagrams/diagrams-011.5-check-id-in-db.png)

- HTTP is stateless

&nbsp;

---

&nbsp;

> <b>Balaji:</b> Cookie vs JWT

> <b>Bobby:</b> I will share Stephen's previous response on this:

> "Cookies vs JWT's are two very different things that do not serve the same purpose.

> Cookies are a transport mechanism. It is a piece of data that is managed automatically by the browser, and gets added on to every request issued to a server at some particular domain. Although they are native to the browser, mobile apps, desktop apps, etc can use cookies as well.

> JWT's are an authentication mechanism. It is a token that encodes some piece of information. To be clear, cookies are a tool to move data around. JWT's are a tool to store some information. They don't serve the same purpose.

> With all this said, the auth setup in the course very closely mimics exactly what a JWT does. The course shows how to store some encoded piece of information in a string via the cookie-session library. This encoded string has some information that identifies the user. Although we only store the user's ID in that string, we could just as easily add in some more information, such as the user's email address, full name, etc. A JWT functions in the same way - we can store some information in it."

&nbsp;

---

&nbsp;

> <b>Taylor:</b> Why not JWT?

> <b>Stephen:</b> Using JWT's in the header of each request in the other course was a result of putting the react app on one domain and the API server on a different one. In a few lectures we dive really deep into talking about why the server setup in this course makes working with cookies possible. One of the nasty things around JWT's is that there isn't a great place to store them on the client side - they are almost always weak against XSS attacks. Using cookies solves that huge huge issue.

> I have many other thoughts about this, but for right now might be best if you check out that other lecture to talk more about CORS and how cookies works with em.

&nbsp;

---

&nbsp;

- [Cookie Size: 4096 bytes](https://chromestatus.com/feature/4946713618939904)
- [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

![diagrams-012-express-session](diagrams/diagrams-012-express-session.png)

> <b>Mohammed:</b> As Stephen mentioned that using Cookie Session we store all of the data into the cookie rather than Express session where all of data is stored inside the cookie. So my question is does Cookie Session essentially mean the same as using JWT Token where all of the data is passed inside the token? If not how are they both different?

> <b>Maeva:</b> Yes, cookies are basically doing the same thing as JWT tokens. The main differences are:

> - Cookies are automatically sent back and forth in the HTTP request header. Coders don't have to manually set them, the browser automatically does the management. JWT must be programmatically set by you the coder in each requests.
> - Cookies only work in browsers. JWT can work both in browsers and other platforms (e.g. mobile apps)
> - Cookies have been used since forever (stood the test of time). JWT is a rather new technology that came with the rise of the mobile platform and its crossover with web technology.
> - JWT payload are not necessarily encrypted (It's mostly using base64 encoding and some signature) There are still ongoing debate over the security of JWT.

&nbsp;

---

&nbsp;

> <b>Sayan:</b> On <code>req.logout()</code>, the user is no longer attached to the req object. But when I go to the browser dev tools and open the Application tab, I can still see the cookie with session info in it. Shouldn't logout clear the cookie as well? What am I missing here?

> <b>Mehdi:</b> Hello, logout doesnt 'clear' the cookie, it 'unests' the user from it, i think stephen did mention this in a video, i'm not sure which one but, when you are authentified the session object is set with an encrypted value that holds the userid, when you're logged out, the session's encrypted value is empty if that makes sense.

> To verify this you can try to check the content of the session while logged in & out, the value inside session should be much 'longer' when u're logged in as opposed to when u're logged out

&nbsp;

---

&nbsp;

### Multiple Strategies

- [passport.authorize()](http://www.passportjs.org/concepts/delegated-authorization/)

> <b>Joseph:</b> How would you (or I) handle the use case where someone would be logging in with multiple Auths? How would we prevent the strategy from searching the db and creating an unnecessary new User in the case that they had auth'd with Google and now are auth'ing with IG?

> <b>Stephen:</b> Hi Guys - Only way to handle this is to store the email given to you by the provider. Remember that with google, in the profile object we got a list of the user emails. We could store that list, then whenever someone signs in with another provider, check to see if that provider's emails have been used before from another provider. Confusing when I put it in words, but I bet you get it.

> The thing to keep in mind is that this opens you up to account highjacking. For example, imagine the following:

> - Bill signs up to our service with Google. Bill's google profile shows an email of bill@gmail.com.
> - Hacker Jill then creates an account on Instagram and enters a fake email address of bill@gmail.com.
> - Hacker Jill then comes to our site and tries to oauth through instagram.
> - Our server might see the instagram profile email of bill@gmail.com, and - unless we guard against it - we might incorrectly link bill's account with this new instagram oauth.

> To guard against this, do the following:

> - Bill signs up with Google, and we create a new account that contains an email of bill@gmail.com.
> - Bill logs out, then comes back to our site and attempts to oauth with Instagram. Let's imagine that instagram also lists bill@gmail.com.
> - We must detect that Bill already has an account tied to google.
> - After detecting that Bill already has a user account, we will only allow Bill to auth through Instagram and link this account if Bill is signed in with Google.
> - In other words, only allow account linking if the user is already signed in with the other account. That proves that Bill is who they say they are and that both the Instagram and Google accounts belong to him.
> - I know this sounds hard, but it isn't as bad as it sounds. To pull it off, every use model record store the the list of emails from each provider that the user auths with. Then, in each strategy you wire up, check to see if the user's email is already in use. If it is, check to see if the user is logged in (by looking at req.user). If they are, allow them to pass, otherwise tell them the email is in use and that they should go sign in with the other oauth provider first.

&nbsp;

---

&nbsp;

### Heroku Proxy Issue

- <b>Option 1:</b> set <code>GoogleStrategy({callbackURL: ...})</code> in full to include https
- <b>Option 2:</b> Use a proxy

> <b>Jeffrey:</b> In case anyone else is left curious as to how the <code>proxy: true</code> option works, I didn't find any documentation on the option itself, but I found the code that makes it work. I'd like to share what I learned in case someone else is curious.

> Of course, an understanding of how it works requires an understanding of the problem. So I'll start there: When using Heroku's deployment system, our browser doesn't connect directly to the machine which hosts our server. It actually connects to one of Heroku's load-balancers (or "proxy"). That load-balancer then connects to the machine with our server, and ultimately forwards our request.

> Even if we use https when we connect to the load-balancer, the load-balancer is free to forward using "http", which is what it's doing. The problem is that while we connect to the load-balancer using "https", the load-balancer forwards our request using "http".

> That means that our server is never receiving an "https" request. The server receives an "http" request, which, combined with our relative <code>callbackURL</code> in the <code>GoogleStrategy</code> options, is what is used to build the callback URL. Because the callback URL is now an "http" URL it no longer matches the "https" we have listed as allowable in the Google console, and we get our error.

> The fix is to somehow tell the server "Hey, this request was actually forwarded by a proxy, I want you to ignore the proxy's protocol and use the original sender's protocol, which is https".

> Our mechanism for doing this is <code>proxy: true</code>, which works by leveraging a non-standard (but widely used and accepted) header called <code>X-Forwarded-Proto</code> to determine the original request's protocol. In this case, even though Heroku's load-balancer is forwarding using http, it also saves the original protocol's request ("https") using the <code>X-Forwarded-Proto</code> header.

> When we set <code>proxy</code> to <code>true</code>, it tells our server to check if there is an <code>X-Forwarded-Proto</code> header in the request, and use the protocol stored there instead of whatever protocol the actual request used.

> Interestingly, the strategy library we are using in the course (<code>passport-google-oauth2</code>) doesn't make any mention of a <code>proxy</code> option. However, by following the code we find that the function/class we ultimately end up importing via <code>require('passport-google-oauth2')</code> inherits from a more generic strategy library, called <code>passport-oauth2</code> ([See code here](https://github.com/jaredhanson/passport-google-oauth2/blob/723e8f3e8e711275f89e0163e2c77cfebae33f25/lib/strategy.js#L65))

> In <code>passport-oauth2</code> we see that the <code>proxy</code> option is read from our supplied <code>options</code> into <code>this.\_trustProxy</code> ([code here](https://github.com/jaredhanson/passport-oauth2/blob/1ac8cbba5aef89845c959d543a248bbb647105c2/lib/strategy.js#L114)) and later passed to a function called <code>originalURL</code> where it is used to rebuild the callback URL ([code here](https://github.com/jaredhanson/passport-oauth2/blob/1ac8cbba5aef89845c959d543a248bbb647105c2/lib/strategy.js#L147)).

> Inside <code>originalURL</code>, we see that it reads from the <code>X-Forwarded-Proto</code> header, if found, and uses it's contents instead of "http".

> I also noticed that the library will honor an Express setting called <code>trust proxy</code>. Instead of using <code>proxy: true</code> in the options, we can also use a global express setting to achieve the same result. You can try it by commenting out proxy: true and adding the following right after <code>const app = express();</code> in <code>index.js: app.set('trust proxy', true);</code>

> One benefit I can think of to this method vs using <code>proxy: true</code> is that we would have a single place to enable/disable the setting when using multiple auth strategies. For example, instead of adding similar <code>proxy: true</code> settings to each of google, facebook, and github login options, we would simply add or remove the <code>trust proxy</code> setting for express. This assumes the other Strategies also honor the setting.

> For more info about Express' trust proxy behavior read ([here](https://expressjs.com/en/api.html#trust.proxy.options.table)) and ([here](http://expressjs.com/en/guide/behind-proxies.html)).

&nbsp;

---

&nbsp;

### Create React App

> <b>Azteker:</b> Why cannot we make the dev mode the way like prod mode? Why do we have to use react server in dev mode?

> <b>Bobby:</b> In production the only thing that exists of the client side is a bundle.js asset file which is the transpiled minified version of all the code. Without CRA you would have to manually generate this asset every single time a change was made to the project, which would not be reasonable.

&nbsp;

---

&nbsp;
