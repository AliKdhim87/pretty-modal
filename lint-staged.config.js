module.exports = {
  '*.{js,jsx,ts,tsx,md,html,css,json}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
  '**/*.{tsx,ts}?(x)': () => 'tsc -p tsconfig.json --noEmit',
}
