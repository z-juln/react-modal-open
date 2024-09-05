/**
 * 创建新组件
 */
const shell = require('shelljs');
const changeCase = require('@juln/change-case');
const input = require('@inquirer/input').default;
const path = require('path');

(async () => {
  const name = changeCase(await input({ message: 'Enter component name' }), 'upper-camel-case');
  const desc = await input({ message: 'Enter component description' });

  // 1. generate by template
  const templateDir = path.resolve(__dirname, `./new-template`);
  const outputDir = path.resolve(__dirname, `../src/${name}`);

  shell.exec(
    'pull-ejs-tpl local <outputDir> <templateDir> --parseFilename --params.name="<componentName>" --params.desc="<description>"'
      .replace('<outputDir>', outputDir)
      .replace('<templateDir>', templateDir)
      .replace('<componentName>', name)
      .replace('<description>', desc)
  );

  // 2. export component
  const entry = path.resolve(__dirname, '../src/index.ts');
  shell.ShellString(
    shell.cat(entry).replace('// new-component-export', `export { default as ${name} } from './${name}';\n// new-component-export`)
  ).to(entry);

  shell.echo(`ok: ${outputDir}/index.tsx`);
})();
