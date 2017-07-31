// If all element loaded
window.addEventListener('load', function() {
  var canvasWidth = window.innerWidth - 300;
  var canvasHeight = window.innerHeight;
  var canvasEle = document.createElement('canvas');
  var containerEle = document.querySelector('section.main');

  // Set width and height for canvas
  canvasEle.style.width = canvasWidth + 'px';
  canvasEle.style.height = canvasHeight + 'px';
  
  // Append canvas to container
  containerEle.appendChild(canvasEle);
});