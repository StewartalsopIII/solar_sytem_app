# Interactive Solar System

A 3D interactive model of our solar system built with Three.js, featuring realistic planet rotations, orbits, and textures.

## Features

- Realistic 3D models of all planets in our solar system
- Accurate relative orbital speeds and rotations
- Interactive camera controls (zoom, pan, rotate)
- Planet information panel
- Toggle between realistic scale and visualized scale
- Adjustable simulation speed
- Mobile-friendly design

## Technologies Used

- Three.js - 3D graphics library
- Vite - Fast build tool and development server
- JavaScript ES6+

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/solar-system.git
cd solar-system
```

2. Install dependencies:
```
npm install
```

3. Add planet textures to the `/public/textures/` directory:
   - Create a `textures` folder in the `public` directory
   - Add planet texture images (sun.jpg, mercury.jpg, venus.jpg, etc.)

4. Start the development server:
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment to Vercel

This project is set up for easy deployment to Vercel:

1. Install Vercel CLI:
```
npm i -g vercel
```

2. Run the following command from the project directory:
```
vercel
```

3. Follow the prompts to deploy your application.

Alternatively, you can connect your GitHub repository to Vercel for automatic deployments.

## Usage

- **Navigate**: Click and drag to rotate the view, scroll to zoom in/out
- **Planet Information**: Click on a planet name from the list to focus on it and view information
- **Controls**: 
  - Toggle orbit lines with the "Show Orbits" checkbox
  - Switch between artistic and realistic scale with the "Real Scale" checkbox
  - Adjust simulation speed with the slider

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Planetary textures from NASA
- Three.js community for examples and documentation