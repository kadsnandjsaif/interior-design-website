

function createBlogCard({image}) {
  return `
    <div class="blog-card">
      <img class="blog-card-bg" src="${image}" alt="blog">
      <div class="blog-card-overlay"></div>
    </div>
  `;
}

window.createReviewCard = createReviewCard;