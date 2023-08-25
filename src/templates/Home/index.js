import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Pubs } from '../../components/Pubs';
import { LoadMorePosts } from '../../components/button/LoadMorePosts';

export class Home extends Component {
  state = {
    files: [],
    allFiles: [],
    page: 0,
    postsPerPage: 10
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

  render() {
    const { files, page, postsPerPage, allFiles } = this.state;
    const noMorePosts = page + postsPerPage >= allFiles.length;

    return (
      <section className='container'>
        <Pubs files={files} />
        <div className='button-container'>
          <LoadMorePosts
            onClick={this.loadMorePosts}
            text={'Carregar mais Publicações'}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}
