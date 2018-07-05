module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  extends: [
		// add more generic rulesets here, such as:
		// 'eslint:recommended',

    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		'plugin:vue/essential'
	],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off'
  }
}
