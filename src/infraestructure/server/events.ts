import process from 'process';
import { Server } from 'http';
const  { events } = require('./../constants/log');
import {TEnv} from '../config/types';

// On server internal error.
const onServerError = (): void => console.error({ message: `Server error` });

//@ts-ignore
import pkg from './../../../package.json';

// On server start.
const onListen = (port: TEnv): void => {
  console.info(`Server ᕕ(ಠ‿ಠ)ᕗ - version ${pkg.version}`);
  console.info(`${pkg.name}: - Running on port: ${port}`);
};

// When the process receive kill signal.
const onProcessKill = (server: Server): void => {
  console.info(events.info.onProcessKillMessage);

  setTimeout(() => {
    console.info(events.info.finishServer);
    server.close(() => process.exit(0));
  }, 180);
};

// When in the server happen a uncaugth exception.
const onException = (err: any): void => console.error({ message: err });

export ={
  onListen,
  onProcessKill,
  onServerError,
  onException,
};
