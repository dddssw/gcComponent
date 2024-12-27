import { withInstall } from "@gc/utils";
import infopart from "./src/infopart.vue";
import type { SFCWithInstall } from "@gc/utils";
export const GcInfopart: SFCWithInstall<typeof infopart> = withInstall(infopart);
export default GcInfopart;

