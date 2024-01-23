<template>
  <div class="outer-div">
    <div v-if="category" class="heading">{{ category }}</div>
    <Loader v-if="loading" class="load" />
    <div class="error" v-if="error">
      There was an error while loading: {{ error }}
    </div>
    <div v-if="blogPosts" v-for="post in formattedPosts" :key="post.index">
      <router-link :to="{ name: 'blog', params: { slug: post.slug.current } }">
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
              <p v-if="post.snippet" class="extract">{{ post.snippet.subString(0, 20) }}</p>
            </div>
          </div>
          <div class="thumbnail">
            <img v-if="post.image.asset.url" :src="post.image.asset.url" alt="Post thumbnail" />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { fetchBlogData, fetchBlogContent } from "../composables/getPosts";
import Loader from "../components/Loader.vue"
export default {
  name: "Snippet",
  props: ['category', 'query', 'route'],
  components: { Loader },
  data() {
    return {
      blogPosts: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    toPlainText(blocks = []) {
      blocks.map(block => {
        if (block._type !== 'block' || !block.children) {
          return '';
        }
        return block.children.map(child => child.text).join('');
      }).join('\n\n')
    }
  },
  created() {
    if (this.route) {
      fetchBlogContent(this.query, { "slug": this.route }).then((result) => {
        this.blogPosts = result;
        this.loading = false;
        console.log(this.posts);
      }), (error) => {
        this.error = error;
      };
    } else {
      fetchBlogData(this.query).then((result) => {
        this.blogPosts = result;
        this.loading = false
      }), (error) => {
        this.error = error;
      };
    }
  },
  computed: {
    formattedPosts() {
      return this.blogPosts.map((post) => {
        const date = new Date(post._createdAt)
        const newIndex = this.blogPosts.indexOf(post)
        const snippet = this.toPlainText(post.body)
        return {
          ...post,
          snippet,
          formattedDate: date.toLocaleString('en-us', { year: "numeric", month: "short", day: "numeric" }),
          index: newIndex,
        };
      });
    },
  },
};
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
