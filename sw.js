const staticCacheName = "site-static-v6";
const dynamicCacheName = "site-dynamic-v5";
const assets = [
	"/",
	"/dist/index.html",
	"/dist/app.js",
	"/dist/bundle.js",
	"/dist/imgs/covid19.png",
	"/dist/imgs/corona19_2.png",
	"/dist/imgs/deteksi-dini.png",
	"/dist/imgs/indoFlag-min.png",
	"/dist/imgs/handbook-medicine.png",
	"/dist/imgs/cucitangan.png",
	"/dist/imgs/masker.png",
	"/dist/imgs/jagaJarak.png",
	"dist/imgs/fever.png",
	"dist/imgs/tired.png",
	"dist/imgs/cough.png",
	"dist/imgs/sir.png",
	"dist/imgs/doctor.png",
	"dist/imgs/programmer.png",
	"dist/imgs/hospital.png",
	"/pages/kontak.html",
	"/pages/error.html",
	"https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Ubuntu:wght@400;500;700&display=swap",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"/src/scripts/materialize.min.js",
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
	//console.log('service worker activated');
	evt.waitUntil(
		caches.keys().then((keys) => {
			keys.filter((key) => key !== staticCacheName && key !== dynamicCacheName).map((key) => caches.delete(key));
		})
	);
});

self.addEventListener("fetch", (evt) => {
	// console.log("Fetch dari Service worker", evt);
	evt.respondWith(
		caches.match(evt.request).then((cacheRes) => {
			return (
				cacheRes ||
				fetch(evt.request)
					.then((fetchrResp) => {
						return caches.open(dynamicCacheName).then((cache) => {
							cache.put(evt.request.url, fetchrResp.clone());
							return fetchrResp;
						});
					})
					.catch(() => {
						return caches.match("/pages/error.html");
					})
			);
		})
	);
});
