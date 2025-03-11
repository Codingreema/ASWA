const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const addTextButton = document.getElementById('addText');
const addImageButton = document.getElementById('addImage');
const addCircleButton = document.getElementById('addCircle');
const frameSelector = document.getElementById('frameSelector');

let objects = [];
let selectedFrame = 'none';

// Function to add text
function addText() {
  const text = prompt('Enter your text:', 'Sample Text');
  if (text) {
    objects.push({ type: 'text', text, x: 50, y: 50, color: '#000', fontSize: 20 });
    redrawCanvas();
  }
}

// Function to add an image
function addImage() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        objects.push({ type: 'image', img, x: 100, y: 100, width: 100, height: 100 });
        redrawCanvas();
      };
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

// Function to add a circle
function addCircle() {
  objects.push({ type: 'circle', x: 150, y: 150, radius: 50, color: '#ff0000' });
  redrawCanvas();
}

// Function to redraw the canvas
function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw frame
  if (selectedFrame === 'iphone') {
    drawiPhoneFrame();
  } else if (selectedFrame === 'web') {
    drawWebFrame();
  }

  // Draw objects
  objects.forEach(obj => {
    if (obj.type === 'text') {
      ctx.font = `${obj.fontSize}px Arial`;
      ctx.fillStyle = obj.color;
      ctx.fillText(obj.text, obj.x, obj.y);
    } else if (obj.type === 'image') {
      ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    } else if (obj.type === 'circle') {
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.fillStyle = obj.color;
      ctx.fill();
    }
  });
}

// Function to draw iPhone frame
function drawiPhoneFrame() {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 10;
  ctx.strokeRect(50, 50, 300, 600);
}

// Function to draw web browser frame
function drawWebFrame() {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 10;
  ctx.strokeRect(50, 50, 700, 500);
}

// Event listeners
addTextButton.addEventListener('click', addText);
addImageButton.addEventListener('click', addImage);
addCircleButton.addEventListener('click', addCircle);
frameSelector.addEventListener('change', (e) => {
  selectedFrame = e.target.value;
  redrawCanvas();
});

// Initial redraw
redrawCanvas();