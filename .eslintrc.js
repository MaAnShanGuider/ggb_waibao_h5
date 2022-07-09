module.exports = {
	"parser": "@typescript-eslint/parser",
	"extends": [
		'plugin:@typescript-eslint/recommended',
		"react-app",
		"react-app/jest",
		"airbnb-base"
	],
	plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
	env: { // 指定代码的运行环境
		browser: true,
		node: true,
	},
	settings: { // 自动发现React的版本，从而进行规范react代码
		"react": {
			"pragma": "React",
			"version": "detect"
		}
	},
	parserOptions: { // 指定ESLint可以解析JSX语法
		"ecmaVersion": 2019,
		"sourceType": 'module',
		"ecmaFeatures": {
			jsx: true
		}
	},
	rules: {
		"@typescript-eslint/no-empty-interface": [
			0,
			{
				"allowSingleExtends": false
			}
		],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-var-requires": "off",
		// airbnb
		"comma-dangle": ["off", {
			"arrays": "never",
			"objects": "ignore",
			"imports": "never",
			"exports": "never",
			"functions": "ignore"
		}],
		"react-hooks/exhaustive-deps": "off",
		"array-bracket-spacing": 0,
		"linebreak-style": 0,
		"no-async-promise-executor": 0,
		"camelcase": 0,
		"dot-notation": 0,
		"new-parens": ["warn"],
		"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
		"object-curly-newline": 0, // { a, b, c } 允许不换行
		"arrow-body-style": 0, // a => 1
		"arrow-parens": 0, // a => 1
		"quote-props": 0, // "a-1": 2
		"guard-for-in": 0, // xx.hasOwnProperty(key)
		"no-restricted-syntax": 0,
		"global-require": 0,
		"eqeqeq": 0,
		"no-plusplus": 0,
		"no-unused-expressions": 0,
		"no-undef": 0,
		"space-before-function-paren": 1,
		"no-unused-vars": 0,
		"import/no-extraneous-dependencies": 0,
		"import/prefer-default-export": 0,
		"import/newline-after-import": ["warn"],
		"import/first": 0,
		"import/extensions": 0,
		"import/no-unresolved": 0,
		"no-multiple-empty-lines": 1,
		"no-restricted-globals": 0,
		"no-param-reassign": 0,
		"no-multi-spaces": 1,
		"consistent-return": 0,
		"no-useless-return": 0,
		"prefer-const": 0,
		"no-explicit-any": 0,
		"no-else-return": 0,
		"no-void": 0,
		"func-names": 0,
		"prefer-arrow-callback": 0,
		"no-bitwise": 0,
		"no-restricted-properties": 0,
		"padded-blocks": 0, // {} 允许空行
		"no-return-assign": 0,
		"max-len": ["warn", { "code": 450, "ignoreComments": true }],
		"prefer-destructuring": 0,
		"prefer-template": 0,
		"no-nested-ternary": 0,
		"no-mixed-operators": 0,
		"radix": 0,
		"prefer-rest-params": 0,
		"class-methods-use-this": 0,
		// tab缩进
		"indent": ["warn", "tab",
			{
				"SwitchCase": 1
			}],
		"no-tabs": 0,
		"quotes": 0,
		"no-console": 0,
		"no-debugger": 1,
		"no-var": 1,
		"import/named": 0,
		"semi": [
			1,
			"always"
		],
		"no-trailing-spaces": 0,
		"eol-last": 0,
		"no-underscore-dangle": 0,
		"no-alert": 0,
		"no-irregular-whitespace": 0,
		"no-lone-blocks": 0,
		// 关键字周围强制使用空格
		"keyword-spacing": [
			"error",
			{
				"before": true,
				"after": true
			}
		],
		// 大括号中强制使用空格
		"object-curly-spacing": [
			"warn",
			"always"
		],
		// 单行代码块前后要加空格
		"block-spacing": [
			"warn",
			"always"
		],
		// 逗号后面加空格
		"comma-spacing": [
			"warn",
			{
				"before": false,
				"after": true
			}
		],
		// 分号后面加空格
		"semi-spacing": [
			"warn",
			{
				"before": false,
				"after": true
			}
		],
		// 在注释前有空白
		"spaced-comment": [
			"warn",
			"always"
		],
		// 箭头函数前后要有空格
		"arrow-spacing": [
			"warn",
			{
				"before": true,
				"after": true
			}
		],
		// 对象字面量的属性中键和值之间使用一致的间距
		"key-spacing": [
			"warn",
			{
				"beforeColon": false,
				"afterColon": true
			}
		],
		// 要求操作符周围有空格
		"space-infix-ops": [
			"warn",
			{
				"int32Hint": false
			}
		],
		"jsx-quotes": 1,
	}
};