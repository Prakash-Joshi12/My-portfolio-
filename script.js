// Scroll reveals and navigation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

// Subtle pointer glow
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// Copy-to-clipboard interaction
const toast = document.querySelector('.toast');
document.querySelector('.copy-email').addEventListener('click', async (e) => {
  const email = e.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = 'Email address copied';
  } catch {
    toast.textContent = `Update the email address in index.html: ${email}`;
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
});

// Interactive Three.js sculpture. Graceful fallback if CDN/WebGL is unavailable.
(function initThreeScene() {
  const host = document.getElementById('three-scene');
  if (!host || !window.THREE) {
    if (host) host.innerHTML = '<div class="fallback-shape">✳</div>';
    return;
  }
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.z = 7.5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.IcosahedronGeometry(1.55, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x718cff, metalness: 0.72, roughness: 0.22,
      wireframe: false, flatShading: true
    });
    const core = new THREE.Mesh(geometry, material);
    group.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.72, 1),
      new THREE.MeshBasicMaterial({ color: 0x9dbeff, wireframe: true, transparent: true, opacity: 0.36 })
    );
    group.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x73e4d0, transparent: true, opacity: 0.72 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.12, 0.012, 8, 150), ringMaterial);
    ring.rotation.x = 1.1; ring.rotation.y = 0.25; group.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.32, 0.008, 8, 150),
      new THREE.MeshBasicMaterial({ color: 0x9d8aff, transparent: true, opacity: 0.55 }));
    ring2.rotation.x = 0.4; ring2.rotation.y = 1.15; group.add(ring2);

    const particles = new THREE.Group();
    const particleGeo = new THREE.SphereGeometry(0.025, 8, 8);
    for (let i = 0; i < 65; i++) {
      const p = new THREE.Mesh(particleGeo, new THREE.MeshBasicMaterial({ color: i % 3 ? 0x8baaff : 0x73e4d0 }));
      const radius = 2.4 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p.position.set(radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi));
      particles.add(p);
    }
    group.add(particles);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const light = new THREE.PointLight(0x9db7ff, 35, 20);
    light.position.set(3, 3, 5); scene.add(light);
    const light2 = new THREE.PointLight(0x73e4d0, 20, 20);
    light2.position.set(-4, -2, 2); scene.add(light2);

    let pointerX = 0, pointerY = 0;
    host.addEventListener('pointermove', e => {
      const rect = host.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.35;
    });
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y += 0.0028;
      group.rotation.x += (pointerY - group.rotation.x) * 0.018;
      group.rotation.z += (pointerX - group.rotation.z) * 0.018;
      core.rotation.y = Math.sin(t * 0.35) * 0.12;
      wire.rotation.y = -t * 0.12;
      ring.rotation.z = t * 0.14;
      ring2.rotation.x = 0.4 + Math.sin(t * 0.3) * 0.15;
      particles.rotation.y = -t * 0.035;
      renderer.render(scene, camera);
    }
    animate();
    const resizeObserver = new ResizeObserver(() => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    });
    resizeObserver.observe(host);
  } catch (error) {
    host.innerHTML = '<div class="fallback-shape">✳</div>';
    console.warn('3D scene could not initialize:', error);
  }
})();
