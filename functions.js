export function lastIsCurrentJob(jobsConfig) {
  return jobsConfig[jobsConfig.length - 1].endDate ? false : true;
}

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
    p.style.animationDuration = `${jobDuration}s`;
    p.style.animationDelay = (jobDuration * i) + 's';

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