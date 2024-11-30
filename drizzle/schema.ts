import { pgTable, text, real, varchar, foreignKey, timestamp, json } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const chunk = pgTable("Chunk", {
	id: text("id").primaryKey().notNull(),
	filePath: text("filePath").notNull(),
	content: text("content").notNull(),
	embedding: real("embedding").array().notNull(),
});

export const user = pgTable("User", {
	email: varchar("email", { length: 64 }).primaryKey().notNull(),
	password: varchar("password", { length: 64 }),
});

export const chat = pgTable("Chat", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).notNull(),
	messages: json("messages").notNull(),
	author: varchar("author", { length: 64 }).notNull(),
},
(table) => {
	return {
		chatAuthorUserEmailFk: foreignKey({
			columns: [table.author],
			foreignColumns: [user.email],
			name: "Chat_author_User_email_fk"
		}),
	}
});