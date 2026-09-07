# What localhost is, and why it gets in the way

You start the project, and the terminal hands you an address:

```
http://localhost:3000
```

You open it — the site works. Everything is in place. Then you send that link to a friend and it opens nothing on their end. You did not do anything wrong; the link was never meant to travel.

`localhost` is not a website name. It means **"this computer"**. When your browser sees that address it does not go out to the internet, it turns back to your own machine. Your friend's browser does exactly the same thing — with their machine. And your project is not on it.

Which leads to the real point: the site does not exist yet. It is a program running on your computer. For it to exist on the internet it has to sit on a machine that stays on — a server.

That used to mean renting a server, learning Linux, configuring nginx and buying an SSL certificate. Not anymore. What follows is free and takes about ten minutes the first time.

---

# What you need

- The project itself — Next.js, React, Vite, Astro, even a single `index.html`. It does not matter.
- A [GitHub](https://github.com) account — free.
- A [Vercel](https://vercel.com) account — free, you sign in with GitHub.

No card details. There is no payment step.

---

# Step 1 — Push the code to GitHub

GitHub is where the code lives. Vercel pulls the site straight from there, so this step is not optional.

## If you would rather not touch the terminal

Install [GitHub Desktop](https://desktop.github.com), sign in, and use **Add → Add Existing Repository** to pick your project folder. Then press **Publish repository**. That is the whole thing.

The dialog has a **"Keep this code private"** checkbox. Leave it checked — the code stays visible only to you, and the site is still public to everyone. Those are two separate things.

## From the terminal

In the project folder:

```
git init
git add .
git commit -m "first commit"
```

Then create a new, empty repository on GitHub. It will show you the exact commands, roughly these:

```
git remote add origin https://github.com/your-username/your-project.git
git branch -M main
git push -u origin main
```

## Two things to check before you push

**Do you have a `.gitignore` file?** It should contain at least:

```
node_modules
.next
.env
.env.local
```

`node_modules` is thousands of files and has no business on GitHub — Vercel installs it for you.

**Are any keys hard-coded?** API keys, passwords, database URLs belong in `.env.local`, and that file must not reach GitHub. A key that has been pushed once is public; deleting the commit does not remove it from the history. If it happened, revoke the key and issue a new one.

---

# Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Continue with GitHub**.
2. **Add New → Project**.
3. Find the repository in the list and press **Import**.
4. Vercel detects the framework itself. On Next.js every field is already filled in correctly — leave them alone.
5. **Deploy**.

You wait a minute or two. Confetti, and a link:

```
https://your-project.vercel.app
```

That link works now. From a phone, from another city, from another country. It keeps working after you shut your computer down.

## If you have a `.env.local` file

This is the mistake people hit most often. That file does not go to GitHub — and it should not — which means Vercel never sees what is inside it. So a site that runs locally comes back blank or broken in production.

The fix: open **Settings → Environment Variables** on the Vercel project and add every line from `.env.local` by hand. Then go to **Deployments** and **Redeploy** the latest one — variables are only read at build time.

---

# Step 3 — How it works from here on

Deploying is not a one-off operation. GitHub and Vercel are now connected, and the connection behaves like this:

- You push to `main` — Vercel builds automatically and the site updates in a minute or two. You press nothing.
- You push to another branch — Vercel gives you a separate **preview link**. Use it to look at a change live, or to show a client, without touching the real site.
- A new version turns out broken — pick an older deployment from the **Deployments** list and hit **Rollback**. It is back within seconds.

The workflow collapses into: write code, push, site updates.

---

# Step 4 — Your own domain

`your-project.vercel.app` is fine for testing. It is not fine for a client — the address carries the platform's name, not yours.

To connect your own domain:

1. Buy it. Namecheap, GoDaddy, Cloudflare, or a local registrar for a country domain — the registrar does not matter.
2. In the Vercel project, open **Settings → Domains**, type the domain and press **Add**.
3. Vercel shows you two or three DNS lines (A or CNAME records). Copy those values as-is into the DNS panel where you bought the domain.
4. Wait. Usually ten to thirty minutes, occasionally a few hours.

The SSL certificate — the padlock next to the address — is issued and renewed by Vercel. You do nothing.

Domains cost money: roughly $10-15 a year for a `.com`, different rates for country domains. Hosting is free, the name is not.

---

# The five failures you are most likely to hit

**It says "Build failed" but it runs locally.**
The reason is almost always the same: locally you run `npm run dev`, Vercel runs `npm run build`. They are different things. Run `npm run build` on your own machine before pushing and you will see the error there instead.

**Images show up locally and not on the deployed site.**
Vercel builds on Linux, and Linux is case-sensitive. If the file is `Logo.png` and your code asks for `logo.png`, Windows forgives it and the server does not. The filename and the string in the code have to match letter for letter.

**The site loads but no data arrives.**
There is an address like `http://localhost:8000` left in the code. To your server, `localhost` means that server itself — not your computer. Addresses like that belong in an environment variable, filled with the real URL for production.

**I added the environment variables and it still fails.**
You have not redeployed. Variables do not affect an existing build, only the next one.

**The Node version is different.**
If you develop on an older Node, one of your packages may break on Vercel's default. Match them under **Settings → General → Node.js Version**.

---

# What the free plan covers

Vercel's **Hobby** plan gives you unlimited projects, automatic deployments, SSL, custom domains and a global CDN. For personal projects, a portfolio, side projects and demos it is genuinely enough.

One condition matters: **Hobby is not meant for commercial use.** If the site makes money, or you are building it for a client, the terms put you on **Pro** — $20 a month. Finding that out late is unpleasant, so it is worth knowing up front.

---

# In short

Building the site is half the work. A site that is never published does not exist — it is a folder that opens on your computer.

The process, condensed: push the code to GitHub, import it on Vercel, press Deploy, connect a domain if you need one. After the first time, it becomes a two-minute job on every project that follows.

If you get stuck, write to me from the [contact section](/#contact) — send a screenshot of the error and we will look at it together.
