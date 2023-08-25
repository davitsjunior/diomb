import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Pubs } from '../../components/Pubs';
import { LoadMorePosts } from '../../components/button/LoadMorePosts';
import { InputPesquisa } from '../../components/TextInput';

export class Home extends Component {
  state = {
    files: [],
    allFiles: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const filesJson = await loadPosts();
    this.setState({
      files: filesJson.files.slice(page, postsPerPage),
      allFiles: filesJson.files
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allFiles,
      files
    } = this.state

    const nextPage = page + postsPerPage;
    const nextPosts = allFiles.slice(nextPage, nextPage + postsPerPage);
    files.push(...nextPosts);

    this.setState({ files, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { files, page, postsPerPage, allFiles, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allFiles.length;

    const filteredPosts = !!searchValue ?
      allFiles.filter(file => {
        return file.fileName.toLowerCase().includes(searchValue.toLowerCase());
      })
      :
      files;

    return (
      <section className='container'>

        <div className='search-container'>
          {!!searchValue && (
            <h1>Referência para Pesquisa: {searchValue}</h1>
          )}

          <InputPesquisa
            searchValue={searchValue}
            handleChange={this.handleChange}
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
              onClick={this.loadMorePosts}
              text={'Carregar mais Publicações'}
              disabled={noMorePosts}
            />
          )}

        </div>
      </section>
    );
  }
}
