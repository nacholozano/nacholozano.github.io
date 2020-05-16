/* var path = document.querySelector('.path');
var length = path.getTotalLength(); */

const initHeight = 10;
const jobHeight = 65;
const jobDuration = 8;
const jobPath = `
    v 30 
    h 20 
    q 0,-20 20,-20 
    h 160 
    q 20,0 20,20 
    v 5 
    q 0,20 -20,20 
    h -160 
    q -20,0 -20,-20 
    h -20 v30
`;

const id = document.getElementById('svg');

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute('viewBox', '0 0 300 1000');

console.log(svg);

const path1 = jobCreator(initHeight);
const path2 = jobCreator(initHeight + jobHeight);

path2.style.animationDelay = jobDuration + 's';

console.log(path1);
console.log(path2);

svg.appendChild(path1);
svg.appendChild(path2);
svg.appendChild(path2);
svg.appendChild(avatarThatFollowPath());

id.appendChild(svg);

function createSvgEl(type = '') {
    return document.createElementNS('http://www.w3.org/2000/svg', type)
}

function jobCreator(vPos = 0) {
    const p = createSvgEl("path");
    p.setAttribute('d', `
        M 35 ${vPos} 
        ${jobPath}
    `)
    return p;
}

function avatarThatFollowPath() {
    const avatar = createSvgEl('circle');
    avatar.setAttribute('r', 5);
    avatar.setAttribute('fill', 'red');

    const animateMotion = createSvgEl('animateMotion');
    animateMotion.setAttribute('repeatCount', 'indefinite');
    animateMotion.setAttribute('dur', `${jobDuration * 2}s`);
    animateMotion.setAttribute('path', `
        M 35 ${initHeight}
        ${jobPath}
        ${jobPath}
    `);
    animateMotion.setAttribute('fill', 'freeze');
    animateMotion.setAttribute('end', `${jobDuration * 2}s`);

    avatar.appendChild(animateMotion);

    return avatar;
}