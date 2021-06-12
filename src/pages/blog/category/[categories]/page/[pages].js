import Head from "@/components/head";
import Nav from "@/components/nav";
import BlogList from "@/components/bloglist";
import styles from "@/styles/layouts/top.module.scss";

const CategoryList = ({ posts }) => {
  return (
    <div>
      <Head title="Categorylists" />
      <Nav />
      {/* TOP CONTENTS */}
      <div>
        <h1 className={styles.title}>カテゴリー一覧のページャーが入ります</h1>
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

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };

  // カテゴリ一覧を取得
  const data = await fetch(
    "https://kagepedia.microcms.io/api/v1/categories",
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  // カテゴリに紐づいたデータから件数を計算してページャー部分を生成
  const paths = new Array();
  await Promise.all(
    data.contents.map(async (content) => {
      const cate_data = await fetch(
        "https://kagepedia.microcms.io/api/v1/blog?filters=categories[contains]" +
          content.id,
        key
      )
        .then((res) => res.json())
        .catch(() => null);

      // ページ番号計算
      const count = Math.ceil(cate_data.contents.length);
      for (let i = 0; i < count; i++) {
        paths.push(`/blog/category/${content.id}/page/${i + 1}`);
      }
    })
  );

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します（現在の一覧）
export const getStaticProps = async (context) => {
  const category = context.params.categories;
  let page = context.params.pages;
  if (!page) page = 1;
  const offset = (parseInt(page) - 1) * 10;
  const limit = 10;
  const key = {
    headers: { "X-API-KEY": process.env.X_API_KEY },
  };
  const data = await fetch(
    "https://kagepedia.microcms.io/api/v1/blog?filters=categories[contains]" +
      category +
      "&offset=" +
      offset +
      "&limit=" +
      limit,
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
