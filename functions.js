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

    // Create elements
    const g = createSvgEl('g')
    const p = createSvgEl('path');
    const background = createSvgEl('rect');

    // Job background
    background.setAttribute('width', '100%');
    background.setAttribute('height', jobHeight);
    background.style.fill = `rgb(${jobConfig.company.color}, 0.2)`;

    background.style.animationDuration = '0.5s';
    background.style.animationDelay = jobConfig.animationDelay + 's';
    background.classList.add('opacity-full');

    // Path
    p.setAttribute('d', `
      M 35 
      ${initHeight}
      ${(i === jobsConfig.length - 1) && !jobsConfig[jobsConfig.length - 1].endDate
          ? currentJobPath 
          : jobPath}
    `)
    
    p.style.stroke = `rgb(${jobConfig.company.color})`;
    p.style.animationDuration = `${jobConfig.duration}s`;
    p.style.animationDelay = (jobConfig.animationDelay) + 's';

    // Ini date
    const initDate = createSvgEl('tspan');
    initDate.textContent = jobConfig.initDate;
    initDate.setAttribute('dy', "1.2em");
    initDate.setAttribute('x', "0.2em");

    // Company
    const company = createSvgEl('tspan');
    company.textContent = jobConfig.company.name;
    company.setAttribute('dy', "1.2em");
    company.setAttribute('x', "0.2em");

    // End date
    const endDate = createSvgEl('tspan');
    endDate.textContent = jobConfig.endDate || 'Now';
    endDate.setAttribute('dy', "1.2em");
    endDate.setAttribute('x', "0.2em");

    // Job info
    const jobInfo = createSvgEl('text');
    jobInfo.classList.add('jobInfo');

    jobInfo.appendChild(initDate);
    jobInfo.appendChild(company);
    jobInfo.appendChild(endDate);
      
    g.appendChild(background);
    g.appendChild(jobInfo);
    g.appendChild(p);
    g.style.transform = `translateY(${translateY * i}${unitTranslateY})`;
    
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

export function getContinue(jobsConfig, jobDuration, jobHeight) {
  // const jobHeight = 65;
  const jobHeightUnit = 'px';
  const animationDelayOffset = 0.5;
  const offset = 35;
  const lastJobIsCurrent = !jobsConfig[jobsConfig.length - 1].endDate;
  const animationDelay = jobDuration /* * jobsConfig.length */ + animationDelayOffset;

  const willContinue = createSvgEl('text');
  willContinue.textContent = 'Will my career continue with your project?';
  willContinue.style.fontSize = '0.5em';
  willContinue.style.animationDelay = `${lastJobIsCurrent ? (animationDelay - jobDuration / 2) : animationDelay}s`;
  willContinue.style.animationDuration = '3s';
  willContinue.style.transform = `translate(27%, ${(jobHeight * jobsConfig.length) + offset + jobHeightUnit})`;
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
    const title = createSvgEl('title');

    logo.setAttribute('href', skill.logo);
    logo.setAttribute('width', 1);
    logo.setAttribute('height', 1);
    logo.classList.add('scale-skill');

    if (skill.initExpertise) {
      logo.classList.add(`scale-skill-initial-${skill.initExpertise}`);
      logo.classList.add('scale-skill-no-opacity');
    } else {
      logo.classList.add(`scale-skill-initial-0`);
    }

    title.textContent = skill.tooltip;
    
    const animationFillMode = 'forwards';
    const opactityDuraction = skill.initExpertise ? 1 : 0;

    const scaleAnimationClass = `scale-skill-${skill.expertise}`;
    const scaleAnimationDuration = (isCurrentJob ? (skill.duration / 2) : skill.duration) + 's';
    const scaleAnimationDelay = skill.animationDelay + opactityDuraction + 's';
    const scaleAnimation = `${scaleAnimationDuration} ${scaleAnimationDelay} ${animationFillMode} ${scaleAnimationClass}`;

    const opacityAnimationClass = 'opacityFull';
    const opacityAnimationDuration = opactityDuraction + 's';
    const opacityAnimationDelay = skill.animationDelay + 's';
    const opacityAnimation = `${opacityAnimationDuration} ${opacityAnimationDelay} ${animationFillMode} ${opacityAnimationClass}`;

    logo.style.animation = skill.initExpertise 
      ? `${opacityAnimation}, ${scaleAnimation}`
      : scaleAnimation;

    const trans = translate(i);
    gLogo.style.transform = `translate(${trans.x}, ${trans.y})`;

    logo.appendChild(title);
    gLogo.appendChild(logo);
    // gContainer.appendChild(gLogo);
    return gLogo;
  }
}