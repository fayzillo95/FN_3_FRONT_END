✅ transform xossasining asosiy funksiyalari (values):
📦 2D Transformatsiyalar:
Funktsiya	Ta’rifi	Misol
translate(x, y)	Elementni x va y o‘qi bo‘ylab siljitadi	transform: translate(50px, 20px);
translateX(x)	Faqat x yo‘nalishda siljitadi	transform: translateX(100px);
translateY(y)	Faqat y yo‘nalishda siljitadi	transform: translateY(-50px);
scale(x, y)	Elementni x va y bo‘yicha kattalashtiradi/yig‘adi	transform: scale(1.5, 2);
scaleX(x)	Faqat gorizontal kattalashtirish	transform: scaleX(2);
scaleY(y)	Faqat vertikal kattalashtirish	transform: scaleY(0.5);
rotate(angle)	Elementni aylantiradi (deg yoki radianlarda)	transform: rotate(45deg);
skew(x-angle, y-angle)	Elementni qiyshaytiradi	transform: skew(30deg, 10deg);
skewX(angle)	X o‘qi bo‘yicha qiyshaytirish	transform: skewX(20deg);
skewY(angle)	Y o‘qi bo‘yicha qiyshaytirish	transform: skewY(-10deg);
matrix(a, b, c, d, e, f)	2D transformatsiyalarni matritsa ko‘rinishida qo‘llaydi	transform: matrix(1, 0, 0, 1, 100, 50);

🌐 3D Transformatsiyalar:
Funktsiya	Ta’rifi	Misol
translateZ(z)	Z o‘qi bo‘yicha chuqurlikka siljitadi	transform: translateZ(200px);
scaleZ(z)	Z o‘qi bo‘yicha o‘lchamni o‘zgartiradi	transform: scaleZ(2);
rotateX(angle)	X o‘qi atrofida aylantiradi	transform: rotateX(45deg);
rotateY(angle)	Y o‘qi atrofida aylantiradi	transform: rotateY(60deg);
rotateZ(angle)	Z o‘qi atrofida aylantiradi (asosiy rotate bilan bir xil)	transform: rotateZ(90deg);
perspective(n)	3D effekti uchun chuqurlik (masofa) beradi	transform: perspective(500px);

🔁 Bir nechta transform funksiyalarni birga yozish:
css
Copy
Edit
transform: translate(50px, 100px) rotate(30deg) scale(1.2);
🧠 Qo‘shimcha eslatmalar:
transform xossasi aniq joylashuvga (position) ta’sir qilmaydi, lekin vizual joylashuv o‘zgaradi.

transform bilan birga transition yoki animation ishlatilganda ajoyib effektlar hosil qilinadi.

transform faqat 2D va 3D transformatsiyalar uchun ishlatiladi. Har doim display: inline-block yoki block turidagi elementlarda qo‘llang.

