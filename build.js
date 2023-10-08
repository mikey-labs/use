const { build, context } = require("esbuild");
const isWatch = process.argv.includes("-w");
const bundle = (format) => {
    const ext = format === "esm" ? ".mjs" : ".js";
    const fileName = format === "iife" ? `browser${ext}` : `${format}${ext}`;
    const outfile = `dist/index.${fileName}`;
    const config = {
        format,
        globalName: "Tools",
        bundle: true,
        target: ["chrome53"],
        outfile,
        charset: "utf8",
        entryPoints: ["./src/index.ts"],
    };
    if (isWatch) {
        context(config).then((ctx) => {
            ctx.watch().then(() => console.log("watching..."));
        });
    } else {
        build(config).then(() => console.log("Build finished:", outfile));
    }
};
if (isWatch) {
    bundle("esm");
} else {
    bundle("esm");
    bundle("cjs");
    bundle("iife");
}
