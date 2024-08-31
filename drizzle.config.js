/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://intervuai_owner:C9nvDj5wkAiY@ep-snowy-thunder-a5kruwrq.us-east-2.aws.neon.tech/intervuai?sslmode=require",
    }
  };