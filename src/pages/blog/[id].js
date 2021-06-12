import Head from "@/components/head";
import Nav from "@/components/nav";
import BlogDetail from "@/components/blogdetail";
import styles from "@/styles/layouts/top.module.scss";

const BlogDetails = ({ post }) => {
  return (
    <div>
      <Head title="BlogDetail" />
      <Nav />
      {/* TOP CONTENTS */}
      <div>
        <h1 className={styles.title}>タイトルが入ります</h1>
      </div>
      {/* article_wrapper */}
      <BlogDetail
        id={post.id}
        thumbnail_url={post.thumbnail.url}
        title={post.title}
        categories={post.categories}
        published_at={post.publishedAt}
        updated_at={post.updatedAt}
        description={post.description}
        content={post.content}
      />
      {/* // article_wrapper */}
      {/* // TOP CONTENTS */}
    </div>
  );
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };
  const data = await fetch("https://kagepedia.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };
  const data = await fetch(
    "https://kagepedia.microcms.io/api/v1/blog/" + id,
    key
  )
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      post: data,
    },
  };
};

export default BlogDetails;
