export enum ServiceModes {
  Debug = 'debug',
  Production = 'prod',
  Development = 'dev'
}

export const FRONTEND_URL =
  process.env['FRONTEND_URL'] ??
  'http://exploriee-lb-215257067.us-east-2.elb.amazonaws.com'
export const ENCRYPTION_KEY =
  process.env['ENCRYPTION_KEY'] ?? 'xlorie#123456789'
