/* var path = document.querySelector('.path');
var length = path.getTotalLength(); */
import { buildJobs, avatarThatFollowPath, getContinue } from './functions.js';

const jobsConfig = [
  {
    company: {
      name: 'AUGE Digital',
      color: 'green'
    },
    initDate: '01/2016',
    endDate: '11/2017',
    profile: 'Junior App Developer',
    skills: [
      {
        code: 'angular-js',
        logo: 'assets/angular.svg',
        expertise: 7 // 1 - 10
      },
      {
        code: 'angular-js',
        logo: 'assets/angular.svg',
        expertise: 2 // 1 - 10
      },
      {
        code: 'angular-js',
        logo: 'assets/angular.svg',
        expertise: 5 // 1 - 10
      }
    ]
  },
  {
    company: {
      name: 'Universitas XXI',
      color: 'blue'
    },
    profile: 'Mid Front-End Developer',
    initDate: '01/2016',
    endDate: '11/2017',
    skills: [
      {
        code: 'angular-js',
        logo: 'assets/angular.svg',
        expertise: 7 // 1 - 10
      }
    ]
  },
  {
    company: {
      name: 'Profile Software Services',
      color: 'red'
    },
    profile: 'Senior Front-End Developer',
    initDate: '01/2016',
    endDate: '',
    skills: []
  }
];

/* const scrollStep = 1;
let currentScroll = 0;
let maxScroll = 0; */

const initHeight = 0;
const jobHeight = 65;
const jobDuration = 5;
const currentJobPath = `
  v 30
  h 20 
  q 0,-20 20,-20 
  h 160 
  q 20,0 20,20 
  v 5
`
const jobPath = `
  ${currentJobPath} 
  q 0,20 -20,20 
  h -160 
  q -20,0 -20,-20 
  h -20 v30
`;

/* window.scrollTo(0, 0); */

const id = document.getElementById('svg');

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('viewBox', `0 0 300 ${(jobHeight * jobsConfig.length) + 70}`);

const jobs = buildJobs(jobsConfig, jobDuration, currentJobPath, jobPath, jobHeight, initHeight);
const avatar = avatarThatFollowPath(jobsConfig, jobDuration, currentJobPath, jobPath, initHeight);

jobs.forEach(job => {
  svg.appendChild(job);
});
svg.appendChild(avatar);
svg.appendChild(getContinue(jobsConfig, jobDuration));

const start = document.getElementById('startCV');
const intro = document.getElementById('intro');

start.addEventListener('click', function startFn(e) {
  e.target.removeEventListener('click', startFn);
  // start.classList.add('rotate');
  intro.classList.add('hide-intro');
  id.appendChild(svg);
});

/* setTimeout(() => {
  maxScroll = document.body.scrollHeight;
  // window.requestAnimationFrame(step);
}, jobDuration * 1000) */

/* function step() {
  currentScroll += scrollStep;
  window.scrollTo(0, currentScroll);
  if (currentScroll < maxScroll) {
    window.requestAnimationFrame(step);
  }
} */
