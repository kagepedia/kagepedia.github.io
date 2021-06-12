import styles from "@/styles/components/blogdetail.module.scss";

const BlogList = ({
  thumbnail_url,
  title,
  categories,
  published_at,
  updated_at,
  description,
  content,
}) => {
  return (
    <div className={styles.article_wrapper}>
      <article className={styles.card_container}>
        <div className={styles.card_image}>
          <img src={thumbnail_url} width="300" height="300" alt={title} />
        </div>
        <div className={styles.card_content}>
          {categories.map((category) => (
            <a
              key={category.id}
              className={styles.card_category_link}
              href={`/blog/category/${category.id}/`}
            >
              <p className={styles.card_category}>{category.category_name}</p>
            </a>
          ))}
          <p className={styles.card_publish_at}>
            {published_at}
            <span className={styles.message}>投稿</span>
          </p>
          <p className={styles.card_update_at}>
            {updated_at}
            <span className={styles.message}>更新</span>
          </p>
          <h3 className={styles.card_title}>{title}</h3>
          <p className={styles.card_description}>{description}</p>
        </div>
        <div
          className={styles.card_wysiwyg}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </article>
    </div>
  );
};

export default BlogList;
