const React = require('react');

class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className={styles.navFooter} id="footer">
        <section className="copyright">
          Copyright &copy; {currentYear} Facebook Inc.
        </section>
      </footer>
    );
  }
}

const styles = {
  navFooter: {
    backgroundColor: '#000000'
  }
};

module.exports = Footer;
