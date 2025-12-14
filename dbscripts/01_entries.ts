import { DatabaseSync } from "node:sqlite";

// Connect to SQLite database
const db = new DatabaseSync("db/db.sqlite");

// Initialize entries table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "entries" (
  	"id"	INTEGER NOT NULL UNIQUE,
  	"user_id"	INTEGER NOT NULL,
  	"type"	TEXT NOT NULL,
  	"created_at"	TEXT NOT NULL,
  	"modified_at"	TEXT NOT NULL,
  	"title"	TEXT NOT NULL,
  	"content"	TEXT NOT NULL,
  	"private"	INTEGER NOT NULL,
  	FOREIGN KEY("user_id") REFERENCES "users"("id"),
  	PRIMARY KEY("id" AUTOINCREMENT)
  );
`).run();

// Initialize entries_versions table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "entries_versions" (
  	"id"	INTEGER NOT NULL UNIQUE,
  	"entry_id"	INTEGER NOT NULL,
  	"created_at"	TEXT NOT NULL,
  	"last_modified_at"	TEXT NOT NULL,
  	"title"	TEXT NOT NULL,
  	"content"	TEXT NOT NULL,
  	FOREIGN KEY("entry_id") REFERENCES "entries"("id"),
  	PRIMARY KEY("id" AUTOINCREMENT)
  );
`).run();

// Initialize tags table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "tags" (
  	"id"	INTEGER NOT NULL UNIQUE,
  	"user_id"	INTEGER NOT NULL,
  	"name"	TEXT NOT NULL UNIQUE,
  	"color"	TEXT NOT NULL DEFAULT "",
  	PRIMARY KEY("id" AUTOINCREMENT)
  );
`).run();

// Initialize entry_to_tag table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "entry_to_tag" (
  	"id"	INTEGER NOT NULL UNIQUE,
  	"entry_id"	INTEGER NOT NULL,
  	"tag_id"	INTEGER NOT NULL,
  	PRIMARY KEY("id" AUTOINCREMENT),
  	FOREIGN KEY("tag_id") REFERENCES "tags"("id"),
  	FOREIGN KEY("entry_id") REFERENCES "entries"("id")
  );
`).run();

// read existing data
const dbOld = new DatabaseSync("dbscripts/db-export/db.sqlite");
const oldEntries = dbOld.prepare("SELECT * FROM entries").all();

// migrate existing data
const insertEntry = db.prepare(`
  INSERT INTO entries (id, user_id, type, created_at, modified_at, title, content, private)
  VALUES (@id, @user_id, @type, @created_at, @modified_at, @title, @content, @private)
`);

for (const entry of oldEntries) {
  insertEntry.run({
    id: entry.id,
    user_id: entry.user_id,
    type: entry.type,
    created_at: entry.created_at,
    modified_at: entry.modified_at,
    title: entry.title,
    content: entry.content,
    private: entry.private,
  });
}

const oldEntryVersions = dbOld.prepare("SELECT * FROM entries_versions").all();
const insertEntryVersion = db.prepare(`
  INSERT INTO entries_versions (entry_id, created_at, last_modified_at, title, content)
  VALUES (@entry_id, @created_at, @last_modified_at, @title, @content)
`);
for (const version of oldEntryVersions) {
  insertEntryVersion.run({
    entry_id: version.entry_id,
    created_at: version.created_at,
    last_modified_at: version.last_modified_at,
    title: version.title,
    content: version.content,
  });
}

const oldTags = dbOld.prepare("SELECT * FROM entry_tags").all();
const insertTag = db.prepare(`
  INSERT INTO tags (id, user_id, name, color)
  VALUES (@id, @user_id, @name, @color)
`);
for (const tag of oldTags) {
  insertTag.run({
    id: tag.id,
    user_id: tag.user_id,
    name: tag.name,
    color: tag.color,
  });
}

const oldEntryToTag = dbOld.prepare("SELECT * FROM entry_to_tag").all();
const insertEntryToTag = db.prepare(`
  INSERT INTO entry_to_tag (entry_id, tag_id)
  VALUES (@entry_id, @tag_id)
`);
for (const ett of oldEntryToTag) {
  insertEntryToTag.run({
    entry_id: ett.entry_id,
    tag_id: ett.tag_id,
  });
}
