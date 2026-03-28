CREATE TABLE `whatsapp_leads` (
	`id` text PRIMARY KEY NOT NULL,
	`phone` text,
	`inquiry_type` text NOT NULL,
	`message` text NOT NULL,
	`source_page` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_site_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`logo_text` text DEFAULT '' NOT NULL,
	`logo_type` text DEFAULT 'icon' NOT NULL,
	`logo_icon` text DEFAULT 'zap' NOT NULL,
	`logo_image` text,
	`favicon` text,
	`navbar_config` text,
	`footer_description` text,
	`footer_config` text,
	`footer_socials` text,
	`primary_color` text DEFAULT '#6366f1' NOT NULL,
	`accent_color` text DEFAULT '#ff6b35' NOT NULL,
	`footer_logo_layout` text DEFAULT 'horizontal',
	`footer_logo_monochrome` integer DEFAULT false,
	`school_name` text DEFAULT '' NOT NULL,
	`school_address` text DEFAULT '',
	`school_phone` text DEFAULT '',
	`school_email` text DEFAULT '',
	`theme` text DEFAULT 'modern' NOT NULL,
	`background_light` text DEFAULT '#f6f7f8' NOT NULL,
	`background_dark` text DEFAULT '#101922' NOT NULL,
	`font_display` text DEFAULT 'Quicksand' NOT NULL,
	`font_body` text DEFAULT 'Plus Jakarta Sans' NOT NULL,
	`border_radius` text DEFAULT 'lg' NOT NULL,
	`dark_mode` text DEFAULT 'system' NOT NULL,
	`updated_at` integer NOT NULL,
	`extra_fees_library` text,
	`report_card_theme` text DEFAULT 'playful' NOT NULL,
	`whatsapp_number` text DEFAULT '',
	`whatsapp_message` text DEFAULT ''
);
--> statement-breakpoint
INSERT INTO `__new_site_settings`("id", "logo_text", "logo_type", "logo_icon", "logo_image", "favicon", "navbar_config", "footer_description", "footer_config", "footer_socials", "primary_color", "accent_color", "footer_logo_layout", "footer_logo_monochrome", "school_name", "school_address", "school_phone", "school_email", "theme", "background_light", "background_dark", "font_display", "font_body", "border_radius", "dark_mode", "updated_at", "extra_fees_library", "report_card_theme", "whatsapp_number", "whatsapp_message") SELECT "id", "logo_text", "logo_type", "logo_icon", "logo_image", "favicon", "navbar_config", "footer_description", "footer_config", "footer_socials", "primary_color", "accent_color", "footer_logo_layout", "footer_logo_monochrome", "school_name", "school_address", "school_phone", "school_email", "theme", "background_light", "background_dark", "font_display", "font_body", "border_radius", "dark_mode", "updated_at", "extra_fees_library", "report_card_theme", "whatsapp_number", "whatsapp_message" FROM `site_settings`;--> statement-breakpoint
DROP TABLE `site_settings`;--> statement-breakpoint
ALTER TABLE `__new_site_settings` RENAME TO `site_settings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;