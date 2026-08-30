# Zorunlu görsel dilbilgisi

Bu dosya bir öneri değil. Bu skill ile üretilen her video promptu ve her masaüstü
UI kararı bu dilbilgisine uymak zorundadır. Referans sınıfı: thewatch.60fps.fr
tipi izole ürün sahnesi. İşletme ne olursa olsun bu dilbilgisi korunur, değişen
tek şey kahraman nesnenin ne olduğudur.

## Bölüm A: Video plakası

### A1. İzole özne kuralı
Karede tek bir kahraman nesne bulunur. Ortam yoktur. Manzara, oda, orman, sokak,
masa, zemin dokusu, dekor, yan obje yoktur. Nesne dikişsiz sonsuz bir stüdyo
fonunda yüzer veya durur.

Bir prompt "koru", "sahne", "mekan", "arka planda şu var" diyorsa reddedilir ve
izole nesne olarak yeniden yazılır.

### A2. Fon kuralı
Fon düz bir degrade değerdir, doku değildir. İzin verilen tek fon işlemi:
yumuşak dikey veya radyal değer geçişi, ve segmentler arasında bu değerin
kayması.

Değer yolculuğu zorunludur. Tüm segmentler aynı fon değerinde geçemez. Tipik
şema: açık gri, orta gri, siyah, açık griye dönüş. Bu değişim sitenin bölüm
duygusunu taşıyan şeydir.

### A3. Kamera kuralı
Kamera hemen hemen sabittir. Dolly, crane, kaydırma, sallanma, el kamerası
yoktur. Hareketi taşıyan şey nesnedir.

İzin verilen kamera işlemleri: çok yavaş odak kayması, çok hafif ölçek değişimi,
ve nesne ile birlikte kalmak için gereken minimum kayma.

Bir prompt kameranın içeri girmesini, yükselmesini veya bir alanı taramasını
istiyorsa reddedilir. O hareketi nesneye devret.

### A4. Nesne eylem repertuarı
Her segment aşağıdaki listeden farklı bir eylem alır. Aynı eylem iki segmentte
kullanılamaz.

1. DÖNÜŞ: nesne kendi ekseninde döner, silüetten hacme geçer, iç yapısı görünür.
2. AYRIŞMA: nesne bir eksende parçalarına ayrılır, patlamış görünüm dizilimi olur.
3. DAĞILMA: nesne veya parçaları partikül bulutuna çözünür ve akar.
4. TOPLANMA: partiküller veya parçalar geri birleşir, nesne yeniden kurulur.
5. KATMAN AÇILIMI: nesne kesit alır, iç katmanları eşmerkezli olarak açılır.
6. ÇOĞALMA: tek nesne varyant dizilimine çoğalır, yatay sıra kurar.
7. MAKRO: nesnenin tek bir detayı kadrajı doldurur, yüzey karakteri okunur.

### A5. Işık kuralı
Stüdyo ışığı. Büyük yumuşak anahtar ışık, kontrollü speküler vurgular, temiz
kenar ayrımı. Doğal ışık, güneş, pencere, ateş, sokak lambası, hacimsel huzme,
sis yoktur.

İstisna: siyah fonlu segmentlerde partikül veya toz izin verilir, çünkü o
partikül nesnenin kendisinden gelir, ortamdan değil.

### A6. Temiz plaka kuralı
Videoda hiçbir yazı, rakam, logo, harf, arayüz öğesi, filigran, insan, el, yüz,
hayvan bulunamaz. Tüm tipografi siteye aittir. Her promptun negatif listesi bunu
tekrar eder.

### A7. Kenar kuralı
Nesnenin fondan ayrımı her karede temiz olmalıdır. Nesne fona karışırsa
üzerindeki dev tipografi okunamaz ve occlusion etkisi bozulur.

## Bölüm B: Masaüstü UI dilbilgisi

### B1. Occlusion kuralı, imza etki
Dev görüntü tipografisi videonun ARKASINDA durur ve özne onu keser. Bu, bu
sınıfın tek ayırt edici etkisidir ve her projede kullanılmak zorundadır.

Uygulama: video katmanı z ekseninde tipografinin üstündedir ve nesnenin siluetine
göre maskelenir, ya da tipografi video ile çarpışma karışımıyla harmanlanır.
Nesne izole ve fon düz olduğu için bu ucuz ve güvenilir çalışır.

Tipografi ölçüsü: 12vw ile 26vw arası. Ağırlık ince veya normal, kalın değil.
Harf aralığı geniş. Tümü büyük harf.

### B2. Kademeli opaklık yığını
Birden çok satırlık dev tipografi yığınında sadece güncel satır tam opaktır.
Önceki satırlar yüzde 12 ile 35 arası opaklığa düşer. Bu, derinlik ve ilerleme
hissini tek bir öğeyle taşır.

### B3. Mikro içerik bloğu
Standart metin birimi şudur ve başka bir metin birimi kullanılmaz:

    etiket satırı: 11 ile 12 piksel, sönük gri, hafif harf aralığı
    gövde: 13 ile 15 piksel, koyu, en fazla üç satır, dar ölçü

Bu bloklar öznenin boş bıraktığı yanda dikey bir sütuna yığılır. Sütundaki her
blok scroll ile kendi opaklığını alır: aktif blok tam, komşular sönük.

### B4. Teknik çizim mobilyası
Aşağıdakiler bu sınıfın zorunlu ikincil dilidir:

- saç teli cetveller: 1 piksel, yüzde 6 ile 10 opaklık, yatay ve dikey
- nişangâh işareti: küçük artı, bölüm başlığının üstünde merkezde
- leader çizgisi: parçadan aşağı inen ince dikey çizgi
- 90 derece döndürülmüş mikro etiket: leader çizginin ucunda, 10 ile 11 piksel
- merkez ekseni: karenin ortasından geçen tek yatay saç teli

### B5. Daire rozet ve etkileşim işareti
Etkileşim, dolgu butonla değil, çerçeveli bir daire rozetle bildirilir. Daire
54 ile 70 piksel, 1 piksel çerçeve, içinde iki satır büyük harf 9 ile 10 piksel.
Örnek: SELECT MODEL, HOLD TO EXPLORE, PAKETI SEC.

### B6. Yasak öğeler
Bu sınıfta aşağıdakiler kullanılamaz:

- dolgu renkli düğme
- yuvarlak köşeli kart
- kutu gölgesi
- kenarlıklı panel
- ikon seti, emoji
- degrade dolgulu metin
- tipik üç sütunlu özellik ızgarası
- yapışkan üst çubuk

Masaüstünde tek istisna: iletişim çağrısı bir kez, tek bir yerde, altı çizili
metin bağlantısı veya daire rozet olarak görünür.

### B7. Renk kuralı
Tek renkli. Siyah, beyaz ve gri tonlar. Renk sadece nesnenin kendi malzemesinden
gelir. Marka vurgu rengi varsa toplam yüzeyin en fazla yüzde ikisinde ve sadece
tek bir aktif durum işaretinde kullanılır.

### B8. Bölüm başlığı kalıbı
Bir bölüm başlığı gerektiğinde kalıp şudur: merkezde nişangâh, altında iki
satır halinde ince geniş aralıklı büyük harf başlık, altında merkezde dar ölçülü
iki ile üç satır gövde. Başlığın ikinci satırı birinciden hafif kaydırılır.

## Bölüm C: İşletme kapsamına bağlama

Bu dilbilgisi bir izole kahraman nesne gerektirir. İşletmenin fiziksel bir ürünü
yoksa, işletmenin işini fiziksel olarak temsil eden tek bir nesne icat edilir.

Kurallar:

- Nesne tek olmalıdır. Nesne grubu, koleksiyon, sahne olmaz.
- Nesne A4 repertuarındaki en az dört eylemi kaldırabilmelidir. Yani iç yapısı,
  katmanı veya parçası olmalıdır. Tamamen düz bir küre bu testi geçemez.
- Nesnenin parçaları işletmenin hizmetlerine birebir eşlenmelidir. Patlamış
  görünümdeki her parça bir hizmetin etiketini taşır.
- Nesnenin varyantları işletmenin paketlerine veya seviyelerine eşlenmelidir.
  Çoğalma segmenti fiyat tablosunun görsel karşılığıdır.
- Nesne marka adıyla veya işin doğasıyla anlamlı bağ kurmalıdır.

Nesne seçilmeden prompt yazılmaz. Nesne seçimi tasarım paketine "kahraman nesne
sözleşmesi" başlığıyla yazılır ve şunları içerir: nesne nedir, hangi malzeme,
kaç parçaya ayrılır, her parça hangi hizmet, kaç varyantı var, her varyant hangi
paket.

## Bölüm D: Başlangıç karesi zorunluluğu

Bu skill her zaman bir başlangıç karesiyle başlar. Ajanın görsel üretme aracı
olsun veya olmasın, segment 01 asla metinden videoya olarak üretilmez.

Sebep: dört segment boyunca nesnenin kimliği aynı kalmak zorundadır. Metinden
video her seferinde farklı bir nesne üretir ve zincir daha ilk devirde kopar.

Ajanın görsel üretme aracı yoksa:

1. Ajan tam bir görsel üretim promptu yazar ve yanıtın içinde kod bloğu olarak
   verir. Sadece dosyaya yazmak yeterli değildir.
2. Kullanıcıya hangi araçla üretebileceği söylenir. Google Flow'un kendi görsel
   üretimi, veya kullanıcının tercih ettiği herhangi bir görsel aracı.
3. Kullanıcı çıktıyı workspace koküne start-frame.png olarak bırakır.
4. Kullanıcı "gorsel koydum" der.
5. Ajan görseli açar ve inceler: izole mi, fon düz mü, kenar temiz mi, yazı var
   mı, negatif alan yeterli mi, nesne A4 eylemlerini kaldırabilir mi.
6. Geçerse durum awaiting_video olur ve segment 01 promptu verilir.
7. Geçmezse tek bir hedefli görsel retry promptu verilir, segment 01 promptu
   verilmez.

Bu adım için state.json durumu awaiting_start_frame olur ve bu durum
awaiting_video durumundan önce gelir.

## Bölüm E: Prompt öncesi denetim eklentisi

SKILL.md içindeki yüksek zanaat denetimine ek olarak, her video promptu
gönderilmeden önce şunlar doğrulanır:

- Prompt izole nesne ve dikişsiz fon diyor mu
- Prompt bir ortam veya sahne tarif ediyor mu, ediyorsa reddet
- Kamera sabit mi, hareketi nesne mi taşıyor
- Segmentin eylemi A4 listesinden mi ve önceki segmentlerden farklı mı
- Fon değeri önceki segmentten anlamlı şekilde farklı mı veya kasıtlı aynı mı
- Işık stüdyo ışığı mı
- Negatif liste A6 maddelerinin tamamını içeriyor mu
- Bitiş karesi dev tipografinin okunacağı düz fon alanı bırakıyor mu

Bu sekiz maddeden biri bile karşılanmıyorsa prompt gönderilmez.
