import { relations } from "drizzle-orm/relations";
import { user, chat } from "./schema";

export const chatRelations = relations(chat, ({one}) => ({
	user: one(user, {
		fields: [chat.author],
		references: [user.email]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	chats: many(chat),
}));