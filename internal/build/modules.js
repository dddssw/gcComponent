import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import { rollup } from "rollup";
import vue from "@vitejs/plugin-vue";
import VueMacros from "unplugin-vue-macros/rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import replace from "@rollup/plugin-replace";
import glob from "fast-glob";
import scss from 'rollup-plugin-scss'; // 导入 SCSS 插件

const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = dirname(__filenameNew);

const projRoot = resolve(__dirnameNew, "..", "..");
const pkgRoot = resolve(projRoot, "packages");

/** `/dist` */
const buildOutput = resolve(projRoot, "dist");
/** `/dist/gc` */
const epOutput = resolve(buildOutput, "gc");

const epRoot = resolve(pkgRoot, "gc");

const excludeFiles = (files) => {
  const excludes = ["node_modules"];
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  );
};

// 模块化打包任务函数
const buildModules = async () => {
  const input = excludeFiles(
    await glob("**/*.{js,ts,vue}", {
      cwd: pkgRoot,
      absolute: true, // 返回绝对路径
      onlyFiles: true, // 只返回文件的路径
    })
  );
  const bundle = await rollup({
    input, // 配置入口文件
    plugins: [
      // 配置插件
      VueMacros({
        plugins: {
          vue: vue(),
        },
      }),
      nodeResolve({
        extensions: [".ts"],
      }),
      replace({
        "process.env.NODE_ENV": '"production"',
        preventAssignment: true, // 这个选项用于防止在字符串后面紧跟一个等号时进行替换。可以用于避免错误的赋值操作
      }),
      scss({
        output: resolve(epOutput, "dist", "styles.css"), // 输出一个 CSS 文件
        sourceMap: true, // 启用 Source Map 便于调试
      }),
      esbuild(),
    ],
    // 排除不进行打包的 npm 包，例如 Vue，以便减少包的体积
    external: [
      "element-plus",
      "vue",
      "@vue/shared",
      "@element-plus/icons-vue",
      "@vueuse/core",
      "async-validator",
    ],
  });
  // 配置输出文件格式
  bundle.write({
    exports: "named",
    format: "esm", // 配置输出格式
    dir: resolve(epOutput, "es"), // 配置输出目录
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk，也就是打包后保留目录结构
    preserveModulesRoot: epRoot,
    entryFileNames: `[name].mjs`, // [name] 表示入口文件的文件名（不包含扩展名），也就是生产 .mjs 结尾的文件
  });
  bundle.write({
      exports: 'named',
    format: "cjs", // 配置输出格式
    dir: resolve(epOutput, "lib"), // 配置输出目录
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk，也就是打包后保留目录结构
    preserveModulesRoot: epRoot,
    entryFileNames: `[name].cjs`, // [name] 表示入口文件的文件名（不包含扩展名），也就是生产 .cjs 结尾的文件
  });
};
buildModules();
