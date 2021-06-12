import Head from "@/components/head";
import Nav from "@/components/nav";
import BlogList from "@/components/bloglist";
import styles from "@/styles/layouts/top.module.scss";

const Blog = ({ posts }) => {
  return (
    <div>
      <Head title="Blog" />
      <Nav />
      {/* TOP CONTENTS */}
      <div>
        <h1 className={styles.title}>ブログ一覧が入ります</h1>
      </div>
      {/* article_wrapper */}
      {posts.map((post) => (
        <BlogList
          key={post.id}
          id={post.id}
          thumbnail_url={post.thumbnail.url}
          title={post.title}
          categories={post.categories}
          published_at={post.publishedAt}
          updated_at={post.updatedAt}
          description={post.description}
        />
      ))}
      {/* // article_wrapper */}
      {/* // TOP CONTENTS */}
    </div>
  );
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };
  const data = await fetch("https://kagepedia.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      posts: data.contents,
    },
  };
};

export default Blog;
