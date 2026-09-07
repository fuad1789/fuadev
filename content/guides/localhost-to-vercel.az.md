# Localhost nədir və niyə problem yaradır

Layihəni işə salırsan, terminal sənə bir ünvan verir:

```
http://localhost:3000
```

Ünvanı açırsan — sayt işləyir. Hər şey yerindədir. Sonra həmin linki dostuna göndərirsən və onda açılmır. Səhv bir şey etməmisən; link elə göndərilməyə uyğun deyil.

`localhost` bir sayt adı deyil. **"Bu kompüter"** deməkdir. Sənin brauzerin o ünvanı görəndə internetə çıxmır, öz maşınına müraciət edir. Dostunun brauzeri də eyni şeyi edir — öz maşınına. Orada isə sənin layihən yoxdur.

Nəticə budur: sayt hələ mövcud deyil. Sənin kompüterində işləyən bir proqramdır. İnternetdə mövcud olması üçün onun daim açıq qalan bir kompüterdə — serverdə — durması lazımdır.

Əvvəllər bu, server icarəsi, Linux, nginx və SSL sertifikatı demək idi. İndi deyil. Aşağıdakı proses pulsuzdur və ilk dəfə edəndə təxminən 10 dəqiqə çəkir.

---

# Nə lazımdır

- Layihənin özü — Next.js, React, Vite, Astro, hətta tək bir `index.html`. Fərqi yoxdur.
- [GitHub](https://github.com) hesabı — pulsuz.
- [Vercel](https://vercel.com) hesabı — pulsuz, GitHub ilə daxil olursan.

Kart məlumatı tələb olunmur. Ödəniş mərhələsi yoxdur.

---

# Addım 1 — Kodu GitHub-a at

GitHub kodun saxlandığı yerdir. Vercel saytı birbaşa oradan götürür, ona görə bu addım atlanmır.

## Terminal istifadə etmək istəmirsənsə

[GitHub Desktop](https://desktop.github.com) yüklə, hesabınla daxil ol və **Add → Add Existing Repository** ilə layihə qovluğunu seç. Sonra **Publish repository** düyməsini bas. Vəssalam.

Pəncərədə **"Keep this code private"** seçimi var. İşarəli qalsın — kod yalnız sənə görünəcək, sayt yenə də hamıya açıq olacaq. Bu ikisi ayrı şeylərdir.

## Terminaldan

Layihə qovluğunda:

```
git init
git add .
git commit -m "first commit"
```

Sonra GitHub-da yeni, boş repository yarat. GitHub sənə hazır əmrləri göstərəcək, təxminən belə:

```
git remote add origin https://github.com/istifadeci-adin/layihe-adi.git
git branch -M main
git push -u origin main
```

## Push etməzdən əvvəl iki şeyi yoxla

**`.gitignore` faylı var?** İçində ən azı bunlar olmalıdır:

```
node_modules
.next
.env
.env.local
```

`node_modules` minlərlə fayldır və GitHub-a yüklənməməlidir — Vercel onu özü quraşdırır.

**Açarların koda yazılmayıb?** API açarı, parol, verilənlər bazası linki — bunlar `.env.local` faylında olmalıdır və o fayl GitHub-a getməməlidir. Bir dəfə push edilən açar artıq açıqdır; commit-i silsən də tarixdə qalır. Belə bir şey olubsa, açarı ləğv edib yenisini yarat.

---

# Addım 2 — Vercel-də deploy

1. [vercel.com](https://vercel.com) → **Continue with GitHub**.
2. **Add New → Project**.
3. Siyahıda layihəni tap və **Import** bas.
4. Vercel framework-ü özü tanıyır. Next.js istifadə edirsənsə, bütün sahələr artıq doğru doldurulub — heç nəyə toxunma.
5. **Deploy**.

Bir-iki dəqiqə gözləyirsən. Ekranda konfeti və link çıxır:

```
https://layihe-adi.vercel.app
```

Bu link artıq işləyir. Telefondan, başqa şəhərdən, başqa ölkədən — hamıda açılır. Kompüterini söndürsən də açılmağa davam edir.

## `.env.local` faylın varsa

Bu, ən çox buraxılan səhvdir. Həmin fayl GitHub-a getmir (getməli də deyil), yəni Vercel onun içindəkiləri görmür. Nəticədə lokalda işləyən sayt production-da boş səhifə və ya xəta verir.

Həlli: Vercel-də layihənin **Settings → Environment Variables** bölməsinə keç və `.env.local` içindəki hər sətri əl ilə əlavə et. Sonra **Deployments** bölməsindən son deploy-u **Redeploy** et — dəyişənlər yalnız yeni build-də oxunur.

---

# Addım 3 — Bundan sonra necə işləyir

Deploy bir dəfəlik əməliyyat deyil. GitHub ilə Vercel arasında əlaqə qurulub və o, belə davam edir:

- `main` branch-ə push etdin — Vercel avtomatik yeni build götürür, 1-2 dəqiqəyə sayt yenilənir. Heç nəyə basmırsan.
- Başqa branch-ə push etdin — Vercel ayrıca **preview link** verir. Sayt dəyişikliyi canlıda görmək və ya müştəriyə göstərmək üçün bu linki istifadə et; əsas sayta toxunmur.
- Yeni versiya xarab çıxdı — **Deployments** siyahısından köhnə deploy-u seçib **Rollback** edirsən. Saniyələr içində geri qayıdır.

Yəni iş axını sadələşir: kodu yazırsan, push edirsən, sayt yenilənir.

---

# Addım 4 — Öz domenin

`layihe-adi.vercel.app` linki test üçün normaldır. Müştəriyə vermək üçün yox — ünvanda sənin adın deyil, platformanın adı görünür.

Öz domenini bağlamaq üçün:

1. Domeni al. Namecheap, GoDaddy, Cloudflare və ya `.az` üçün yerli reyestrlər — hansı olduğunun əhəmiyyəti yoxdur.
2. Vercel-də layihənin **Settings → Domains** bölməsinə domeni yaz və **Add** bas.
3. Vercel sənə iki-üç DNS sətri göstərəcək (A və ya CNAME qeydləri). Həmin dəyərləri olduğu kimi domeni aldığın saytın DNS panelinə köçür.
4. Gözlə. Adətən 10-30 dəqiqə, bəzən bir neçə saat çəkir.

SSL sertifikatını — ünvanın yanındakı kilid işarəsini — Vercel özü qurur və özü yeniləyir. Sən heç nə etmirsən.

Domen pulludur: `.com` üçün ildə təxminən 10-15 dollar, `.az` üçün ayrı tarif. Hostinq pulsuz olsa da, ad pulludur.

---

# Ən çox rast gəlinən 5 səhv

**"Build failed" yazır, lokalda isə işləyir.**
Səbəb demək olar həmişə eynidir: lokalda `npm run dev` işlədirsən, Vercel isə `npm run build` işlədir. Bunlar fərqli şeylərdir. Push etməzdən əvvəl öz kompüterində `npm run build` yaz — xəta varsa, elə orada görəcəksən.

**Şəkillər lokalda çıxır, saytda çıxmır.**
Vercel Linux-da build edir, Linux isə hərf registrinə həssasdır. `Logo.png` faylını `logo.png` kimi çağırırsansa, Windows-da işləyir, serverdə işləmir. Fayl adı ilə koddakı ad hərfbəhərf üst-üstə düşməlidir.

**Sayt açılır, amma məlumat gəlmir.**
Kodda `http://localhost:8000` kimi bir ünvan qalıb. Serverin üçün `localhost` həmin serverin özü deməkdir — sənin kompüterin deyil. Belə ünvanlar environment dəyişəninə çıxarılmalı və production üçün real ünvanla doldurulmalıdır.

**Environment dəyişənlərini əlavə etdim, yenə işləmir.**
Redeploy etməmisən. Dəyişənlər mövcud build-ə təsir etmir, yalnız növbətisinə.

**Node versiyası fərqlidir.**
Lokalda köhnə Node ilə işləyirsənsə, Vercel-in default versiyasında paketlərdən biri xəta verə bilər. **Settings → General → Node.js Version** bölməsindən versiyanı uyğunlaşdır.

---

# Pulsuz plan nəyə çatır

Vercel-in **Hobby** planı ilə: limitsiz sayda layihə, avtomatik deploy, SSL, custom domen və dünya üzrə CDN. Şəxsi layihələr, portfolio, pet-project və demo üçün tam kifayətdir.

Bir vacib şərt var: **Hobby planı kommersiya üçün nəzərdə tutulmayıb.** Sayt üzərindən pul qazanırsansa və ya müştəri üçün qurursansa, qaydalara görə **Pro** plana keçməlisən — aylıq 20 dollar. Layihə böyüyəndə bunu bilməmək xoşagəlməz olur, ona görə əvvəldən yazıram.

---

# Yekun

Saytı yığmaq işin yarısıdır. Yayımlanmayan sayt yoxdur — sadəcə sənin kompüterində açılan bir qovluqdur.

Proses qısaca belədir: kodu GitHub-a at, Vercel-də import et, Deploy bas, lazımdırsa domen bağla. Bir dəfə edəndən sonra növbəti layihələrdə bu, iki dəqiqəlik işə çevrilir.

İlişdiyin yer olsa, [əlaqə bölməsindən](/#contact) yaz — xətanın ekran şəklini göndər, birlikdə baxarıq.
