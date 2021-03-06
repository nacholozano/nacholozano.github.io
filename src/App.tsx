import { Intro } from './components/intro/Intro';
import { Job } from './components/Job';
import { Card } from './components/Card';
import { Skill } from './components/skill/Skill';
import { Header } from './components/header/Header';
import './App.css';

function App() {

  const jobs: any[] = [
    {
      title: 'Front-end Senior Developer',
      desc: 'Profile Software Services',
      startDate: '30/10/2019',
      endDate: '',
      tasks: [
        'Preparación para migrar progresivamente un proyecto antiguo hecho con AngularJS 1.4, Grunt y Bower a Angular 10 con SystemJS y Typescript.',
        'Desarrollo y arquitectura de un proyecto interno de gestión hecho con React 16, Typescript, Redux, SASS, Jest y Enzyme.',
        'Realización de revisiones de código.',
        'Desarrollo y arquitectura de un proyecto sobre energía solar con Angular 8, Angular Material, D3.js, SASS, Jest, Typescript y Cypress.',
        'Desarrollo de una librería de Web Components con StencilJS, JSX, SASS, Responsive Design, CSS3 y Jest.'
      ],
    },
    /* {
      title: 'Front-end Developer',
      desc: 'Proyectos personales',
      startDate: '01/01/2016',
      endDate: '',
      tasks: [
        '',
        '',
      ],
    }, */
    {
      title: 'Middle Front-end Developer',
      desc: 'Universitas XXI',
      startDate: '14/11/2017',
      endDate: '30/10/2019',
      tasks: [
        'Desarrollo de un ERP con HTML5, CSS3, SASS, Javascript, Angular 4 y Typescript cumpliendo con los requisitos funcionales y de diseño.',
        'Dar soporte de Angular al resto del equipo.',
        'Corrección de errores en Java y Oracle SQL si la incidencia lo requiere.',
      ],
    },
    {
      title: 'Junior App Developer',
      desc: 'AUGE Digital',
      startDate: '16/01/2016',
      endDate: '14/11/2017',
      tasks: [
        'Maquetación responsive con HTML5, CSS3, SASS y Javascript.',
        'Desarrollo de un ERP con AngularJS y su posterior actualización a Angular 2/4 con TypeScript.',
        'Desarrollo de componentes, extensiones y temas personalizados para Adapt Framework.',
        'Mantenimiento y ampliación de una API realizada con PHP, Laravel y MySQL.',
        'Mantenimiento y amplicación de una aplicación móvil hecha con Titanium Appelerator.',
      ],
    },
    {
      title: 'Soporte (prácticas)',
      desc: 'Everis',
      startDate: '20/03/2015',
      endDate: '20/06/2015',
      tasks: [
        'Corrección de inconsistencias en la base de datos SQL Oracle.',
      ],
    },
  ];

  const skills: any[] = [
    { name: 'AngularJS', level: 3, img: 'angularjs.svg' },
    { name: 'Angular', level: 3, img: 'angular.svg' },
    { name: 'CSS', level: 3, img: 'css3.png' },
    { name: 'HTML', level: 3, img: 'html5.png' },
    { name: 'JavaScript', level: 3, img: 'js.svg' },
    { name: 'Jest', level: 3, img: 'jest.png' },
    { name: 'Cypress', level: 3, img: 'cypress.png' },
    { name: 'React', level: 3, img: 'react.svg' },
    { name: 'Redux', level: 3, img: 'redux.png' },
    { name: 'SASS', level: 3, img: 'sass.png' },
    { name: 'Git', level: 3, img: 'git.png' },
    { name: 'Typescript', level: 3, img: 'typescript.png' },
    { name: 'RxJS', level: 3, img: 'rxjs.png' },
    { name: 'D3', level: 3, img: 'd3.png' },
    { name: 'Enzyme', level: 3, img: 'enzyme.png' },
    { name: 'StencilJS', level: 3, img: 'stenciljs.png' },
    { name: 'MySQL', level: 3,img: 'mysql.png' },
    { name: 'Bootstrap', level: 3, img: 'bootstrap.png' },
    { name: 'Angular Material', level: 3, img: 'a-material.png' }
  ];

  return (
    <div className="App">
      <Header/>
      <hr/>
      <Intro/>
      <hr/>
      <Card title="Tecnologías">
        
        {
          skills.map((skill) => ( <Skill {...skill} img={'img/' + skill.img}/> ))
        }
        
      </Card>
      <hr/>
      <Card title="Experiencia laboral">
        
        {
          jobs.map((job) => ( <Job {...job}/> ))
        }
        
      </Card>
      <hr/>
      <Card title="Idiomas">
        qwerty
      </Card>
    </div>
  );
}

export default App;
