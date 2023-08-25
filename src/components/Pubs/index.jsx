import './styles.css';
import { Pub } from "../Pub"

export const Pubs = ({ files }) => {
    return (
        <div className="pubs">
            {files.map(file => (
                <Pub
                    key={file.id}
                    fileName={file.fileName}
                    edicao={file.edicao}
                    docYear={file.docYear}
                    createdAt={file.createdAt}
                />
            ))}
        </div>
    )
}