# 解决 GitHub Pages 404

代码已在 GitHub 上，但 **Pages 尚未在仓库里开启**，所以会显示 404。

## 请按顺序操作（只需做一次）

### 步骤 1：打开 Pages 设置

https://github.com/eleveneigh/kdli-website/settings/pages

### 步骤 2：选择发布方式

在 **Build and deployment** 区域：

| 选项 | 选择 |
|------|------|
| **Source** | Deploy from a branch |
| **Branch** | `main` |
| **Folder** | `/ (root)` |

点击 **Save**。

> 若列表里已有 `gh-pages` 分支（Actions 自动生成），也可选 `gh-pages` + `/ (root)`，效果相同。

### 步骤 3：等待部署

- 同一页面顶部会出现：**Your site is live at …**
- 通常需要 **1～5 分钟**
- 可刷新查看；首次部署有时会稍慢

### 步骤 4：打开网站

**https://eleveneigh.github.io/kdli-website/**

注意：必须是带仓库名 `kdli-website` 的完整地址。  
`https://eleveneigh.github.io/` 根地址没有站点，也会 404。

---

## 仍 404 时检查

1. Settings → Pages 是否显示绿色 Live 链接  
2. 仓库是否为 **Public**（私有库免费版可能无法发布 Pages）  
3. 是否等了至少 5 分钟  
4. 浏览器无痕窗口再试一次
