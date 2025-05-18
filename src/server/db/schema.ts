// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const image = createTable("image", (d) => ({
  id: d.uuid("id").primaryKey().defaultRandom().notNull(),
  url: d.varchar({ length: 256 }).notNull(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const book = createTable("book", (d) => ({
  id: d.uuid("id").primaryKey().defaultRandom().notNull(),
  title: d.varchar({ length: 256 }).notNull(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const bookImage = createTable(
  "book_image",
  (d) => ({
    id: d.uuid("id").primaryKey().defaultRandom().notNull(),
    bookId: d
      .uuid("book_id")
      .references(() => book.id, { onDelete: "cascade" })
      .notNull(),
    imageId: d
      .uuid("image_id")
      .references(() => image.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("book_image_book_id_idx").on(t.bookId),
    index("book_image_image_id_idx").on(t.imageId),
  ],
);

export const bookRelations = relations(book, ({ many }) => ({
  images: many(bookImage),
}));

export const bookImageRelations = relations(bookImage, ({ one }) => ({
  book: one(book, {
    fields: [bookImage.bookId],
    references: [book.id],
  }),
  image: one(image, {
    fields: [bookImage.imageId],
    references: [image.id],
  }),
}));

export const prompt = createTable("prompt", (d) => ({
  id: d.uuid("id").primaryKey().defaultRandom().notNull(),
  prompt: d.varchar({ length: 256 }).notNull(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  isReady: d.boolean().default(false).notNull(),
  isError: d.boolean().default(false).notNull(),
  errorMessage: d.varchar({ length: 256 }),
}));

export const promptImage = createTable(
  "prompt_image",
  (d) => ({
    id: d.uuid("id").primaryKey().defaultRandom().notNull(),
    promptId: d
      .uuid("prompt_id")
      .references(() => prompt.id, { onDelete: "cascade" })
      .notNull(),
    imageId: d
      .uuid("image_id")
      .references(() => image.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("prompt_image_prompt_id_idx").on(t.promptId),
    index("prompt_image_image_id_idx").on(t.imageId),
  ],
);

export const promptRelations = relations(prompt, ({ one }) => ({
  images: one(promptImage),
}));

export const promptImageRelations = relations(promptImage, ({ one }) => ({
  prompt: one(prompt, {
    fields: [promptImage.promptId],
    references: [prompt.id],
  }),
  image: one(image, {
    fields: [promptImage.imageId],
    references: [image.id],
  }),
}));

export const imageRelations = relations(image, ({ many }) => ({
  bookImages: many(bookImage),
  promptImages: many(promptImage),
}));
