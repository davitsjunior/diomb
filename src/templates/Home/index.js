import './styles.css';
import { Component, useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Pubs } from '../../components/Pubs';
import { LoadMorePosts } from '../../components/button/LoadMorePosts';
import { InputPesquisa } from '../../components/TextInput';

export const Home = () => {

  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allFiles.length;

  const filteredPosts = !!searchValue ?
    allFiles.filter(file => {
      return file.fileName.toLowerCase().includes(searchValue.toLowerCase());
    })
    :
    files;

  const handlLoadPosts = useCallback( async (page, postsPerPage) => {
    const filesJson = await loadPosts();

    setFiles(filesJson.files.slice(page, postsPerPage));
    setAllFiles(filesJson.files)
  }, [] )

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
        <p>Nenhum resultado retornado da pesquisa!</p>
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
    </section>
  );
}
