# 如何让网站对外可访问

本站是纯静态 HTML/CSS/JS，可部署到任意静态托管服务。推荐从 **GitHub Pages** 或 **Netlify** 开始（免费、操作简单）。

---

## 方案一：GitHub Pages（推荐，长期稳定）

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击 **New repository**，名称例如 `kdli-website`
3. 选择 **Public**

### 2. 推送代码（本地已 `git init` 并完成首次提交）

在 [GitHub 新建仓库](https://github.com/new)（例如 `kdli-website`，**不要**勾选 “Add a README”），然后执行：

```bash
cd "/Users/leyanwu/Library/CloudStorage/OneDrive-DukeUniversity/website"
git remote add origin https://github.com/你的用户名/kdli-website.git
git push -u origin main
```

### 3. 开启 GitHub Pages

1. 仓库 → **Settings** → **Pages**
2. **Build and deployment** → **Source** 选 **GitHub Actions**
3. 推送 `main` 后，Actions 会自动部署（工作流文件已包含在 `.github/workflows/pages.yml`）
4. 约 1–3 分钟后，在 **Settings → Pages** 查看站点 URL

网站地址为：`https://你的用户名.github.io/kdli-website/`

> 若改用 “Deploy from a branch / main / root” 也可以，与本仓库的静态文件结构兼容。

> 若使用自定义域名（如 `law.dukekunshan.edu.cn`），需学校 IT 在 DNS 添加 CNAME 记录，并在 GitHub Pages 填写 Custom domain。

---

## 方案二：Netlify（拖拽即可，最快）

1. 打开 [https://app.netlify.com](https://app.netlify.com) 并注册
2. 将整个 `website` 文件夹拖到 **Sites → Add new site → Deploy manually**
3. 几秒后会得到一个地址，例如 `https://random-name.netlify.app`

可在 **Domain settings** 中绑定学校提供的域名。

---

## 方案三：学校官方服务器（最正式）

联系 Duke Kunshan IT / Communications，说明需要托管研究所静态网站，通常他们会：

- 提供子域名（如 `ilms.dukekunshan.edu.cn`）
- 或放在现有 CMS / 服务器上

把 `website` 文件夹内容交给 IT 上传即可。

---

## 临时分享（仅演示，几小时内有效）

若只想让同事先看一下、尚未部署：

```bash
cd website
python3 -m http.server 8080
```

另开终端安装 [ngrok](https://ngrok.com/) 后：

```bash
ngrok http 8080
```

会生成一个临时公网链接（关闭电脑或 ngrok 后失效）。

---

## 部署后检查清单

- [ ] 首页能打开，导航各子页面正常
- [ ] 点击右上角 **中文 / EN** 可切换语言
- [ ] 手机浏览器显示正常
- [ ] 联系邮箱 `ilms@dukekunshan.edu.cn` 可点击发信

如有问题，可先确认浏览器未拦截 `localStorage`（隐私模式有时会影响语言记忆）。
