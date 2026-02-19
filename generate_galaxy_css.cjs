
const fs = require('fs');

function random(max) {
    return Math.floor(Math.random() * max);
}

function createStars(n) {
    let value = `${random(2000)}px ${random(2000)}px #FFF`;
    for (let i = 2; i <= n; i++) {
        value += `, ${random(2000)}px ${random(2000)}px #FFF`;
    }
    return value;
}

const stars1 = createStars(700);
const stars2 = createStars(200);
const stars3 = createStars(100);

const css = `
/* Galaxy Background Effects */
.galaxy-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%);
  overflow: hidden;
  z-index: -1;
}

.stars-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}

.stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${stars1};
  animation: animStar 50s linear infinite;
}

.stars:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${stars1};
}

.stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${stars2};
  animation: animStar 100s linear infinite;
}

.stars2:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${stars2};
}

.stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: ${stars3};
  animation: animStar 150s linear infinite;
}

.stars3:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: ${stars3};
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
`;

console.log(css);
