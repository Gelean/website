let lightMode = localStorage.getItem('lightMode'); 
const lightModeToggle = document.querySelector('#light-mode-toggle');

const enableLightMode = () => {
  document.body.classList.add('light-mode');
  document.getElementById('light-mode-toggle').src = 'images/moon.png';
  localStorage.setItem('lightMode', 'enabled');
}

const disableLightMode = () => {
  document.body.classList.remove('light-mode');
  document.getElementById('light-mode-toggle').src = 'images/sun.png';
  localStorage.setItem('lightMode', null);
}

if (lightMode === 'enabled') {
  enableLightMode();
} else {
  disableLightMode()
}

lightModeToggle.addEventListener('click', () => {
  lightMode = localStorage.getItem('lightMode'); 
  
  if (lightMode !== 'enabled') {
    enableLightMode();
  } else {  
    disableLightMode(); 
  }
});