require('shelljs/global');

/* global exec */

if (process.env.NODE_ENV === 'production') {
  exec('npm run build');
}
