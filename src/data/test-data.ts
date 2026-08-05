import * as dotenv from 'dotenv';
import rawData from './test-data.json';
import { DateHelper } from '../utils/date.helper';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL ?? 'https://client-staging.addintel.co.uk',
  API_BASE_URL: process.env.API_BASE_URL ?? 'https://client-staging.addintel.co.uk/api',
};

if (!process.env.consultant_EMAIL) throw new Error('consultant_EMAIL not set — add it to .env');
if (!process.env.consultant_PASSWORD) throw new Error('consultant_PASSWORD not set — add it to .env');
if (!process.env.Admin_EMAIL) throw new Error('Admin_EMAIL not set — add it to .env');
if (!process.env.Admin_PASSWORD) throw new Error('Admin_PASSWORD not set — add it to .env');

export const USERS = {
  consultant: {
    email: process.env.consultant_EMAIL as string,
    password: process.env.consultant_PASSWORD as string,
  },
  admin: {
    email: process.env.Admin_EMAIL as string,
    password: process.env.Admin_PASSWORD as string,
  },
};

export const API_ENDPOINTS = {
  login: '/login',
  authCheck: '/api/user/authcheck',
  exclusionList: '/api/v1/exclusion-lists',
  mailablePool: '/api/v1/mailable-pool',
  users: '/api/v1/users',
  kmlcreation: '/api/v1/kmls/',
  quotation: '/api/v1/quotations',
  jobsFromQuotation: '/api/v1/jobs/from-quotation',
  usersMe: '/api/v1/users/me',
};

const ts = Date.now();
let randomId = Math.floor(Math.random() * 1000000) + 1;
const getNextId = () => randomId++;

export const TEST_DATA = {
  consultantExclusionList: {
    ...rawData.newExclusionList,
    name: `Test List ${getNextId()} ${ts}`,
  },

   adminExclusionList: {
    ...rawData.newExclusionList,
    name: `Test List ${getNextId()}`,
  },

  mailablePool: {
    ...rawData.mailablePool,
    clone: {
      ...rawData.mailablePool.clone,
      name: `Clone Mailable Pool ${getNextId()} ${ts}`,
    },
  },

  createUser: {
    ...rawData.createUser,
    last_name: `User ${getNextId()} ${ts}`,
    email: `addinteluser${getNextId()}@gmail.com`,
  },

  updateUserPayload: {
    ...rawData.updateUserPayload,
    last_name: `Updated User ${ts}`,
    email: `updateduser${getNextId()}@gmail.com`,
  },

  consultantKmlCreation: {
    ...rawData.kmlCreation,
    name: `Kml addintelss ${getNextId()} ${ts}`,
  },

  adminKmlCreation: {
    ...rawData.kmlCreation,
    name: `Kml admin ${getNextId()}`,
  },

  quotation: {
    ...rawData.quotation,
    expiryAt: DateHelper.format(DateHelper.addDays(90)),
    agency: `Agency Enter ${getNextId()} ${ts}`,
    name: `Consultative Quote ${getNextId()} ${ts}`,
  },

  quotationClientSupplied: {
    ...rawData.quotationClientSupplied,
    expiryAt: DateHelper.format(DateHelper.addDays(90)),
  },
};