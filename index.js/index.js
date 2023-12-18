const inquirer = require('inquirer');
const fs = require('fs');
const { createSVG } = require('svg-builder');

// Function to generate SVG based on user input
function generateLogo({ color, shape, text }) {
    const fillColor = color.toLowerCase();
  
    const svg = new SvgBuilder({
      width: 100,
      height: 100,
      elements: [
        {
          type: shape,
          attributes: {
            cx: 50,
            cy: 50,
            r: shape === 'circle' ? 40 : undefined,
            width: shape === 'rectangle' ? 80 : undefined,
            height: shape === 'rectangle' ? 80 : undefined,
            fill: fillColor,
          },
        },
      ],
    });
  
    if (text) {
      svg.addText({
        x: 50,
        y: 50,
        text,
        fill: 'white',
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
      });
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
      choices: ['circle', 'rectangle'],
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