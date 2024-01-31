<template>
  <div class="outer-div">
    <div v-if="category" class="heading">{{ category }}</div>
    <Loader v-if="loading" class="load" />
    <div class="error" v-if="error">
      There was an error while loading: {{ error }}
    </div>
    <div v-if="blogPosts" v-for="post in  formattedPosts " :key="post.index">
      <NuxtLink :to="`/article/${post.slug.current}`">
        <div class="main-div">
          <div class="info">
            <div class="post-details">
              <div v-if="post.category.title" class="category">
                {{ post.category.title }}
              </div>
              <div class="date">
                {{ post.formattedDate }}
              </div>
            </div>
            <div class="post-exerpt">
              <h3 class="title">
                {{ post.title }}
              </h3>
              <p v-if="post.snippet" class="extract">{{ post.snippet.substring(0, 100) }}..</p>
            </div>
          </div>
          <div class="thumbnail">
            <img v-if="post.image.asset.url" :src="post.image.asset.url" alt="Post thumbnail" />
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Define the props
const props = defineProps(['category', 'query', 'route']);

// Define reactive properties
const blogPosts = ref([]);
const loading = ref(true);
const error = ref(null);

// Function to convert blocks to plain text
const toPlainText = (blocks = []) => {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child) => child.text).join('');
    })
    .join('\n\n');
};

// Fetch blog data
const fetchArticles = async () => {
  try {
    const result = await fetchBlogData(props.query);
    blogPosts.value = result;
    loading.value = false;
  } catch (error) {
    error.value = error.message;
  }
};

// Fetch blog content based on route
const fetchArticles2 = async () => {
  try {
    const result = await fetchBlogContent(props.query, { 'slug': props.route });
    blogPosts.value = result;
    loading.value = false;
  } catch (error) {
    error.value = error.message;
  }
};

// Watch for changes in route and fetch data accordingly
watchEffect(() => {
  if (props.route) {
    fetchArticles2();
  } else {
    fetchArticles();
  }
});

// Computed property to format posts
const formattedPosts = ref([]);

// Watch for changes in blogPosts and update formattedPosts accordingly
watchEffect(() => {
  formattedPosts.value = blogPosts.value.map((post) => {
    const date = new Date(post._createdAt);
    const newIndex = blogPosts.value.indexOf(post);
    const snippet = toPlainText(post.body);
    return {
      ...post,
      snippet,
      formattedDate: date.toLocaleString('en-us', { year: 'numeric', month: 'short', day: 'numeric' }),
      index: newIndex,
    };
  });
});

</script>
<style scoped>
.outer-div {
  padding: 72px 16px 0;
  max-width: 1200px;
  margin: auto;
  display: grid;
  gap: 24px 36px;
  grid-template-columns: repeat(2, 1fr);
}

a:hover {
  opacity: .95;
}

.heading {
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 110%;
  color: #232E52;
  grid-column: span 2;
}

.load {
  grid-column: span 2;
}

.main-div {
  display: flex;
  justify-content: space-between;
  padding: 40px 0 10px;
  border-top: solid 1px #c9d0dd;
}

.post-details {
  display: flex;
  font-style: normal;
  font-weight: 650;
  font-size: 13px;
  line-height: 1;
  color: #232e52;
  text-transform: capitalize;
}

.info {
  width: 60%;
}

.category {
  padding: 8px 12px;
  background: #ebf2fe;
  border-radius: 6px 0px 0px 6px;
  margin-bottom: 0;
}

.date {
  padding: 8px 12px;
  border-radius: 0px 6px 6px 0;
  border: .5px solid #ebf2fe;
  text-transform: uppercase;
  margin-bottom: 0;
}

.title {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 120%;
  color: #232e52;
  margin-bottom: 0;
}

.extract {
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: grey;
}

.thumbnail {
  width: 35%;
  max-height: 200px;
}

.thumbnail img {
  border-radius: 4px;
  object-fit: cover;
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 991px) {
  .main-div {
    padding: 30px 0 10px;
  }

  .info {
    width: 59%;
  }

  .thumbnail {
    width: 40%;
    height: 148px;
  }

  .heading {
    font-size: 28px;
  }

  .title {
    font-size: 24px;
  }
}

@media screen and (max-width: 767px) {
  .outer-div {
    display: block;
  }
}
</style>
