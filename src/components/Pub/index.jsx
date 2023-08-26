import './styles.css';
import { format } from 'date-fns';
import { ButtonDownload } from '../button/Download';

export const Pub = ({ downloadLink, edicao, docYear, createdAt }) => {
    const formattedDate = format(new Date(createdAt), 'dd-MM-yyyy');
    const createdYear = new Date(createdAt).getFullYear();
    const paddedEdicao = edicao <= 9 ? `00${edicao}` : edicao <= 99 ? `0${edicao}` : edicao;

    return (
        <div className='pub'>
            <div className='edicao'>
                <strong>Edição:</strong> {paddedEdicao}-{createdYear}
            </div>
            <div className='ano'>
                <strong>Ano:</strong> {docYear}
            </div>
            <div className='data'>
                <strong>Data da Publicação:</strong> {formattedDate}
            </div>
            <ButtonDownload 
                downloadLink={downloadLink}
            />
        </div>
    )
}