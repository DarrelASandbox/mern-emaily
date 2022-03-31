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
     - <b>JavaScript origins:</b> <code>http://localhost:3000</code>
     - <b>Authorized redirect URIs:</b> <code>http://localhost:3000/auth/google/callback</code>

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

> <b>Sayan:</b> On <code>req.logout()</code>, the user is no longer attached to the req object. But when I go to the browser dev tools and open the Application tab, I can still see the cookie with session info in it. Shouldn't logout clear the cookie as well? What am I missing here?

> <b>Mehdi:</b> Hello, logout doesnt 'clear' the cookie, it 'unests' the user from it, i think stephen did mention this in a video, i'm not sure which one but, when you are authentified the session object is set with an encrypted value that holds the userid, when you're logged out, the session's encrypted value is empty if that makes sense.

> To verify this you can try to check the content of the session while logged in & out, the value inside session should be much 'longer' when u're logged in as opposed to when u're logged out

&nbsp;
