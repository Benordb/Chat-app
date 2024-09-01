const { relations } = require("drizzle-orm");
const {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
  boolean,
} = require("drizzle-orm/pg-core");

// Define the users table
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  avatar_img: varchar("avatar_img", { length: 256 }),
  active_status: boolean("active_status").default(false),
  updatedAt: timestamp("updatedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Define the messages table
const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  fromUId: integer("fromUId").references(() => users.id),
  toUId: integer("toUId").references(() => users.id),
  message: varchar("message", { length: 256 }),
  readStatus: boolean("readStatus").default(false),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow(),
});

const usersRelations = relations(users, ({ many }) => ({
  sentMessages: many(messages, {
    fields: [messages.fromUId],
    references: [users.id],
  }),
  receivedMessages: many(messages, {
    fields: [messages.toUId],
    references: [users.id],
  }),
}));

const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.fromUId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [messages.toUId],
    references: [users.id],
  }),
}));

module.exports = {
  users,
  messages,
  usersRelations,
  messagesRelations,
};
