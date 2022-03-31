const express = require('express');
require('./services/passport');

const app = express();
const port = process.env.PORT || 3000;

require('./routes/authRoutes')(app);

app.listen(port, () => console.log(`Emaily app listening on port ${port}`));
