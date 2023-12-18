const inquirer = require('inquirer');
const fs = require('fs');
const { Svg, Circle, Rect, Text } = require('svg-builder');

// Function to generate SVG based on user input
function generateLogo({ color, shape, text }) {
  const svg = new Svg();
  const fillColor = color.toLowerCase();

  switch (shape) {
    case 'circle':
      svg.add(new Circle({ cx: 50, cy: 50, r: 40, fill: fillColor }));
      break;
    case 'rectangle':
      svg.add(new Rect({ x: 10, y: 10, width: 80, height: 80, fill: fillColor }));
      break;
    default:
      console.error('Invalid shape selected.');
      process.exit(1);
  }

  if (text) {
    svg.add(new Text({ x: 50, y: 50, text, fill: 'white', 'text-anchor': 'middle', 'alignment-baseline': 'middle' }));
  }

  return svg.toString();
}

// Function to save SVG to a file
function saveLogoToFile(svgString, filename) {
  fs.writeFileSync(filename, svgString);
  console.log(`Logo saved to ${filename}`);
}

// Prompt user for input
inquirer
  .prompt([
    {
      type: 'list',
      name: 'color',
      message: 'Select a color for the logo:',
      choices: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape for the logo:',
      choices: ['Circle', 'Rectangle'],
    },
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo (optional):',
    },
    {
      type: 'input',
      name: 'filename',
      message: 'Enter a filename to save the SVG:',
      default: 'logo.svg',
    },
  ])
  .then((answers) => {
    const svgString = generateLogo(answers);
    saveLogoToFile(svgString, answers.filename);
  })
  .catch((error) => {
    console.error('Error:', error);
  });