`easycom` 配置的确不会直接查找 `node_modules`，但它能够处理来自 `node_modules` 的组件，因为组件库通常会通过构建工具和路径配置提供组件路径。下面详细解释一下：

### 组件路径处理

- **在 `node_modules` 中的组件**：即使 `easycom` 不直接查询 `node_modules`，你可以通过配置让它找到并自动引入这些组件。这是通过配置 `custom` 属性来实现的，`custom` 属性定义了一个路径映射规则，这样 `easycom` 就能够理解如何从组件名推导出实际的文件路径。

### 具体配置解析

```json
"easycom": {
	"autoscan": true,
	"custom": {
		// uni-ui 规则如下配置
		"^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
	}
}

```

- 这个正则表达式和路径配置告诉 `easycom`，当遇到以 `uni-` 开头的组件名时，它应该去 `@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue` 路径下查找对应的 Vue 文件。这个路径是相对于 `node_modules` 的，但你不需要显式地指定 `node_modules` 目录，因为这个路径配置隐含了对 `node_modules` 的引用。

### 如何工作

- **构建工具**：Uni-app 的构建工具（如 Vite、Webpack 等）在编译时会处理这些路径。它会根据配置将 `@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue` 解析为实际的 `node_modules/@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue`。

- **路径映射**：通过配置路径映射，`easycom` 能够将组件名映射到 `node_modules` 中的实际路径，而不需要直接在配置中写出 `node_modules`。

### 总结

`easycom` 的配置使得你可以在项目中使用简化的组件名，而不需要显式地引入每一个组件。构建工具会处理实际的路径解析和引入，确保组件能从 `node_modules` 中正确加载。这种配置方式大大简化了组件的管理和使用过程。
