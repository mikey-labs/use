const {build} = require('esbuild');
const bundle = (format)=>{
    const ext = format === 'esm' ? '.mjs' : '.js';
    const outfile = `dist/index.${format}${ext}`;
    const finish = () => console.log('Build finished:', outfile);
    const onRebuild = (error) => (error ? console.log(error) : finish());
    build({
        format,
        bundle:true,
        target: ['chrome53'],
        outfile,
        charset: 'utf8',
        entryPoints: ['./src/index.ts'],
    }).then(finish);
}
bundle('esm');
bundle('cjs');
