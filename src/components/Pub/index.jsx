import { ButtonDownload } from '../button/Download';
import './styles.css';

export const Pub = ({fileName, edicao, docYear, createdAt}) => {
    return (
        <div className='pub'>
            <h2>{fileName}</h2>
            <p>{edicao}</p>
            <p>{docYear}</p>
            <p>{createdAt}</p>
            <ButtonDownload/>
            <p></p>
        </div>
    )
}