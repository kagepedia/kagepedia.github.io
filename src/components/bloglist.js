import styles from "@/styles/components/bloglist.module.scss";

const BlogDetail = ({
  index,
  id,
  thumbnail_url,
  title,
  categories,
  published_at,
  updated_at,
  description,
}) => {
  return (
    <div className={styles.article_wrapper} key={index}>
      <article className={styles.card_container}>
        <a className={styles.card_link} href={`/blog/${id}`}>
          <div className={styles.card__image}>
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
        </a>
      </article>
    </div>
  );
};

export default BlogDetail;
