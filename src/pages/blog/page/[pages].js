import Head from "@/components/head";
import Nav from "@/components/nav";
import BlogList from "@/components/bloglist";
import styles from "@/styles/layouts/top.module.scss";

const Page = ({ posts }) => {
  return (
    <div>
      <Head title="Page" />
      <Nav />
      <div>
        <h1 className={styles.title}>ブログ一覧</h1>
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

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };

  const data = await fetch("https://kagepedia.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);

  // pager計算
  const count = Math.ceil(data.contents.length);
  const paths = new Array();
  for (let i = 0; i < count; i++) {
    paths.push(`/blog/page/${i + 1}`);
  }

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します（現在の一覧）
export const getStaticProps = async (context) => {
  let page = context.params.pages;
  if (!page) page = 1;
  const offset = (parseInt(page) - 1) * 10;
  const limit = 10;
  console.log(page, offset, limit);
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };
  const data = await fetch(
    "https://kagepedia.microcms.io/api/v1/blog?offset=" +
      offset +
      "&limit=" +
      limit,
    key
  )
    .then((res) => res.json())
    .catch(() => null);
  console.log(data.contents);
  return {
    props: {
      posts: data.contents,
    },
  };
};

export default Page;
