import './Intro.css';

export function Intro() {
  return (
    <div className="intro-container">
      <div className="info">
        <span className="tag">Email:</span> <span className="value">nacholozanogui@gmail.com</span>
      </div>
      <div className="info">
        <span className="tag">Codepen:</span> <span className="value"><a href="https://codepen.io/nacholozano/">https://codepen.io/nacholozano/</a></span>
      </div>
      <div className="info">
        <span className="tag">LinkedIn:</span> <span className="value"><a href="https://www.linkedin.com/in/nacholozano/">https://www.linkedin.com/in/nacholozano/</a></span>
      </div>
      <div className="info">
        <span className="tag">GitHub:</span> <span className="value"><a href="https://github.com/nacholozano">https://github.com/nacholozano</a></span>
      </div>
      <div className="info">
        <span className="tag">Lugar:</span> <span className="value">Sevilla, España</span>
      </div>
    </div>
  )
}