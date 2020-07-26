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
  adapt: { logo: 'assets/adapt.png', tooltip: 'Adapt Framework' },
};

// const durationPerExpertise = 1; // seconds
const durationPerExpertise = 0.3; // seconds

const jobsConfig = [
  {
    company: {
      name: 'AUGE Digital',
      color: '0, 158, 8'
    },
    initDate: '01/2016',
    endDate: '11/2017',
    profile: 'Junior Web Developer',
    skills: [
      {
        ...logoMap.angularjs,
        expertise: 4 // 1 - 10
      },
      {
        ...logoMap.angular,
        expertise: 2 // 1 - 10
      },
      {
        ...logoMap.rxjs,
        expertise: 2 // 1 - 10
      },
      {
        ...logoMap.typescript,
        expertise: 2 // 1 - 10
      },
      {
        ...logoMap.adapt,
        expertise: 4 // 1 - 10
      },
      {
        ...logoMap.css,
        expertise: 3 // 1 - 10
      },
      {
        ...logoMap.html,
        expertise: 3 // 1 - 10
      },
      {
        ...logoMap.js,
        expertise: 4 // 1 - 10
      },
      {
        ...logoMap.sass,
        expertise: 3 // 1 - 10
      },
      {
        ...logoMap.git,
        expertise: 3 // 1 - 10
      },
      {
        ...logoMap.laravel,
        expertise: 4 // 1 - 10
      }
    ]
  },
  {
    company: {
      name: 'Universitas XXI',
      color: '0, 21, 158'
    },
    profile: 'Mid Front-End Developer',
    initDate: '01/2016',
    endDate: '11/2017',
    skills: [
      {
        ...logoMap.angular,
        expertise: 5 // 1 - 10
      },
      {
        ...logoMap.typescript,
        expertise: 4 // 1 - 10
      },
      {
        ...logoMap.js,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.css,
        expertise: 5 // 1 - 10
      },
      {
        ...logoMap.html,
        expertise: 5 // 1 - 10
      },
      {
        ...logoMap.rxjs,
        expertise: 4 // 1 - 10
      },
      {
        ...logoMap.sass,
        expertise: 5 // 1 - 10
      },
      {
        ...logoMap.git,
        expertise: 5 // 1 - 10
      }
    ]
  },
  {
    company: {
      name: 'Profile Software Services',
      color: '158, 0, 0'
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
        expertise: 3 // 1 - 10
      },
      {
        ...logoMap.redux,
        expertise: 3 // 1 - 10
      },
      {
        ...logoMap.d3,
        expertise: 3 // 1 - 10
      },
      {
        ...logoMap.sass,
        expertise: 6 // 1 - 10
      },
      {
        ...logoMap.git,
        expertise: 7 // 1 - 10
      }
    ]
  }
];

jobsConfig.forEach((job, iJobs, arrayJobs) => {

  job.skills.forEach((skill) => {

    const previousJobIndex = iJobs - 1;
    if (previousJobIndex > -1) {
      const repeatedSkill = arrayJobs[previousJobIndex].skills.find(s => s.logo === skill.logo);
      if (repeatedSkill) {
        skill.initExpertise = repeatedSkill.expertise;
      }
    }

    const increaseDurationByInitExpertises = skill.initExpertise ? 1 : 0;
    const expertiseDiff = skill.initExpertise ? (skill.expertise - skill.initExpertise) : skill.expertise;

    skill.duration = ( expertiseDiff * durationPerExpertise ) + increaseDurationByInitExpertises;
  });

  job.duration = job.skills
      .map(skill => skill.duration) 
      .reduce((ac, currentValue) => ac + currentValue);

  const slicedArray = arrayJobs
    .slice(0, iJobs);

  job.animationDelay = slicedArray.length 
    ? slicedArray
      .map(jobConfig => jobConfig.duration)
      .reduce((ac, currentValue) => ac + currentValue)
    : 0;

  job.skills.forEach((skill, iSkills, arraySkills) => {
    skill.animationDelay = (iSkills ? 0 : job.animationDelay) + (iSkills ? (arraySkills[iSkills - 1].duration + arraySkills[iSkills - 1].animationDelay ) : 0);
  })

});

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

// const svg = document.querySelector('div');

// get scroll position in px
// console.log(el.scrollLeft, el.scrollTop);

// set scroll position in px
// el.scrollLeft = 500;
// el.scrollTop = 1000;

const scrollStep = 1;
let currentScroll = 0;
let maxScroll = 0;

/* setTimeout(() => {
  maxScroll = document.body.scrollHeight;
  window.requestAnimationFrame(step);
}, jobDuration * 2000)

function step() {
  currentScroll += scrollStep;
  id.scrollTop = currentScroll;
  if (currentScroll < maxScroll) {
    window.requestAnimationFrame(step);
  }
}
 */