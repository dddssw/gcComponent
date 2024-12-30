import { withInstall } from "@gc/utils";
import time from "./src/time.vue";
import type { SFCWithInstall } from "@gc/utils";
//每个组件导出一个插件，组件内设置组件名
// defineOptions({
//   name: "ElFormItem",
// });
export const GcTime: SFCWithInstall<typeof time> = withInstall(time);
export default GcTime;

