// eslint-disable-next-line no-undef
module.exports = {
  'src/**/*.(js|ts)': filenames => [
    'npx tsc --noEmit',
    `npx prettier --write ${filenames.join(' ')}`,
    `npx eslint --fix ${filenames.join(' ')}`
  ],

  '**/*.(html|md|json|yml|yaml)': filenames =>
    `npx prettier --plugin-search-dir . --write ${filenames.join(' ')}`
}
