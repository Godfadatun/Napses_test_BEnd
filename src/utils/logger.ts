import winston from 'winston';

const { Console } = winston.transports;
const { json, combine, timestamp } = winston.format;

const timezoned = () => {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Lagos',
  });
};

const logger = winston.createLogger({
  format: combine(timestamp({ format: timezoned }), json()),
  transports: [new Console()],
});

export default logger;
