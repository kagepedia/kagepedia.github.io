import Head from "@/components/head";
import Nav from "@/components/nav";
import BlogList from "@/components/bloglist";
import styles from "@/styles/layouts/top.module.scss";

const CategoryList = ({ posts }) => {
  return (
    <div>
      <Head title="Categorylists" />
      <Nav />
      <div>
        <h1 className={styles.title}>カテゴリー一覧</h1>
      </div>
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

// 静的生成のためのパスを指定します(カテゴリリスト)
export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };
  const data = await fetch(
    "https://kagepedia.microcms.io/api/v1/categories",
    key
  )
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content) => `/blog/category/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const category = context.params.categories;
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };
  const data = await fetch(
    "https://kagepedia.microcms.io/api/v1/blog?filters=categories[contains]" +
      category,
    key
  )
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      posts: data.contents,
    },
  };
};

export default CategoryList;
