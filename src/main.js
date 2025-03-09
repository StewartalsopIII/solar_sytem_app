import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { planetData } from './planetData.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x555555, 1); // Brighter ambient light
scene.add(ambientLight);

// Strong point light at sun's position
const sunLight = new THREE.PointLight(0xffffff, 3, 0, 0.5);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Add a directional light to better illuminate planets
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Background stars
const createStars = () => {
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    sizeAttenuation: false
  });
  
  const starsVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    starsVertices.push(x, y, z);
  }
  
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
};

createStars();

// Camera and controls setup
camera.position.set(0, 60, 120);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 5;
controls.maxDistance = 200;

// Solar system objects
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);

// Orbit paths
const orbits = new THREE.Object3D();
solarSystem.add(orbits);

// Use let instead of const so we can reset these when changing scale
let celestialBodies = {};
let orbitalPaths = {};

// Create orbit line
const createOrbitLine = (radius) => {
  const orbitGeometry = new THREE.BufferGeometry();
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.5 });
  
  const vertices = [];
  const segments = 128;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    vertices.push(radius * Math.cos(theta), 0, radius * Math.sin(theta));
  }
  
  orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  return new THREE.Line(orbitGeometry, orbitMaterial);
};

// We're not using textures anymore, so this is just a placeholder
// If we want to add textures later, we can implement proper texture loading
const loadTexture = (path) => {
  // Just return null since we're not using textures
  return null;
};

// Scale values for easy adjustment
let realScale = false;
let distanceScale = 4; // Smaller number = more compact system
let sizeScale = 1;     // For planet sizes
let simulationSpeed = 0.5;

// Create solar system
const createSolarSystem = () => {
  // Create the Sun with a VERY simple material
  const sunGeometry = new THREE.SphereGeometry(planetData.sun.radius * (realScale ? 1 : sizeScale), 32, 32);
  
  // Simple bright yellow material for the sun - no textures, no complications
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00  // Yellow-orange
  });
  
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  celestialBodies.sun = sun;
  solarSystem.add(sun);
  
  // Create planets and their orbits
  Object.entries(planetData).forEach(([name, planet]) => {
    if (name === 'sun') return;
    
    // Create orbit
    const scaledDistance = planet.distance / distanceScale;
    const orbitLine = createOrbitLine(scaledDistance);
    orbits.add(orbitLine);
    orbitalPaths[name] = orbitLine;
    
    // Create planet
    const planetSize = planet.radius * (realScale ? 1 : sizeScale);
    const planetGeometry = new THREE.SphereGeometry(planetSize, 32, 32);
    
    // Define planet-specific colors based on popular conceptions
    const planetColors = {
      mercury: 0x8c8c8c, // Gray
      venus: 0xffd700,   // Golden yellow (more saturated)
      earth: 0x0077ff,   // Bright blue
      mars: 0xff4500,    // Red-orange (more vibrant)
      jupiter: 0xffa500, // Orange for the bands
      saturn: 0xffd700,  // Gold
      uranus: 0x00ced1,  // Turquoise
      neptune: 0x0000ff  // Pure blue
    };
    
    const planetColor = planetColors[name] || 0xffffff;
    console.log(`Creating planet: ${name}, color: ${planetColor.toString(16)}`);
    
    // Use the absolute simplest material possible - just a basic material with color
    const planetMaterial = new THREE.MeshBasicMaterial({
      color: planetColor
    });
    
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    
    // Create planet object and orbit
    const planetOrbit = new THREE.Object3D();
    solarSystem.add(planetOrbit);
    planetOrbit.add(planetMesh);
    
    // Position the planet on its orbit
    const angle = Math.random() * Math.PI * 2;
    planetMesh.position.x = scaledDistance;
    
    // Store references
    celestialBodies[name] = {
      mesh: planetMesh,
      orbit: planetOrbit,
      data: planet,
      angle: angle,
      speed: planet.orbitSpeed
    };
    
    // If the planet has moons, create them
    if (planet.moons && planet.moons.length > 0) {
      planet.moons.forEach((moon, index) => {
        const moonOrbit = new THREE.Object3D();
        planetMesh.add(moonOrbit);
        
        const moonSize = moon.radius * (realScale ? 1 : sizeScale);
        const moonGeometry = new THREE.SphereGeometry(moonSize, 16, 16);
        
        // Add moon-specific colors
        const moonColors = {
          moon: 0xf0f0f0,     // Bright white-gray for Earth's moon
          phobos: 0xaa6633,   // Stronger brown for Phobos
          deimos: 0xbb8844    // Stronger tan for Deimos
        };
        
        const moonColor = moonColors[moon.name] || 0xdddddd;
        
        // Just use a simple color with no textures or advanced properties
        const moonMaterial = new THREE.MeshBasicMaterial({
          color: moonColor
        });
        
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonOrbit.add(moonMesh);
        
        // Position the moon
        moonMesh.position.x = moon.distance * (realScale ? 1 : 0.3);
        
        // Store moon reference
        celestialBodies[moon.name] = {
          mesh: moonMesh,
          orbit: moonOrbit,
          data: moon,
          angle: Math.random() * Math.PI * 2,
          speed: moon.orbitSpeed
        };
      });
    }
  });
  
  updatePlanetList();
};

// Update planet positions based on time
const updatePlanetPositions = (deltaTime) => {
  Object.entries(celestialBodies).forEach(([name, body]) => {
    if (name === 'sun') {
      body.rotation.y += 0.001 * simulationSpeed;
      return;
    }
    
    // Update planet position
    if (body.orbit && body.speed) {
      body.angle += body.speed * simulationSpeed * deltaTime;
      body.orbit.rotation.y = body.angle;
      
      // Rotate the planet itself
      if (body.mesh && body.data && body.data.rotationSpeed) {
        body.mesh.rotation.y += body.data.rotationSpeed * simulationSpeed * deltaTime;
      }
    }
  });
};

// UI elements
const infoPanel = document.getElementById('info-panel');
const toggleOrbitsCheckbox = document.getElementById('toggle-orbits');
const realScaleCheckbox = document.getElementById('real-scale');
const speedControl = document.getElementById('speed-control');
const planetListDiv = document.getElementById('planet-list');

// Update UI
const updatePlanetList = () => {
  planetListDiv.innerHTML = '';
  
  Object.entries(planetData).forEach(([name, planet]) => {
    if (planet.moons) return; // Skip moons to keep list cleaner
    
    const planetDiv = document.createElement('div');
    planetDiv.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    planetDiv.addEventListener('click', () => {
      focusOnPlanet(name);
    });
    planetListDiv.appendChild(planetDiv);
  });
};

// Zoom to a specific planet
const focusOnPlanet = (name) => {
  const body = celestialBodies[name];
  if (!body) return;
  
  // Display planet info
  infoPanel.innerHTML = `
    <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
    <p>${body.data.description}</p>
    <p>Diameter: ${body.data.diameter.toLocaleString()} km</p>
    <p>Distance from Sun: ${body.data.distance.toLocaleString()} million km</p>
    <p>Day Length: ${body.data.dayLength}</p>
    <p>Year Length: ${body.data.yearLength}</p>
  `;
  infoPanel.style.display = 'block';
  
  // Don't move camera for sun (keep global view)
  if (name === 'sun') {
    camera.position.set(0, 60, 120);
    controls.target.copy(new THREE.Vector3(0, 0, 0));
    return;
  }
  
  // Get world position of the planet
  const planetWorldPos = new THREE.Vector3();
  body.mesh.getWorldPosition(planetWorldPos);
  
  // Set camera to look at planet
  const distance = body.data.radius * 10;
  const offset = new THREE.Vector3(distance, distance, distance);
  camera.position.copy(planetWorldPos).add(offset);
  controls.target.copy(planetWorldPos);
};

// Event listeners
toggleOrbitsCheckbox.addEventListener('change', () => {
  orbits.visible = toggleOrbitsCheckbox.checked;
});

realScaleCheckbox.addEventListener('change', () => {
  realScale = realScaleCheckbox.checked;
  
  // Recreate the solar system with new scale
  while(solarSystem.children.length > 0) { 
    const object = solarSystem.children[0];
    solarSystem.remove(object);
  }
  
  distanceScale = realScale ? 1 : 4;
  sizeScale = realScale ? 1 : 4;
  
  // Recreate the celestial bodies
  celestialBodies = {};
  orbitalPaths = {};
  
  // Add back orbits container
  solarSystem.add(orbits);
  
  createSolarSystem();
});

speedControl.addEventListener('input', () => {
  simulationSpeed = speedControl.value / 5;
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Click away from planet to clear info
renderer.domElement.addEventListener('click', (event) => {
  // Check if click was on UI elements
  if (
    event.target.id === 'info-panel' || 
    event.target.id === 'controls' || 
    event.target.id === 'planet-list' ||
    event.target.tagName === 'INPUT' ||
    event.target.tagName === 'LABEL'
  ) {
    return;
  }
  
  infoPanel.style.display = 'none';
});

// Animation loop
const clock = new THREE.Clock();
const animate = () => {
  requestAnimationFrame(animate);
  
  const deltaTime = clock.getDelta();
  
  // Update planet positions
  updatePlanetPositions(deltaTime);
  
  // Update controls
  controls.update();
  
  // Render
  renderer.render(scene, camera);
};

// Initialize
createSolarSystem();
animate();