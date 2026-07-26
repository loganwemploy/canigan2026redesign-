import { getPayload } from "payload";
import config from "../payload.config";
import { zoomSeed } from "../cms/content";

const run = async () => {
  const payload = await getPayload({ config });
  const existing = await payload.find({ collection: "zooms", limit: 1 });
  if (existing.totalDocs === 0) {
    const doc = await payload.create({ collection: "zooms", data: zoomSeed as never });
    payload.logger.info(`Created Zoom meeting id=${doc.id}`);
  } else {
    payload.logger.info(`Zooms already populated (${existing.totalDocs}).`);
  }
  process.exit(0);
};

void run();
