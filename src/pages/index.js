import Head from "@/components/head";
import Nav from "@/components/nav";
import BlogList from "@/components/bloglist";
import styles from "@/styles/layouts/top.module.scss";

const Home = ({ posts }) => {
  return (
    <div>
      <Head title="TOP" />
      <Nav />
      <h1 className={styles.title}>TOPページ</h1>
      {posts.map((post) => (
        <BlogList
          key={post.id}
          id={post.id}
          thumbnail_url={post.thumbnail.url}
          title={post.title}
          categories={post.categories}
          published_at={post.publishedAt}
          description={post.description}
        />
      ))}
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

export default Home;
