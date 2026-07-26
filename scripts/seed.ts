import { getPayload } from "payload";
import config from "../payload.config";
import { homeSeed, zoomSeed } from "../cms/content";

/**
 * Populates the CMS with the launch content so the admin UI opens fully populated
 * (arrays included) rather than empty. Safe to re-run: it overwrites the Home global
 * and only creates the Zoom meeting / admin user if they don't already exist.
 *
 *   npm run seed
 */
const run = async () => {
  const payload = await getPayload({ config });

  await payload.updateGlobal({ slug: "home", data: homeSeed as never });
  payload.logger.info("Seeded the Home global.");

  const existingZooms = await payload.find({ collection: "zooms", limit: 1 });
  if (existingZooms.totalDocs === 0) {
    await payload.create({ collection: "zooms", data: zoomSeed as never });
    payload.logger.info("Created the first Zoom meeting.");
  }

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (email && password) {
    const existingUsers = await payload.find({ collection: "users", limit: 1 });
    if (existingUsers.totalDocs === 0) {
      await payload.create({ collection: "users", data: { email, password, name: "Candy" } });
      payload.logger.info(`Created admin user ${email}.`);
    }
  } else {
    payload.logger.info(
      "No SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD set — create your admin account at /admin on first visit.",
    );
  }

  process.exit(0);
};

void run();
