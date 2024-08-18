import './App.css';
import PostsTraditional from './components/PostsTraditional';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostsRQ from './components/PostsRQ';
import Home from './components/Home';
import PostDetailsRQ from './components/PostDetailsRQ';
import PaginatedQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';

function App() {

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/posts' element={<PostsTraditional />} />
          <Route exact path='/rq-posts' element={<PostsRQ />} />
          <Route exact path='/rq-posts/:postId' element={<PostDetailsRQ />} />
          <Route exact path='/paginated-fruits' element={<PaginatedQueries />} />
          <Route exact path='/infinite-fruits' element={<InfiniteQueries />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;
