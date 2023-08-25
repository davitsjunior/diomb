import './App.css';
import { Component } from 'react';
import { loadPosts } from './utils/load-posts';
import { Pubs } from './components/Pubs';

class App extends Component {
  state = {
    files: []
  };

  async componentDidMount() {
    await this.loadPosts();

  }

  loadPosts = async () => {
    const filesJson = await loadPosts();
    this.setState({ files: filesJson.files });
  }

  render() {
    const { files } = this.state;
    return (
      <section className='container'>
        <Pubs files={files}/>
      </section>
    );
  }
}
export default App;
