import './styles.css';

export const ButtonDownload = ({downloadLink}) => {
  return (
    <div>
      <a href={downloadLink} target="_blank" rel="noopener noreferrer" className='alink'>
        <button className="download-button">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
          Baixar</button>
      </a>
    </div>
  );
};
