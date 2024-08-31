import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql = neon("postgresql://intervuai_owner:C9nvDj5wkAiY@ep-snowy-thunder-a5kruwrq.us-east-2.aws.neon.tech/intervuai?sslmode=require");
export const db = drizzle(sql,{schema});
