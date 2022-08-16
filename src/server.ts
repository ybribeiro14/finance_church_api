/* eslint-disable import/first */
import dotenv from 'dotenv';
import path from 'path';

const src = path.resolve(__dirname, '../');

dotenv.config({ path: `${src}/.env.${process.env.NODE_ENV}` });

import { serverHttp } from './http';

serverHttp.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333');
});
