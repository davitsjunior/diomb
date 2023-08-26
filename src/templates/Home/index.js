import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Pubs } from '../../components/Pubs';
import { LoadMorePosts } from '../../components/button/LoadMorePosts';
import { InputPesquisa } from '../../components/TextInput';
import { reverse } from 'lodash';
import { format } from 'date-fns';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';


export const Home = () => {

  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allFiles.length;

  const filteredPosts = !!searchValue ?
    allFiles.filter(file => {
      const formattedDate = format(new Date(file.createdAt), 'dd-MM-yyyy');
      return (
        file.fileName.toLowerCase().includes(searchValue.toLowerCase()) ||
        formattedDate.includes(searchValue.toLowerCase())
      );
    })
    :
    files;

  const handlLoadPosts = useCallback(async (page, postsPerPage) => {
    const filesJson = await loadPosts();

    const reversedFiles = reverse(filesJson.files);

    setFiles(reversedFiles.slice(page, postsPerPage));
    setAllFiles(reversedFiles)
  }, [])

  useEffect(() => {
    handlLoadPosts(0, postsPerPage);
  }, [handlLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allFiles.slice(nextPage, nextPage + postsPerPage);
    files.push(...nextPosts);

    setFiles(files);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <section className='container'>

      <div className='cabecalho'>
        <Header />
      </div>

      <div className='search-container'>

        {!!searchValue && (
          <h1>Referência para Pesquisa: {searchValue}</h1>
        )}

        <InputPesquisa
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>


      {filteredPosts.length > 0 && (
        <Pubs files={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <div>
          <h3>Nenhum resultado retornado da pesquisa!</h3><br/>
          <p>Pesquise por data, exemplo: dd-mm-yyyy</p><br/>
          <p>Pesquise por edição, exemplo: 123-2023</p>
        </div>

      )}

      <div className='button-container'>
        {!searchValue && (
          <LoadMorePosts
            onClick={loadMorePosts}
            text={'Carregar mais Publicações'}
            disabled={noMorePosts}
          />
        )}

      </div>

      <div>
        <Footer />
      </div>
    </section>
  );
}
