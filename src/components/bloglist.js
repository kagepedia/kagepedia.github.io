import dateformat from "@/utils/date";
import nl2br from "@/utils/filter";
import styles from "@/styles/components/bloglist.module.scss";

const BlogDetail = ({
  index,
  id,
  thumbnail_url,
  title,
  categories,
  published_at,
  description,
}) => {
  return (
    <div className={styles.article_wrapper} key={index}>
      <article className={styles.card_container}>
        <a className={styles.card_link} href={`/blog/${id}`}>
          <div className={styles.card__image}>
            <img src={thumbnail_url} width="300" height="300" alt={title} />
          </div>
        </a>
        <div className={styles.card_content}>
          <p className={styles.card_publish_at}>
            {dateformat(published_at, "YYYY-MM-DD")}
          </p>
          {categories.map((category) => (
            <a
              key={category.id}
              className={styles.card_category_link}
              href={`/blog/category/${category.id}/`}
            >
              <p className={styles.card_category}>{category.category_name}</p>
            </a>
          ))}
          <h3 className={styles.card_title}>
            <a href={`/blog/${id}`}>{title}</a>
          </h3>
          <p className={styles.card_description}>{nl2br(description)}</p>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
