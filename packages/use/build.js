const { build, context } = require("esbuild");
const isWatch = process.argv.includes("-w");
const bundle = (format) => {
    const ext = format === "esm" ? ".mjs" : ".js";
    const outfile = `dist/index.${format}${ext}`;
    const config = {
        format,
        bundle: true,
        target: ["chrome53"],
        outfile,
        charset: "utf8",
        entryPoints: ["./src/index.ts"],
    };
    if (isWatch) {
        context(config).then((ctx)=>{
            ctx.watch().then(() => console.log("watching..."));
        })
    } else {
        build(config).then(() => console.log("Build finished:", outfile));
    }
};
if(isWatch){
    bundle("esm");
} else {
    bundle("esm");
    bundle("cjs");
}

