const staticCacheName = "site-static";
const assets = [
	"/",
	"/dist/index.html",
	"/dist/app.js",
	"/dist/bundle.js",
	"/src/images/corona19_2.png",
	"/dist/imgs/indoFlag-min.png",
	"/dist/imgs/handbook-medicine.png",
	"/dist/imgs/cucitangan.png",
	"/dist/imgs/masker.png",
	"/dist/imgs/jagaJarak.png",
	"/pages/kontak.html",
	"/pages/gejala.html",
	"https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Ubuntu:wght@400;500;700&display=swap",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"https://code.jquery.com/jquery-2.1.1.min.js",
];

self.addEventListener("install", (evt) => {
	// console.log("Service worker berhasil di install");
	evt.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			console.log("caching assets");
			cache.addAll(assets);
		})
	);
});

self.addEventListener("activate", (evt) => {
	console.log("Service worker berhasil di aktifkan");
});

self.addEventListener("fetch", (evt) => {
	// console.log("Fetch dari Service worker", evt);
	evt.respondWith(
		caches.match(evt.request).then((cacheRes) => {
			return cacheRes || fetch(evt.request);
		})
	);
});
