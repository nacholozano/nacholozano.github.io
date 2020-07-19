/* var path = document.querySelector('.path');
var length = path.getTotalLength(); */
import { buildJobs, avatarThatFollowPath, getContinue } from './functions.js';

const logoMap = {
  angular: { logo: 'assets/angular.png', tooltip: 'Angular' },
  angularjs: { logo: 'assets/angularjs.svg', tooltip: 'Angular JS' },
  typescript: { logo: 'assets/typescript.png', tooltip: 'Typescript' },
  rxjs: { logo: 'assets/rxjs.png', tooltip: 'RxJS' },
  html: { logo: 'assets/html5.png', tooltip: 'HTML 5' },
  css: { logo: 'assets/css3.png', tooltip: 'CSS 3' },
  sass: { logo: 'assets/sass.png', tooltip: 'SASS' },
  js: { logo: 'assets/js.svg', tooltip: 'JavaScript' },
  redux: { logo: 'assets/redux.png', tooltip: 'Redux' },
  react: { logo: 'assets/react.svg', tooltip: 'React' },
  d3: { logo: 'assets/d3.png', tooltip: 'D3' },
  git: { logo: 'assets/git.png', tooltip: 'Git' },
  laravel: { logo: 'assets/laravel.png', tooltip: 'Laravel' },
};

// const durationPerExpertise = 1; // seconds
const durationPerExpertise = 0.3; // seconds

const jobsConfig = [
  {
    company: {
      name: 'AUGE Digital',
      color: 'green'
    },
    initDate: '01/2016',
    endDate: '11/2017',
    profile: 'Junior Web Developer',
    skills: [
      {
        ...logoMap.angularjs,
        expertise: 7 // 1 - 10
      },
      {
        ...logoMap.angular,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.rxjs,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.typescript,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.css,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.html,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.js,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.sass,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.git,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.laravel,
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
        ...logoMap.angular,
        expertise: 7 // 1 - 10
      },
      {
        ...logoMap.typescript,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.rxjs,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.css,
        expertise: 7 // 1 - 10
      },
      {
        ...logoMap.html,
        expertise: 7 // 1 - 10
      },
      {
        ...logoMap.js,
        expertise: 7 // 1 - 10
      },
      {
        ...logoMap.sass,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.git,
        expertise: 6 // 1 - 10
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
    endDate: 'Now',
    skills: [
      {
        ...logoMap.angular,
        expertise: 8 // 1 - 10
      },
      {
        ...logoMap.typescript,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.rxjs,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.css,
        expertise: 8 // 1 - 10
      },
      {
        ...logoMap.html,
        expertise: 8 // 1 - 10
      },
      {
        ...logoMap.js,
        expertise: 8 // 1 - 10
      },
      {
        ...logoMap.react,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.redux,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.d3,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.sass,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.git,
        expertise: 6 // 1 - 10
      }
    ]
  }
];

jobsConfig.forEach((job, i, array) => {
  job.duration = durationPerExpertise * (job.skills.map(skill => skill.expertise).reduce((ac, currentValue) => ac + currentValue));

  const slicedArray = array
    .slice(0, i);

  job.animationDelay = slicedArray.length 
    ? slicedArray
      .map(jobConfig => jobConfig.duration)
      .reduce((ac, currentValue) => ac + currentValue)
    : 0;

  /* const jobDelay = i ? array[i - 1].duration : 0; */

  job.skills.forEach((skill, iSkills, arraySkills) => {
    skill.duration = skill.expertise * durationPerExpertise;
    skill.animationDelay = (iSkills ? 0 : job.animationDelay) + (iSkills ? (arraySkills[iSkills - 1].duration + arraySkills[iSkills - 1].animationDelay ) : 0);
  })

});

/* const scrollStep = 1;
let currentScroll = 0;
let maxScroll = 0; */

const initHeight = 0;
const jobHeight = 65;
const jobDuration = 5;

const totalJobDuration = jobsConfig.map(job => job.duration).reduce((ac, currentValue) => ac + currentValue);

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
// const avatar = avatarThatFollowPath(jobsConfig, jobDuration, currentJobPath, jobPath, initHeight);

jobs.forEach(job => {
  svg.appendChild(job);
});
// svg.appendChild(avatar);
svg.appendChild(getContinue(jobsConfig, totalJobDuration, jobHeight));

const start = document.getElementById('start-cv');
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
