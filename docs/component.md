---
outline: deep
---

# 🧩 组件 Component

本文旨在提供Angular组件开发的最佳实践指南，以帮助开发者更好地理解和使用Angular组件。

::: tip
如果你还不知道什么是组件，请查看angular对于组件的 [定义](https://angular.cn/essentials/components)  
如果你对组件已经有了基本的了解，想了解更多关于组件的知识，可以选择进行 [深度阅读](https://angular.cn/guide/components)
:::

<span class="weak-text">:rocket: 如果你已经对angular组件有了全面的了解，那么一起来看看如何做出一个最佳的组件吧！</span>

## 开发流程
标准组件开发流程如下
1. [设计](#组件设计)
2. [开发](#组件开发)
3. [测试](#组件测试)
4. [发布](#组件发布)
5. [使用](#组件使用)

### 组件设计
在设计组件时，以下几个问题是需要考虑的

#### 1. 组件的定位
大部分组件都可以按照其功能与逻辑，分为以下三类

- **UI组件**：只负责展示内容，不涉及任何逻辑。常见的UI组件有**按钮**，**图标️**，**卡片**
- **简单组件**，**通用组件**，**容器组件**：包含基本逻辑和状态管理，会将数据传递给UI组件用以展示，没有特定的业务逻辑。常见的各种**表单项**组件，**列表**组件都属于这个范畴
- **复杂组件**：通常包含多个嵌套的子组件，有复杂的逻辑和状态管理，通常和业务逻辑耦合度较高。**路由**组件和**页面**组件通常是复杂组件

<span class="weak-text">在确定UI设计与需求后，开发人员可以按照以上分类来确定组件的定位，再进行后续的开发工作</span>

#### 2. 组件的接口
组件的接口包括[输入](https://angular.cn/guide/components/inputs)和[输出](https://angular.cn/guide/components/outputs)两部分。根据UI设计与应用场景，可以确定组件的输入输出接口，以便于组件的复用和扩展
:::info
想自定义背景色？在组件中定义一个`@Input('backgroundColor')`属性来接收背景色   
想自定义标题？在组件中定义一个`@Input('title')`属性来接收标题   
想控制组件的显示与隐藏？在组件中定义一个`@Input('isVisible')`属性来控制组件的显示与隐藏   

你可以传任何类型的数据给组件，比如字符串，数字，对象，数组等   
推荐传递简单数据类型，避免传递复杂对象，以便于更精细地控制组件的样式与行为（这涉及angular的视图更新机制，不在这里做深入讨论）
:::

### 组件开发

组件的结构应该清晰明了，便于维护和扩展。通常一个组件包含以下几个部分
- **模板**：组件的视图结构，通常使用`template`或`templateUrl`来定义，读者应当熟悉[模板语法](https://angular.cn/guide/templates)
- **样式**：组件的样式表, 通常使用`styles`或`styleUrls`来定义，推荐使用[scss](https://sass-lang.com/)来编写样式
- **逻辑**：组件的业务逻辑，通常在组件类中实现
- **数据**：组件的数据管理，一般使用`@Input`和`@Output`来传递数据，也可以使用`Service`来管理数据

#### 示例
**UI按钮组件**  
`deep-button.component.html`
```html
<button class="deep-button" (click)="onClick()">
  <ng-content></ng-content>
</button>
```   
::: tip
angular项目中，习惯以component作为后缀，来标识这个文件属于component   
如果需要一个文件来放置interface类，文件名可以是button.interface.ts
:::

`deep-button.component.ts`
```typescript
@Component({
  standalone: true, /** 标明本组件是一个独立组件,该属性允许在组件内直接导入其他的模块 */
  selector: 'deep-button', /** 组件选择器 */
  templateUrl: './deep-button.component.html', /** 模板文件 */
  styleUrls: ['./deep-button.component.scss'], /** 样式文件 */
  changeDetection: ChangeDetectionStrategy.OnPush, /** 变更检测策略 */
  encapsulation: ViewEncapsulation.Emulated, /** 视图封装策略 */
})
```   
::: tip
- [组件选择器](https://angular.cn/guide/components/selectors)
- [变更检测策略](https://angular.cn/guide/components/advanced-configuration#changedetectionstrategy)
- [视图封装策略](https://angular.cn/guide/components/styling#style-scoping)
:::

### 组件测试

### 组件发布

### 组件使用
