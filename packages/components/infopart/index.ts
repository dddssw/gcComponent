import { withInstall } from "@gc/utils";
import infopart from "./src/infopart.vue";
import type { SFCWithInstall } from "@gc/utils";
//每个组件导出一个插件，组件内设置组件名
// defineOptions({
//   name: "ElFormItem",
// });
export const GcInfopart: SFCWithInstall<typeof infopart> = withInstall(infopart);
export default GcInfopart;

