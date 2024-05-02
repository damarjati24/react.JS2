//Menampilkan video youtube di browser menggunakan hooks/useState
import React, { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import './youtube.css';

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

//Function untuk MainVideo
function MainVideo({ video }) {
  return (
    <div className='main-video'>
      <iframe
        className='iframe-video'
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="video-info">
        <h2 className="video-title-main">{video.snippet.title}</h2>
        <p className="video-description-main">{video.snippet.description}</p>
      </div>
    </div>
  );
}

// Function untuk VideoCard
function VideoCard({ video, onClick }) {
  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="video-thumbnail" />
      <div className="video-info">
        <h2 className="video-title-card">{video.snippet.title}</h2>
      </div>
    </div>
  );
}

// Function untuk App
function App() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 5,
          q: query,
          key: 'AIzaSyD1jiGuAIJa_JAAiTrQKv5uNtdU3KeAbkU', // Ganti dengan kunci API Anda
        },
      });
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching videos: ', error);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  // Menampilkan formulir pencarian dengan input teks dan tombol pencarian.
  // Ketika formulir disubmit, akan memanggil fungsi handleSubmit.
  return (
    <div className="ui container">
      <div className="ui segment">
        <form onSubmit={handleSubmit} className="ui form" style={{marginTop: '10px'}}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for videos..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      
      {/* // Menampilkan video utama (jika ada) menggunakan komponen MainVideo. */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="main-video">
          {selectedVideo && <MainVideo video={selectedVideo} />}
        </div>
        
        {/* Menampilkan daftar video menggunakan komponen VideoCard.
        Ketika video dalam daftar diklik, akan memanggil fungsi handleVideoClick untuk menetapkan video yang dipilih ke selectedVideo. */}
        <div className="video-list">
          <div className="video-cards">
            {videos.map((video) => (
              <VideoCard key={video.id.videoId} video={video} onClick={handleVideoClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

root.render(<App />);



// Menampilkan video youtube di browser menggunakan Class
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import axios from 'axios';
// import './youtube.css';

// const el = document.getElementById("root");
// const root = ReactDOM.createRoot(el);

// // Komponen untuk video utama
// class MainVideo extends React.Component {
//   render() {
//     const { video } = this.props;
//     return (
//       <div className='main-video'>
//         <iframe
//           className='iframe-video'
//           src={`https://www.youtube.com/embed/${video.id.videoId}`}
//           title="YouTube video player"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//         <div className="video-info">
//           <h2 className="video-title-main">{video.snippet.title}</h2>
//           <p className="video-description-main">{video.snippet.description}</p>
//         </div>
//       </div>
//     );
//   }
// }

// class VideoCard extends React.Component {
//   render() {
//     const { video, onClick } = this.props;
//     return (
//       <div className="video-card" onClick={() => onClick(video)}>
//         <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="video-thumbnail" />
//         <div className="video-info">
//           <h2 className="video-title-card">{video.snippet.title}</h2>
//         </div>
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       query: '',
//       videos: [],
//       selectedVideo: null,
//     };
//   }

//   handleChange = (event) => {
//     this.setState({ query: event.target.value });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//         params: {
//           part: 'snippet',
//           maxResults: 5,
//           q: this.state.query,
//           key: 'AIzaSyD1jiGuAIJa_JAAiTrQKv5uNtdU3KeAbkU', // Ganti dengan kunci API Anda
//         },
//       });
//       this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
//     } catch (error) {
//       console.error('Error fetching videos: ', error);
//     }
//   };

//   handleVideoClick = (video) => {
//     this.setState({ selectedVideo: video });
//   };

//   render() {
//     const { videos, selectedVideo } = this.state;

//     return (
//       <div className="ui container">
        
//         <div className="ui segment">
//           <form onSubmit={this.handleSubmit} className="ui form" style={{marginTop: '10px'}}>
//             <input
//               type="text"
//               value={this.state.query}
//               onChange={this.handleChange}
//               placeholder="Search for videos..."
//             />
//             <button type="submit">Search</button>
//           </form>
//         </div>
      
//       <div style={{ display: 'flex', flexDirection: 'row' }}>
//         <div className="main-video">
//           {selectedVideo && <MainVideo video={selectedVideo} />}
//         </div>
          
//           <div className="video-list">
//             <div className="video-cards">
//               {videos.map((video) => (
//                 <VideoCard key={video.id.videoId} video={video} onClick={this.handleVideoClick} />
//               ))}
//             </div>
//           </div>
//       </div>
      
//     </div>
//     );
//   }
// }

// root.render(<App />);
