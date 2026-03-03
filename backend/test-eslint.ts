import cookieParser from 'cookie-parser';
import type { RequestHandler } from 'express';

const handler = (cookieParser as unknown as () => RequestHandler)();
