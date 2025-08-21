import express from "express";
import { engine } from "express-handlebars";

const API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3";
const PLAYLIST_ID = "PLFYq1yV30ntI7BWRXHlnLphrPXcGinaaP";

const app = express();

async function fetchVideos() {
   const response = await fetch(`${YOUTUBE_URL}/playlistItems?playlistId=${PLAYLIST_ID}&key=${API_KEY}&part=snippet&maxResults=10`);
   if (!response.ok) {
      return [];
   }
   return await response.json();
}

app.engine(
   ".hbs",
   engine({
      extname: ".hbs",
   })
);
app.set("view engine", ".hbs");
app.set("views", "views");

app.use(express.json());

app.get("/", async (_, res) => {
   const { items } = await fetchVideos();
   res.render("home", {
      firstVideoId: items[0].snippet.resourceId.videoId,
      videos: items.map((video, idx) => {
         return {
            isFirstVideo: idx === 0,
            videoId: video.snippet.resourceId.videoId,
            title: video.snippet.title,
            url: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}&list=${video.snippet.playlistId}`,
            thumbnail: {
               ...video.snippet.thumbnails.high
            }
         }
      })
   });
})

app.listen(3000, () => {
   console.log("App running");
})

export { app };

