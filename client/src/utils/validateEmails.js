const regex = // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmails = (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => regex.test(email) === false);

  if (invalidEmails.length) {
    if (invalidEmails.includes(''))
      return 'Remove the comma or add another email address';
    return `These emails are invalid: ${invalidEmails}`;
  }
  return;
};

export default validateEmails;

/*
Chris: 
I took up Grey's solution after groking why it works. 
If you console.log(invalidEmails) and type in an email with a trailing comma 
it returns an empty string - as it has performed a split on the comma,
the first item is a valid email,
the second is an empty string which doesn't pass the regex. 
*/
