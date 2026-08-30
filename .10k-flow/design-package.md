# Bambu Studio — Tasarım Paketi

Bağlayıcı sözleşme: .claude/skills/10k-websites-flow/references/visual-grammar.md
Referans sınıfı: izole özne, dikişsiz stüdyo fonu, occlusion tipografi, teknik
çizim UI dili.

Durum: Bölüm 1-8 tamam. Bölüm 9 (video türevli UI zaman çizelgesi) hero videosu
kabul edilip işlendikten sonra doldurulacak. Bu paketteki tüm UI konumları
hipotezdir.

## 1. Marka öncülü

- Marka: Bambu Studio
- Kitle: Türkiye'de küçük ve orta ölçekli işletme sahipleri. Kafe, kuaför,
  klinik, butik, emlak, yerel hizmet.
- Alıcının acısı: Daha önce bir ajansa ödeme yaptı, sonra kimse telefonu açmadı.
  Ya da hiç denemedi, çünkü aldığı tek teklif aylık 13.500 TL idi.
  Kendi cümleleri: "Para aldıktan sonra ulaşamadım." "Marka ismim bile yanlış
  yazılmıştı." "Telefonlar açılmadı, WhatsApp'tan engellendim."
- İstediği sonuç: Hesabında her hafta, düzenli olarak, gerçekten yayınlanan,
  utanmayacağı kalitede içerik. Ve bunun ne zaman olacağını önceden bilmek.
- Ana itiraz: "Bu fiyata iyi iş çıkmaz." ve "Bunlar da mı kaybolacak?"
- Ses: Sakin, net, abartısız. Rakam verir, söz vermez.
- Tek çağrı: WhatsApp'tan yaz, paketini seç.

## 2. Kahraman nesne sözleşmesi

Bambu Studio'nun fiziksel bir ürünü yok. visual-grammar.md Bölüm C gereği tek bir
kahraman nesne icat edildi.

- Nesne: BOGUM. Tek bir bambu gövde parçası, hassas işlenmiş bir lüks obje
  olarak yeniden tasarlanmış hali.
- Malzeme: gövde çok koyu yeşil siyah saten lake, altında bambu lifinin dikey
  dokusu hafifçe okunur. Boğum halkaları fırçalanmış şampanya rengi metal, ince
  tırtıllı, açılabileceğini ima eden kıl payı bir dikişle.
- Oran: yaklaşık 3'e 1 dikey. Üst kesit düz ve açık, içerideki eşmerkezli boşluk
  görünür. Alt kesit düz.
- Kaç parçaya ayrılır: altı.

| Konum | Parça | Hizmet |
|---|---|---|
| 1 | Sol lake bölüm | Web sitesi |
| 2 | Birinci metal halka | Görsel üretim |
| 3 | Orta lake bölüm | Sosyal medya yönetimi |
| 4 | İkinci metal halka | Video üretim |
| 5 | Sağ lake bölüm, açık bore | Reklam yönetimi ve haftalık analiz raporu |

Not: segment 02 kabul edildikten sonra üretilen gerçek parça sayısına göre
düzeltildi. Flow altı yerine beş bileşen üretti. Analiz raporu ayrı hizmet
olmaktan çıkarılıp reklam yönetiminin altına alındı, zaten kopyada da öyleydi.

- Kaç varyantı var: üç. Varyantı belirleyen şey boğum sayısıdır.

| Varyant | Boğum | Paket |
|---|---|---|
| Kısa gövde | 2 | FILIZ, haftada 2 video |
| Orta gövde | 4 | GOVDE, haftada 4 video |
| Uzun gövde | 7 | ORMAN, haftada 7 video |

Boğum sayısı haftalık video sayısına eşittir. Fiyat tablosu nesnenin kendi
geometrisinden okunur.

- İşle bağı: marka adı Bambu. Bambu boğum boğum uzar, her boğum bir dönemdir.
  Düzenli paylaşım da boğum boğum ilerler. Nesne hem markanın adı hem işin ritmi.

## 3. Fon değeri yolculuğu ve palet

Renk nesneden gelir, arayüzden değil. Palet tek renkli, tek istisna boğum
halkasının şampanya metali.

    :root {
      --bg-light: #EDECEA;  /* segment 01 ve 04 fonu */
      --bg-mid:   #B9B9B6;  /* segment 02 fonu */
      --bg-dark:  #08090A;  /* segment 03 fonu */
      --ink:      #111312;  /* acik fon uzerinde birincil metin */
      --ink-inv:  #F4F3F0;  /* koyu fon uzerinde birincil metin */
      --label:    #8C8C88;  /* mikro etiket grisi */
      --rule:     #111312;  /* sac teli cetvel, opaklik 0.08 */
      --champ:    #B08D57;  /* bogum metali, sadece aktif durum isareti */
    }

--champ toplam yüzeyin en fazla yüzde ikisinde. Dolgu olarak asla, sadece
1 piksel çerçeve, 1 piksel alt çizgi veya tek nokta olarak.

Fon değeri yolculuğu: açık, orta, siyah, açık. Bu salınım bölüm duygusunu taşır
ve dördüncü segmentte açığa dönüş varış hissini verir.

## 3b. Tipografi üçlüsü

- Display: Archivo, 300 ve 400. Geniş, ince, büyük harf, geniş harf aralığı.
  12vw ile 26vw arasında dev boyutlarda, videonun ARKASINDA.
- Body: Inter Tight, 400 ve 500. Sadece 13 ile 15 piksel gövde metni.
- Mono: JetBrains Mono, 500. Sadece 10 ile 12 piksel mikro etiket, döndürülmüş
  leader etiketi, rakam ve fiyat.

Font dosyaları assets/fonts/ altına woff2 olarak yerel indirilir, site file://
ile de çalışır.

## 4. Ön hipotez: hero başlık bantları

Gerçek zaman aralıkları ve konumlar kabul edilen videonun kare analizinden sonra
Bölüm 9'da yeniden yazılacak.

Bant A / 0 - 13 / dev tipografi "BAMBU STUDIO", nesne onu keser
Bant B / 13 - 25 / "Şu anda kimse sizi göremiyor." sol boşlukta mikro blok
Bant C / 25 - 38 / patlamış parçaların altında leader etiketleri, altı hizmet
Bant D / 38 - 50 / üst bantta bölüm başlığı kalıbı
Bant E / 50 - 63 / siyah üzerinde iki tonlu dev başlık "YAPAY ZEKA / URETIM"
Bant F / 63 - 75 / sol sütunda kademeli opaklıklı mikro bloklar
Bant G / 75 - 88 / itiraz karşılama, sağ sütun
Bant H / 88 - 100 / üç gövde arasında paket blokları, daire rozet

## 5. Statik hero kopyası

- Kicker: BAMBU STUDIO
- Başlık: Hesabınız her hafta dolsun. Aylık 1.099 TL'den.
- Destek satırı: Web sitesi, sosyal medya yönetimi ve reklam. Yapay zekayla
  üretilen gerçekçi videolar, sizin seçtiğiniz sıklıkta paylaşılır.
- CTA: PAKETI SEC

## 6. İçerik envanteri

### 6.1 Acı
- Başlık: Şu anda kimse sizi göremiyor.
- Gövde: Son paylaşımınızın üstünden kaç hafta geçti. Rakibinizin hesabı her gün
  güncelleniyor, sizinki üç ay önce durdu. Fark yaratan şey bütçe değil, düzen.
- Aday video aralığı: 0.0 - 6.0 sn
- Aday güvenli bölge: sol yüzde kırk

### 6.2 Altı iş
- Başlık: Bir gövde, altı iş.
- Altı leader etiketi ve mikro bloğu:
  1. WEB SITESI. Anahtar teslim. Tasarım, yazı, kurulum ve yayın bizde. Alan adı
     yönlendirmesi ve hosting kurulumu dahil.
  2. GORSEL URETIM. Post, reels kapağı ve story görselleri. Marka renginize ve
     yazı tipinize sadık kalarak.
  3. SOSYAL MEDYA YONETIMI. Paket halinde. Üretim, metin ve paylaşım bizde.
     Takvim önden yazılı verilir.
  4. VIDEO URETIM. Ultra gerçekçi videoları yapay zekayla üretip elle kurguluyoruz.
  5. REKLAM YONETIMI. Paketlerden ayrı. Kreatif, metin, kurulum ve optimizasyon.
  6. ANALIZ RAPORU. Reklam alanlarda haftada bir sabit gün. Neyin ne kadara
     dönüştüğü rakamla.
- Aday video aralığı: 6.0 - 12.0 sn
- Aday güvenli bölge: üst bant ve alt bant

### 6.3 Yapay zeka üretimi
- Başlık iki tonlu: sönük "YAPAY ZEKA" üstte, parlak "URETIM" altta
- Gövde: Set kurmuyoruz, oyuncu tutmuyoruz, ekip çıkarmıyoruz. Videoları yapay
  zekayla üretip elle kurguluyoruz. Maliyetin düştüğü yer burası. Kalitenin
  düşmediği yer de burası, çünkü her kareyi biz seçiyoruz.
- Mikro bloklar: TESLIM SURESI / 48 saat. REVIZYON / paylasim oncesi sinirsiz.
- Aday video aralığı: 12.0 - 18.0 sn
- Aday güvenli bölge: sol ve sağ geniş siyah alan

### 6.4 Paketler
- Başlık: Üç boy. Ne sıklıkta paylaşacağınıza siz karar verin.
- Her gövdenin altında mikro blok:

  FILIZ / aylik 1.099 TL
  Haftada 2 video, 4 gorsel. Ayda 8 video, 16 gorsel.
  1 platform. Paylasim takvimi onden verilir.

  GOVDE / aylik 1.999 TL
  Haftada 4 video, 7 gorsel. Ayda 16 video, 28 gorsel.
  2 platform, capraz yayin. Aylik performans ozeti.

  ORMAN / aylik 3.499 TL
  Haftada 7 video, 12 gorsel. Ayda 28 video, 48 gorsel.
  Her gun en az bir paylasim. 3 platform.
  Oncelikli revizyon ve aylik strateji gorusmesi.

- Aday video aralığı: 18.0 - 24.0 sn
- Aday güvenli bölge: gövde araları ve üst bant

### 6.5 Reklam yönetimi
- Başlık: Reklam yönetimi ayrı bir hizmettir.
- Gövde: Paketler organik paylaşımı kapsar. Reklam bunun dışındadır ve tek başına
  da alınabilir. Reklam görselleri, videoları, metinleri, hedef kitle kurulumu,
  günlük optimizasyon ve haftada bir gün analiz raporu bize aittir.
- Fiyat: aylık 2.499 TL. Reklam bütçesi ayrıdır ve doğrudan platforma ödenir.
  Aylık reklam bütçesi 20.000 TL'yi geçen hesaplarda ücret bütçenin yüzde 12'si.

### 6.6 Web sitesi
- Başlık: Web sitesi tarafı anahtar teslimdir.
- Gövde: Ne istediğinizi anlatırsınız, biz tasarlar, yazar, kurar ve yayına
  alırız. Siz sadece onaylarsınız.
  Tek sayfa tanıtım sitesi: 4.900 TL'den başlar.
  Çok sayfalı kurumsal site: 9.900 TL'den başlar.
  E-ticaret ve özel geliştirme: kapsama göre teklif.
- Not: Fiyatlar varsayımdır, kullanıcı onayıyla tek satırda değişir.

### 6.7 İtiraz karşılama
- Başlık: Ödeme yaptıktan sonra ne olacağını önden yazıyoruz.
- Süreç:
  1. WhatsApp'tan yazarsınız. Aynı gün cevap alırsınız.
  2. Hesabınıza bakar, hangi paketin yeteceğini söyleriz. Gerekmiyorsa üst
     paketi önermeyiz.
  3. Başlangıçtan önce o ayın paylaşım takvimini görürsünüz. Ne gün, ne
     paylaşılacak, yazılı.
  4. İçerikler paylaşılmadan önce onayınıza düşer.
  5. Aynı kişi ile devam edersiniz. Her hafta ulaşabileceğiniz tek bir numara.
  6. İptal ederseniz ay sonunda biter. Taahhüt yok.
- SSS:
  - "Bu fiyata nasıl oluyor?" Videoları yapay zekayla üretiyoruz. Set ve ekip
    maliyeti yok. Kurgu ve seçim insan işi, o kısımda kısıntı yok.
  - "Hesabımın şifresini vermek zorunda mıyım?" Hayır. Meta Business üzerinden
    yetki vererek de çalışabiliriz.
  - "İçerikleri beğenmezsem?" Paylaşımdan önce onayınıza düşer.
  - "Reklam bütçesi pakete dahil mi?" Değil. Reklam ayrı hizmet, bütçe ayrı.
  - "Kaç ay taahhüt var?" Yok. Aylık ilerler.

### 6.8 Final çağrı
- Başlık: Bu ay hesabınız dolsun.
- CTA: daire rozet, PAKETI SEC, WhatsApp'a gider ve seçilen paketi mesaja yazar.

## 7. Yedek ve etkileşim planı

- İmza öğesi: occlusion. Dev Archivo tipografisi videonun arkasında durur ve
  BOGUM nesnesi onu keser. Nesne izole ve fon düz olduğu için maskeleme ucuz ve
  güvenilir.
- İkincil dil: teknik çizim mobilyası. Saç teli cetveller, merkezde artı
  nişangâh, patlamış parçalardan aşağı inen leader çizgileri, ucunda 90 derece
  döndürülmüş mono mikro etiketler, kareyi ortadan geçen tek yatay eksen.
- Kart yok, dolgu buton yok, yuvarlak köşe yok, kutu gölgesi yok, ikon yok.
- Ziyaretçinin yaptığı tek etkileşim: segment 04'te üç gövdeden birinin üstüne
  gelmek. Seçilen gövdenin boğum halkaları sırayla --champ rengine döner, o
  pakete ait mikro blok tam opaklığa çıkar, diğer ikisi yüzde 20'ye düşer.
  Daire rozet PAKETI SEC o gövdenin altında belirir.
- Daire rozet: 62 piksel, 1 piksel çerçeve, içinde iki satır 10 piksel mono
  büyük harf. Sitedeki tek çağrı biçimi budur.
- Azaltılmış hareket: video durur, poster kalır, dev tipografi occlusion
  olmadan tam görünür, tüm bölümler normal dikey akışta açılır.
- Mobil: scrub yok. Üstte poster, altında tam okunabilir statik akış. Üç varyant
  tek sütuna iner. Daire rozet alt bara sabitlenir, 44 piksel dokunma hedefi.

## 8. Storyboard

Ortak ayarlar: 16:9, 720p, altı saniye, ses yok.
Ortak dünya: BOGUM nesnesi, dikişsiz stüdyo fonu, ortam yok, zemin yok, dekor
yok. Kamera dört segmentte de neredeyse sabit. Hareketi nesne taşır. Işık dört
segmentte de aynı: sol üstten büyük yumuşak anahtar, sağdan yumuşak dolgu, iki
kenarda ince ayırıcı rim.

### Hareket yayı ve A4 denetimi
| Segment | A4 eylemi | Fon değeri | Bitişte boş alan | Ziyaretçinin aldığı |
|---|---|---|---|---|
| 01 | 1 DÖNÜŞ | açık gri, sabit | sol yüzde 40 | "Bir nesne var, hacimli" |
| 02 | 2 AYRIŞMA | açıktan orta griye | üst ve alt bant | "İçinde altı iş var" |
| 03 | 3 DAĞILMA, payoff 4 TOPLANMA | ortadan siyaha | sol ve sağ geniş siyah | "Bunu yapay zeka üretiyor" |
| 04 | 6 ÇOĞALMA | siyahtan açık griye | üst bant ve gövde araları | "Üç paket, seç" |

### Segment 01 — DÖNÜŞ
- Başlangıç görseli: start-frame.png
- Nesne eylemi: BOGUM kendi dikey ekseninde yavaşça döner, düz cepheden dörtte
  üç görünüme geçer. Boğum halkalarının üzerinden speküler vurgu kayar, üst
  kesitteki boşluk açılır, iç kovan görünür olur.
- Kamera: sabit.
- Fon: açık gri, değişmez.
- Bitiş: nesne merkezin hafif sağında, dörtte üç görünümde, sol yüzde kırk düz fon.
- Prompt: .10k-flow/prompts/segment-01.md

### Segment 02 — AYRIŞMA
- Başlangıç görseli: segment-01-end.png
- Nesne eylemi: BOGUM dikeyden yatay eksene devrilir, sonra altı bileşenine
  ayrılıp o eksen boyunca eşit aralıklarla açılır.
- Kamera: sabit.
- Fon: açık griden orta griye.
- Bitiş: altı parça kadranın ortasında yatay sırada, üstte ve altta geniş düz
  fon bandı.
- Prompt: .10k-flow/prompts/segment-02.md

### Segment 03 — DAĞILMA ve TOPLANMA
- Başlangıç görseli: segment-02-end.png
- Nesne eylemi: altı parça kenarlarından partiküllere çözünür, akıntı döner,
  sonra yoğunlaşıp tek bir BOGUM olarak yeniden kurulur.
- Kamera: sabit.
- Fon: orta griden siyaha.
- Bitiş: küçük, merkezde, siyah üzerinde yeniden kurulmuş gövde, seyrelmiş
  partikül izi. Sol ve sağda çok geniş düz siyah.
- Prompt: .10k-flow/prompts/segment-03.md

### Segment 04 — ÇOĞALMA
- Başlangıç görseli: segment-03-end.png
- Nesne eylemi: tek gövde üçe ayrılır, yatayda uzaklaşır ve farklı boylara uzar.
  Sol iki boğum, orta dört, sağ yedi. Altlarında yumuşak temas gölgesi.
- Kamera: sabit.
- Fon: siyahtan açık griye.
- Bitiş: üç gövde yatay sırada, alt üçte ikide, aralarında temiz boşluklar,
  üstte geniş düz fon. Bu kare assets/hero-ending.jpg olacak.
- Prompt: .10k-flow/prompts/segment-04.md

## 9. Video türevli hikaye UI zaman çizelgesi

Kaynak: assets/hero-scrub.mp4, 24.000 sn, 576 kare, 1280x720.
Yontem: her kare 320x180 griye indirildi, her piksel kendi satirinin medyanindan
sapmasina gore isaretlendi, 16x9 hucre izgarasina toplandi. Her aralik icin
o araliktaki TUM karelerin kesisimi alindi. Asagidaki haritalar o kesisimlerdir.
Nokta = aralik boyunca kesintisiz bos. Kare = en az bir karede ozne var.
Hucre genisligi yuzde 6.25, hucre yuksekligi yuzde 11.1.

Masaustu sunum: object-fit cover, 16:9 sahne. 1920x1080'de kirpma yok,
1440x900'de her yandan yuzde 5.6 kirpilir. Guvenli bolgeler bu kirpma payi
dusulerek secildi, hicbir blok kenardan yuzde 6'dan yakina konmadi.

Aralıklar sıralı ve karşılıklı dışlayıcıdır. Aralar bilinçli boş geçiştir.

### S1 GIRIS — 0.00 to 5.40
Kesişim haritası:

    #......##......#
    #......###.....#
    #......#####...#
    #....########..#
    ....#########...
    #....####.###..#
    .....####..##..#
    ......###.......
    .......##.......

Ozne bolgesi: merkez ve sag merkez, sutun 5 ile 13 arasi, satir 0 ile 6.
Yasak UI bolgesi: x yuzde 31 ile 88 arasi.
Guvenli UI bolgesi: sutun 1 ile 3, yani x yuzde 7 ile 25, tum satirlar.
Giren: dev tipografi BAMBU STUDIO tam genislik arkada, sol mikro blok, kicker.
Cikan: yok, ilk sahne.
Giris cikis: mikro blok asagidan 12 piksel kayarak ve opaklikla girer.
Etkilesim: yok.
Devir: 5.40'ta mikro blok cikar, 6.40'a kadar sadece dev tipografi kalir.

### ARA 5.40 to 6.40
Okunabilir hicbir oge yok. Nesne yataya devriliyor, kadran gezici.

### S2 HIZMETLER — 6.40 to 13.60
Kesişim haritası:

    #..............#
    #..............#
    #.....###.......
    .##############.
    ################
    ################
    ..........###...
    ...........#....
    ................

Ozne bolgesi: satir 3 ile 5 arasi tam genislik, patlamis yatay dizilim.
Yasak UI bolgesi: y yuzde 33 ile 67 arasi.
Guvenli UI bolgesi: ust bant satir 0 ile 1, y yuzde 0 ile 22, tam genislik.
Alt bant satir 7 ile 8, y yuzde 78 ile 100, tam genislik.
Giren: ust bantta bolum basligi kalibi, alt bantta bes dondurulmus mikro etiket,
parcalardan asagi inen sac teli leader cizgileri, kareyi ortadan gecen yatay eksen.
Cikan: S1 mikro blogu ve kicker.
Not: leader cizgileri sac teli oldugu icin ozne bolgesini gecebilir, okunabilir
metin gecemez.
Etkilesim: yok.

### ARA 13.60 to 14.00

### S3a URETIM BANTLARI — 14.00 to 16.40
Kesişim haritası:

    ................
    ................
    .....#.....####.
    ..##############
    ..##############
    .##############.
    .##############.
    ................
    ................

Ozne bolgesi: satir 3 ile 6, partikul akintisi neredeyse tam genislik.
Yasak UI bolgesi: y yuzde 33 ile 78.
Guvenli UI bolgesi: satir 0 ile 1, y yuzde 0 ile 22. Ve satir 7 ile 8,
y yuzde 78 ile 100. Ikisi de tam genislik.
Giren: ust bantta tek satir mikro etiket, alt bantta tek satir mikro etiket.
Cikan: S2'nin tum ogeleri, leader cizgileri dahil.
Etkilesim: yok.

### ARA 16.40 to 16.60

### S3b URETIM BASLIK — 16.60 to 18.20
Kesişim haritası:

    ................
    .......#........
    .......##..##...
    .......##.###...
    ......#######...
    ....#######.....
    ...#####........
    .......#........
    ................

Ozne bolgesi: merkez, sutun 3 ile 12, satir 1 ile 7.
Guvenli UI bolgesi: sol sutun 0 ile 2, x yuzde 0 ile 19, tum satirlar.
Sag sutun 13 ile 15, x yuzde 81 ile 100, tum satirlar. Kenar payi icin
sol blok x yuzde 4'ten baslar, sag blok x yuzde 96'da biter.
Giren: siyah uzerine iki tonlu dev baslik, sonuk YAPAY ZEKA ustte, parlak
URETIM altta, ozne onu keser. Sol sutunda iki mikro blok.
Cikan: S3a bantlari.
Etkilesim: yok.

### ARA 18.20 to 20.60
Uc kopya ayriliyor ve boyuyor. Kesisim haritasi satir 0 disinda tamamen dolu.
Bu aralikta okunabilir hicbir oge yok. Sadece dev tipografi kalir ve o zaten
occlusion ile calisir, guvenli bolge gerektirmez.

### S4b PAKETLER — 20.60 to 24.00
Kesişim haritası:

    #...............
    #.........##....
    #...##.##.##....
    ....########....
    ....########....
    ....########....
    #...########....
    #...########....
    ##...######...##

Ozne bolgesi: sutun 4 ile 11, satir 2 ile 8. Uc govde.
Olculen kisit: govdeler arasi bosluklar bir hucreden dar, yaklasik yuzde 6.
1440 piksellik sahnede 86 piksel eder. Bu bosluklar metin tasimaz.
Yasak UI bolgesi: x yuzde 25 ile 75 arasi, y yuzde 22 altinda kalan her sey.
Guvenli UI bolgesi: sag sutun 12 ile 15, x yuzde 75 ile 100, tum satirlar.
Sol sutun 1 ile 3, x yuzde 7 ile 25, tum satirlar. Ust satir 0, y 0 ile 11.
Giren: ust bantta bolum basligi, sol sutunda uc paket adi listesi, sag
sutunda o an secili paketin mikro blogu ve daire rozet PAKETI SEC.
Cikan: S3b'nin her seyi.
Etkilesim: bu sitedeki tek etkilesim. Ziyaretci sol listedeki bir paketin
veya ekrandaki bir govdenin uzerine gelir. Secili paketin mikro blogu sag
sutunda gorunur, digerleri DOM'dan degil ama gorunurlukten cikar. Ayni anda
sadece bir blok gorunur ve sadece o odaklanabilir.
Devir: 24.00'te sabitlenmis sahne biter, sayfa normal akisa gecer.

### Sabit sahne sonrasi normal akis
24.00 sonrasi icerik sabitlenmis videoya ait degildir ve zaman cizelgesine
girmez. Normal dikey akista, teknik cizim dilini koruyarak:
web sitesi fiyatlari, alti adimlik surec, bes soruluk SSS, iletisim ve alt
bilgi. Hero'nun son karesi assets/hero-ending.jpg bu bolumun ust kisminda
kullanilir.

### Nihai aralıklar, ölçümden sonra düzeltildi

Aralıklar iki ölçüme göre kaydırıldı.

Fon değeri ölçümü (kare kare kenar parlakligi): fon 14.50'de tam siyaha iner,
18.40'a kadar siyah kalir, 21.00'de tekrar acik griye doner.

En kötü kare kontrast ölçümü (WCAG, ust ve alt bant, 0.5 sn araliklarla):

| aralik | metin | en kotu kontrast | karar |
|---|---|---|---|
| S1 0.0-5.4 | koyu | 10.9 | gecti |
| S2 6.4-13.2 | koyu | 3.98 (11.5 sn) | AA alti, yerel scrim eklendi |
| S3a 14.6-16.3 | acik | 18.3 | gecti, metin rengi ters cevrildi |
| S3b 16.7-18.2 | acik | 18.8 | gecti |
| S4b 21.4-24.0 | koyu | 6.15 | gecti, baslangic 20.6'dan 21.4'e cekildi |

Nihai sirali ve dislayici aralik listesi:

    S1        0.00 - 5.40
    ara       5.40 - 6.40
    S2        6.40 - 13.20
      leaders 9.60 - 13.20   (S2 icinde, parcalar oturduktan sonra)
    ara      13.20 - 14.60
    S3a      14.60 - 16.30
    ara      16.30 - 16.70
    S3b      16.70 - 18.20
    ara      18.20 - 21.40
    S4b      21.40 - 24.00

Geçiş rampası 0.25 saniyedir ve her sahnenin kendi araligi icinde kalir. En kisa
ara 0.40 saniyedir. Rampa aradan kisa oldugu icin iki sahne matematiksel olarak
ayni anda gorunur olamaz.

### Ölçülen kısıtlar ve tasarıma etkisi

1. Segment 04'te govdeler arasi bosluklar bir izgara hucresinden dar, yaklasik
   yuzde 6, 1440 piksellik sahnede 86 piksel. Paket bloklarini oraya koyma plani
   olcumle curudu. Cozum: ayni anda tek paket blogu, olculen sag sutunda,
   ziyaretci ustune geldikce degisir.
2. Dev tipografi bandi ile okunabilir sutunlar dikeyde cakisti. Cozum: okunabilir
   bloklar tipografi bandinin disina, alt koselere alindi.
3. S2'nin koyu metni orta gri fonda AA esigini gecemedi. Cozum: ust ve alt banda
   yumusak yerel scrim.

### Tarayıcı doğrulaması

Gercek Chrome 151'de, 1440x900, 1920x1080, 1024x700 ve 390x844'te dogrulandi.

- Yatay tasma: uc genislikte de yok.
- Scroll pozisyonu video zamanina birebir esleniyor, surukleme yok.
- Dislayicilik: scroll araliginin tamaminda 481 ornekte hicbir anda birden
  fazla UI sahnesi veya birden fazla tipografi sahnesi gorunur degil.
- Gizli sahnelerde odaklanabilir oge sayisi sifir, inert uygulaniyor.
- Video kaynagi bozuldugunda sahne dead sinifini aliyor, poster kaliyor ve
  bes alt bolum erisilebilir kaliyor.
- Mobilde video gizleniyor, tum icerik statik akista gorunuyor, 44 pikselin
  altinda dokunma hedefi yok.
- Azaltilmis harekette sahne static konuma gecip tum icerigi aciyor.
- file:// ile dogrudan acildiginda video, seek, fontlar ve sahneler calisiyor,
  konsol temiz.

### Sert kapılar, doğrulandı
- Araliklar sirali ve kesismiyor: 0.00-5.40, 6.40-13.60, 14.00-16.40,
  16.60-18.20, 20.60-24.00. Aralar bos.
- Sonraki kompozisyon oncekinin cikisindan once gorunmuyor, cunku her sahne
  arasinda en az 0.20 saniyelik bos aralik var.
- Gizli sahneler visibility hidden, pointer-events none, tabindex -1 alir ve
  position absolute oldugu icin yer kaplamaz.
- Her masaustu konumu yukaridaki kesisim haritalarindan birine dayanir.
- Basli, gezinme, ilerleme, kopya, paketler, cagri ve alt bilgi bu cizelgeye
  dahildir, kalici katman degildir.
- Dev tipografi guvenli bolge kurali disindadir, cunku arkada durur ve
  occlusion ile calisir. Sadece okunabilir mikro metin bolge ister.

## 10. Kopya kapısı

Uzun tire yok. Yasak kelimeler: çözüm ortağı, dijital dönüşüm, 360 derece,
sinerji, vizyon, misyon, tutkuyla, uzman kadromuzla.
