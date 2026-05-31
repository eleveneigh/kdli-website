# 昆山杜克大学法律、市场与社会研究院 / Duke Kunshan University Institute for Law, Markets, and Society

Bilingual (中文 / English) static website for a research institute at **Duke Kunshan** (昆山杜克).

**对外发布说明见 [DEPLOY.md](./DEPLOY.md)**

## Preview locally

```bash
cd website
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Structure

| Section | Pages |
|---------|--------|
| **Home** | News, Contact |
| **About** | Mission, People, Annual Report |
| **Research** | China Capital Market (Database, Interviews, Reports), Law in Market Economy, Markets Ethics & Society |
| **Events** | Lectures, Symposia, Student Events |
| **Opportunities** | Grants, Student Research, Hiring |

## Customization

- **Translations**: Edit `js/translations.js` for all bilingual text.
- **News / people / events**: Replace placeholder content in HTML pages or connect a CMS later.
- **Branding**: Adjust colors in `css/main.css` (`--navy`, `--gold`).

Language preference is saved in `localStorage`. Use the **中文 / EN** button in the header to switch.
