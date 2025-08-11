const rotateScaleAnimation = [
  { transform: 'rotate(0deg) scale(1)' },
  { transform: 'rotate(360deg) scale(1.5)' },
  { transform: 'rotate(0deg) scale(1)' }
];

const slideAnimation = [
  { transform: 'translateX(0px)' },
  { transform: 'translateX(50px)' },
  { transform: 'translateX(0px)' }
];

const fadeScaleAnimation = [
  { opacity: 1, transform: 'scale(1)' },
  { opacity: 0.5, transform: 'scale(1.3)' },
  { opacity: 1, transform: 'scale(1)' }
];

const animationConfig = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
};

const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const stat = document.getElementById('status');

function animateImage(image, animation, imageName) {
  stat.textContent = `Animating ${imageName}...`;
  const animationObject = image.animate(animation, animationConfig);
  return animationObject.finished;
}

function startSequentialAnimation() {
  stat.textContent = "Starting sequential animation...";
  
  animateImage(image1, rotateScaleAnimation, "Image 1")
    .then(() => {
      stat.textContent = "Image 1 completed, starting Image 2...";
      return animateImage(image2, slideAnimation, "Image 2");
    })
    .then(() => {
      stat.textContent = "Image 2 completed, starting Image 3...";
      return animateImage(image3, fadeScaleAnimation, "Image 3");
    })
    .then(() => {
      stat.textContent = "All animations completed!";
    })
    .catch((error) => {
      stat.textContent = "Animation error occurred";
      console.error(error);
    });
}
