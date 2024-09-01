const { pgTable, serial, text, varchar } = require("drizzle-orm/pg-core");

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp'),
    jobPosition: varchar('jobPosition').notNull(),
    jobDescription: varchar('jobDescription').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull(),

})