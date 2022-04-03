module.exports = (survey) => {
  const redirectLink =
    process.env.NODE_ENV === 'production'
      ? `${process.env.REDIRECT_DOMAIN}`
      : 'http://localhost:3000';

  return /*html*/ `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your input!</h3>
        <p>${survey.body}</p>
        <div>
          <a href="${redirectLink}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${redirectLink}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>  
    </body>
  </html>`;
};
