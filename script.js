// const loader = document.getElementById('loader');
const logo = document.getElementById('logo');
const html = document.documentElement;
const body = document.body;

const dropFrom = () => -(window.innerHeight / 2 + 200);
const slideX = () => window.innerWidth * 1.41;

window.scrollTo(0, 0);
html.style.overflow = 'hidden';
body.style.overflow = 'hidden';

gsap.set(logo, { opacity: 1, y: dropFrom(), scaleX: 0.9, scaleY: 1.2, transformOrigin: '50% 100%' });

gsap.to('.header, .header .right', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
  overwrite: 'auto'
});
gsap.set('.page1 > *', { opacity: 0, y: 40 });

const sections = gsap.utils.toArray('.page2 > *, .page3 > *, .page4 > *');
gsap.set(sections, { opacity: 0, y: 50 });


function revealPage() {
  // Header
  gsap.to('.header', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Page 1
  gsap.to('.page1 > *', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.12,
    delay: 0.1,
    ease: 'power3.out'
  });

  // Baaki pages visible rakho.
  // Scroll karne par inka content animate hoga.
  gsap.set('.page2 > *, .page3 > *, .page4 > *', {
    opacity: 1,
    y: 0,
    clearProps: 'opacity,transform'
  });

  // Images fade-in initial state
  gsap.utils.toArray('.bw-img').forEach((image) => {
    gsap.fromTo(image,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: image,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  ScrollTrigger.refresh();
}


const tl = gsap.timeline({
  onComplete: () => {
    loader.style.visibility = 'hidden';
    html.style.overflow = '';
    body.style.overflow = '';
  }
});

tl.to(logo, { y: 0, scaleX: 1, scaleY: 1, duration: 0.7, ease: 'power2.in' }, 0.3)
  .to(logo, { scaleX: 1.4, scaleY: 0.55, duration: 0.12, ease: 'power1.out' })
  .to(logo, { y: -130, scaleX: 0.85, scaleY: 1.2, duration: 0.35, ease: 'power2.out' })
  .to(logo, { y: 0, scaleX: 1, scaleY: 1, duration: 0.3, ease: 'power2.in' })
  .to(logo, { scaleX: 1.2, scaleY: 0.75, duration: 0.1, ease: 'power1.out' })
  .to(logo, { y: -45, scaleX: 0.93, scaleY: 1.08, duration: 0.2, ease: 'power2.out' })
  .to(logo, { y: 0, scaleX: 1, scaleY: 1, duration: 0.18, ease: 'power2.in' })
  .to(logo, { scaleX: 1.08, scaleY: 0.92, duration: 0.08, ease: 'power1.out' })
  .to(logo, { scaleX: 1, scaleY: 1, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
  .to(loader, { x: slideX, duration: 1.3, ease: 'power4.inOut', force3D: true }, '+=0.4')
  .add(revealPage, '-=0.8');
