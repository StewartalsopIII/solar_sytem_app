export const planetData = {
  sun: {
    radius: 6.957,  // In 10^5 km
    diameter: 1392684,  // in km
    mass: 1989000000,  // in 10^24 kg
    rotationSpeed: 0.002,
    texture: '/textures/sun.jpg',
    description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun radiates energy mainly as light, ultraviolet, and infrared radiation, and is the most important source of energy for life on Earth.'
  },
  
  mercury: {
    radius: 0.244,  // In 10^4 km
    diameter: 4879,  // in km
    distance: 57.9,  // in 10^6 km
    orbitSpeed: 0.04,  // Relative speed
    rotationSpeed: 0.0029,
    yearLength: '88 Earth days',
    dayLength: '58.6 Earth days',
    texture: '/textures/mercury.jpg',
    description: 'Mercury is the smallest and innermost planet in the Solar System. It has a rocky body like Earth and orbits the Sun in 88 days. Mercury has no atmosphere to speak of and its surface is heavily cratered, resembling Earth\'s Moon.'
  },
  
  venus: {
    radius: 0.605,  // In 10^4 km
    diameter: 12104,  // in km
    distance: 108.2,  // in 10^6 km
    orbitSpeed: 0.015,
    rotationSpeed: 0.0007,  // Rotates backwards
    yearLength: '225 Earth days',
    dayLength: '243 Earth days',
    texture: '/textures/venus.jpg',
    description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor. It\'s one of the four inner, terrestrial planets, and it\'s often called Earth\'s twin because it\'s similar in size and density. Venus has a thick, toxic atmosphere filled with carbon dioxide and clouds of sulfuric acid.'
  },
  
  earth: {
    radius: 0.637,  // In 10^4 km
    diameter: 12742,  // in km
    distance: 149.6,  // in 10^6 km
    orbitSpeed: 0.01,
    rotationSpeed: 0.01,
    yearLength: '365.25 days',
    dayLength: '24 hours',
    texture: '/textures/earth.jpg',
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth\'s surface is covered with water. Earth\'s atmosphere consists of 78% nitrogen, 21% oxygen, and 1% other gases.',
    moons: [
      {
        name: 'moon',
        radius: 0.1737,  // In 10^4 km
        distance: 0.384,  // in 10^6 km
        orbitSpeed: 0.05,
        rotationSpeed: 0.05,  // Tidally locked
        texture: '/textures/moon.jpg',
        description: 'The Moon is Earth\'s only natural satellite. It is the fifth-largest satellite in the Solar System and the largest and most massive relative to its parent planet.'
      }
    ]
  },
  
  mars: {
    radius: 0.339,  // In 10^4 km
    diameter: 6779,  // in km
    distance: 227.9,  // in 10^6 km
    orbitSpeed: 0.008,
    rotationSpeed: 0.009,
    yearLength: '687 Earth days',
    dayLength: '24.6 hours',
    texture: '/textures/mars.jpg',
    description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Mars is a terrestrial planet with a thin atmosphere, having surface features reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth.',
    moons: [
      {
        name: 'phobos',
        radius: 0.0112,  // In 10^4 km
        distance: 0.009,  // in 10^6 km
        orbitSpeed: 0.3,
        rotationSpeed: 0.3,  // Tidally locked
        texture: '/textures/phobos.jpg',
        description: 'Phobos is the innermost and larger of the two natural satellites of Mars. It is heavily cratered and appears to share many surface characteristics with the class of carbonaceous C-type asteroids.'
      },
      {
        name: 'deimos',
        radius: 0.006,  // In 10^4 km
        distance: 0.023,  // in 10^6 km
        orbitSpeed: 0.1,
        rotationSpeed: 0.1,  // Tidally locked
        texture: '/textures/deimos.jpg',
        description: 'Deimos is the smaller and outermost of the two natural satellites of Mars. It has a smooth surface due to a blanket of regolith, unlike the larger moon Phobos, which has a more cratered surface.'
      }
    ]
  },
  
  jupiter: {
    radius: 6.991,  // In 10^4 km
    diameter: 139820,  // in km
    distance: 778.5,  // in 10^6 km
    orbitSpeed: 0.0043,
    rotationSpeed: 0.045,  // Very fast rotation
    yearLength: '11.86 Earth years',
    dayLength: '9.93 hours',
    texture: '/textures/jupiter.jpg',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky.'
  },
  
  saturn: {
    radius: 5.823,  // In 10^4 km
    diameter: 116460,  // in km
    distance: 1432.0,  // in 10^6 km
    orbitSpeed: 0.0032,
    rotationSpeed: 0.036,
    yearLength: '29.45 Earth years',
    dayLength: '10.7 hours',
    texture: '/textures/saturn.jpg',
    description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth. It has only one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive. Saturn is known for its prominent ring system.'
  },
  
  uranus: {
    radius: 2.536,  // In 10^4 km
    diameter: 50724,  // in km
    distance: 2867.0,  // in 10^6 km
    orbitSpeed: 0.0022,
    rotationSpeed: 0.016,  // Rotates on its side
    yearLength: '84 Earth years',
    dayLength: '17.2 hours',
    texture: '/textures/uranus.jpg',
    description: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn. Uranus\'s atmosphere is similar to Jupiter\'s and Saturn\'s in its primary composition of hydrogen and helium, but it contains more "ices" such as water, ammonia, and methane.'
  },
  
  neptune: {
    radius: 2.462,  // In 10^4 km
    diameter: 49244,  // in km
    distance: 4515.0,  // in 10^6 km
    orbitSpeed: 0.0018,
    rotationSpeed: 0.017,
    yearLength: '164.8 Earth years',
    dayLength: '16.1 hours',
    texture: '/textures/neptune.jpg',
    description: 'Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. Neptune is 17 times the mass of Earth and is slightly more massive than its near-twin Uranus. Neptune is denser and physically smaller than Uranus because its greater mass causes more gravitational compression of its atmosphere.'
  }
};