import Head from "@/components/head";
import Nav from "@/components/nav";
import styles from "@/styles/layouts/top.module.scss";

const Custom404 = () => (
  <div>
    <Head title="404" />
    <Nav />
    {/* TOP CONTENTS */}
    <div>
      <h1 className={styles.title}>ページがありません。</h1>
    </div>
    {/* // TOP CONTENTS */}
  </div>
);

export default Custom404;
