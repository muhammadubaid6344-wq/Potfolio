// 1) Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => {            // link dabane par menu band
    if (e.target.tagName === 'A') nav.classList.remove('open');
});

// 2) Scroll reveal: jab element screen mein aaye to "show" class lag jaye
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);   // ek hi baar animate ho
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3) Footer ka saal automatic
document.getElementById('year').textContent = new Date().getFullYear();

// 4) Typing effect: "Front-End Developer" ek ek harf karke likha jaye
const wordA = document.getElementById('typeA');
const wordB = document.getElementById('typeB');
const cursor = document.querySelector('.cursor');
const typingEl = document.querySelector('.typing');
const parts = [[wordA, wordA.dataset.text], [wordB, wordB.dataset.text]];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) typingEl.classList.add('done');

if (!reduceMotion) {
    parts.forEach(([el]) => el.textContent = '');   // pehle khali kar do
    let p = 0;   // abhi kaunsa word chal raha hai
    let i = 0;   // us word ka kaunsa harf

    function typeStep() {
        if (p >= parts.length) {                       // dono words ho gaye
            typingEl.classList.add('done');          // ab cursor blink karna shuru
            return;
        }
        const [el, text] = parts[p];
        el.textContent = text.slice(0, ++i);         // ek harf aur dikhao
        el.after(cursor);                            // cursor harf ke sath sath chale
        if (i >= text.length) { p++; i = 0; }        // word khatam to agle par jao
        setTimeout(typeStep, 80);                    // 80ms baad agla harf
    }
    setTimeout(typeStep, 900);                       // hero ke fade-in ke baad shuru
}