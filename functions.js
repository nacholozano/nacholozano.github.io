export function lastIsCurrentJob(jobsConfig) {
  return jobsConfig[jobsConfig.length - 1].endDate ? false : true;
}

export function createSvgEl(type = '') {
  return document.createElementNS('http://www.w3.org/2000/svg', type)
}

export function buildJobs(jobsConfig, jobDuration, currentJobPath, jobPath, jobHeight, initHeight) {
  return jobsConfig.map((jobConfig, i) => {

    const g = createSvgEl('g')
    const p = createSvgEl('path');
    p.setAttribute('d', `
      M 35 
      ${initHeight + (jobHeight * i)} 
      ${(i === jobsConfig.length - 1) && !jobsConfig[jobsConfig.length - 1].endDate
          ? currentJobPath 
          : jobPath}
    `)
    
    p.style.animationDuration = `${jobDuration}s`;
    p.style.animationDelay = (jobDuration * i) + 's';

    /* const gDesc = createSvgEl('g'); */
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
    endDate.textContent = jobConfig.endDate;
    endDate.setAttribute('dy', "1.2em");
    endDate.setAttribute('x', "0.2em");

    jobInfo.appendChild(initDate);
    jobInfo.appendChild(company);
    jobInfo.appendChild(endDate);

    g.appendChild(jobInfo);

    g.appendChild(p);

    return g;
  })
}

export function avatarThatFollowPath(jobsConfig, jobDuration, currentJobPath, jobPath, initHeight) {
  const g = createSvgEl('g');
  const avatar = createSvgEl('circle');
  avatar.setAttribute('r', 5);
  avatar.setAttribute('fill', 'red');
  
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

export function getContinue(numberOfJobs, jobDuration) {
  const willContinue = createSvgEl('text');
  willContinue.textContent = 'will continue ... with your project?';
  willContinue.setAttribute('x', 90);
  willContinue.setAttribute('y', 65 * numberOfJobs + 40);
  willContinue.style.fontSize = '0.5em';
  willContinue.style.animationDelay = `${jobDuration * numberOfJobs}s`;
  willContinue.style.animationDuration = '6s';
  willContinue.classList.add('opacity-full');
  return willContinue;
}