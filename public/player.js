const iframe = document.querySelector("iframe");

document.querySelectorAll(".video").forEach(item => {
   item.addEventListener("click", () => {
      document.querySelectorAll(".playing").forEach(playing => playing.classList.remove("playing"));

      const id = item.getAttribute("data-id");
      iframe.src = `https://youtube.com/embed/${id}`;
      item.classList.add("playing");
   })
})