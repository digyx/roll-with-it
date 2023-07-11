CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"foundry_license" varchar(29) NOT NULL,
	"foundry_version" text DEFAULT 'v11.305' NOT NULL,
	"foundry_password" text NOT NULL,
	"instance_url" text NOT NULL
);
