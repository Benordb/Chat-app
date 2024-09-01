CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"avatar_img" varchar(256),
	"active_status" boolean DEFAULT false,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"fromUId" integer,
	"toUId" integer,
	"message" varchar(256),
	"readStatus" boolean DEFAULT false,
	"readAt" timestamp,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_fromUId_users_id_fk" FOREIGN KEY ("fromUId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_toUId_users_id_fk" FOREIGN KEY ("toUId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
