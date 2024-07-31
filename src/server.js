const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');

app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});