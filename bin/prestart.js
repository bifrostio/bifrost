require('shelljs/global');

/* global echo, rm exec */

if (process.env.NODE_ENV === 'production') {
  echo('removing `dist` directory');
  rm('-rf', 'dist');
  echo('executing `webpack -p`');
  exec('npm run build');
}
