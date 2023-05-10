const path = require("path");

const PREFIX_IN_COMPONENT_NAME_IF_START_WITH_NUMBER = "Svg";
const POSTFIX_IN_FILE_NAME = "24Px";
const POSTFIX_IN_COMPONENT_NAME = "Icon";

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));

    /*
     * Check if file name starts with number,
     * if true: add prefix ->  PREFIX_IN_COMPONENT_NAME_IF_START_WITH_NUMBER
     */
    let exportName = /^\d/.test(basename)
      ? `${PREFIX_IN_COMPONENT_NAME_IF_START_WITH_NUMBER}${basename}`
      : basename;

    /*
     * Replace postfix in file name with another one
     * POSTFIX_IN_FILE_NAME(24Px) -> POSTFIX_IN_COMPONENT_NAME(Icon)
     * Must be separated because some icons doesn't have 24px in the end
     */
    exportName = exportName.replace(POSTFIX_IN_FILE_NAME, "");
    exportName += POSTFIX_IN_COMPONENT_NAME;

    return `export { default as ${exportName} } from './${basename}'`;
  });
  return exportEntries.join("\n");
}

module.exports = defaultIndexTemplate;
