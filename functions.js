/* export function lastIsCurrentJob(jobsConfig) {
  return jobsConfig[jobsConfig.length - 1].endDate ? false : true;
} */

export function createSvgEl(type = '') {
  return document.createElementNS('http://www.w3.org/2000/svg', type)
}

export function buildJobs(jobsConfig, jobDuration, currentJobPath, jobPath, jobHeight, initHeight) {

  const translateY = 4.06;
  const unitTranslateY = 'em';

  return jobsConfig.map((jobConfig, i) => {

    const g = createSvgEl('g')
    const p = createSvgEl('path');
    p.setAttribute('d', `
      M 35 
      ${initHeight}
      ${(i === jobsConfig.length - 1) && !jobsConfig[jobsConfig.length - 1].endDate
          ? currentJobPath 
          : jobPath}
    `)
      
    p.style.stroke = jobConfig.company.color;
    p.style.animationDuration = `${jobConfig.duration}s`;

    p.style.animationDelay = (jobConfig.animationDelay) + 's';

    const jobInfo = createSvgEl('text');
    jobInfo.classList.add('jobInfo');

    const initDate = createSvgEl('tspan');
    initDate.textContent = jobConfig.initDate;
    initDate.setAttribute('dy', "1.2em");
    initDate.setAttribute('x', "0.2em");

    const company = createSvgEl('tspan');
    company.textContent = jobConfig.company.name;
    company.setAttribute('dy', "1.2em");
    company.setAttribute('x', "0.2em");

    const endDate = createSvgEl('tspan');
    endDate.textContent = jobConfig.endDate || 'Now';
    endDate.setAttribute('dy', "1.2em");
    endDate.setAttribute('x', "0.2em");

    jobInfo.appendChild(initDate);
    jobInfo.appendChild(company);
    jobInfo.appendChild(endDate);

    g.appendChild(jobInfo);
    g.appendChild(p);
    g.style.transform = `translateY(${translateY * i}${unitTranslateY})`;

    /* const skills = getJobSkills(jobConfig.skills, jobDuration); */
    const skills = getJobSkills(jobConfig, jobDuration);
    
    g.appendChild(skills);

    return g;
  })
}

export function avatarThatFollowPath(jobsConfig, jobDuration, currentJobPath, jobPath, initHeight) {
  const g = createSvgEl('g');
  const avatar = createSvgEl('circle');
  avatar.setAttribute('r', 5);
  avatar.setAttribute('fill', 'black');
  
  const totalDuration = jobDuration * jobsConfig.length;

  const animateMotion = createSvgEl('animateMotion');
  animateMotion.setAttribute('repeatCount', 'indefinite');
  animateMotion.setAttribute('dur', `${totalDuration}s`);

  let path = `M 35 ${initHeight}`;
  jobsConfig.forEach((jc, i) => {
    path += jobPath;

    const text = createSvgEl('text');
    text.setAttribute('x', '7');
    text.setAttribute('y', '-7');
    text.classList.add('avatar-profile-name');
    text.classList.add(jobsConfig.length - 1 === i ? 'opacity-end' : 'opacity');
    text.style.animationDelay = `${1 + (i * jobDuration)}s`,
    text.style.animationDuration = `${jobDuration}s`,
    text.textContent = jc.profile;
    
    g.appendChild(text);
  });
  
  const endDurationOffset = jobsConfig[jobsConfig.length - 1].endDate ? 0 : (jobDuration / 2);

  animateMotion.setAttribute('path', path);
  animateMotion.setAttribute('fill', 'freeze');
  animateMotion.setAttribute('end', `${totalDuration - endDurationOffset}s`);

  g.appendChild(avatar);
  g.appendChild(animateMotion);

  return g;
}

export function getContinue(jobsConfig, jobDuration) {
  const jobHeight = 9.6;
  const jobHeightUnit = 'em';
  const animationDelayOffset = 0.5;
  const lastJobIsCurrent = !jobsConfig[jobsConfig.length - 1].endDate;
  const animationDelay = jobDuration * jobsConfig.length + animationDelayOffset;

  const willContinue = createSvgEl('text');
  willContinue.textContent = 'will continue ... with your project?';
  willContinue.style.fontSize = '0.5em';
  willContinue.style.animationDelay = `${lastJobIsCurrent ? (animationDelay - jobDuration / 2) : animationDelay}s`;
  willContinue.style.animationDuration = '4s';
  willContinue.style.transform = `translate(5.1vw, ${(jobHeight * jobsConfig.length) + jobHeightUnit})`;
  willContinue.classList.add('opacity-full');
  return willContinue;
}

function getJobSkills(job, jobDuration) {
  const sortedSkills = job.skills/* .sort((a, b) => {
    return b.expertise - a.expertise;
  }) */;

  // const totalSkills = skills.map(s => s.expertise).reduce((a,s) => a + s);
  // const durationPerExpertise = jobDuration / totalSkills;

  const containerWidth = 12.5;
  const containerHeight = 2.8;
  const unit = 'em';

  const supNumber = Math.ceil(sortedSkills.length / 2);

  const sup = sortedSkills.slice(0, supNumber);
  const sub = sortedSkills.slice(supNumber, sortedSkills.length);
  
  const gContainer = createSvgEl('g');

  const skillsContainerWidthOffset = 0.9;
  const skillsOffset = 0.05;

  const step = (containerWidth * skillsContainerWidthOffset) / sup.length;
  const initStep = (step / 2) + (containerWidth * skillsOffset);

  const stepSub = (containerWidth * skillsContainerWidthOffset) / sub.length;
  const initStepSub = (stepSub / 2) + (containerWidth * skillsOffset);

  const cellHeight = sup.length && sub.length ? containerHeight / 2 : containerHeight;
  
  const isCurrentJob = !job.endDate;

  sup
    .map( setJobSkillProps((i) => ({
        x: (initStep + (i * step)) + unit,
        y: (cellHeight / 2) + unit
      }), isCurrentJob
    ))
    .forEach(jobSkill => gContainer.appendChild(jobSkill))

  

  sub
    .reverse()
    .map( setJobSkillProps((i) => ({
        x: initStepSub + (i * stepSub) + unit,
        y: (( cellHeight / 2 ) + containerHeight / 2) + unit
      }), isCurrentJob
    ))
    .forEach(jobSkill => gContainer.appendChild(jobSkill))

  gContainer.style.transform = 'translate(3.4em, 0.6em)';

  return gContainer;
}

function setJobSkillProps(translate = () => {}, isCurrentJob) {
  return (skill, i) => {
    const gLogo = createSvgEl('g');
    const logo = createSvgEl('image');
    logo.setAttribute('href', skill.logo);
    logo.setAttribute('width', 1);
    logo.setAttribute('height', 1);
    logo.classList.add('scale-skill');
    
    logo.style.animationName = `scale-skill-${skill.expertise}`;
    
    logo.style.animationDuration = (isCurrentJob ? (skill.duration / 2) : skill.duration) + 's';
    logo.style.animationDelay = skill.animationDelay + 's';

    const trans = translate(i);
    gLogo.style.transform = `translate(${trans.x}, ${trans.y})`;

    gLogo.appendChild(logo);
    // gContainer.appendChild(gLogo);
    return gLogo;
  }
}