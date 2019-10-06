import Document, { Html, Head, Main, NextScript } from "next/document";
import { DocumentContext } from "next";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const { renderPage } = ctx;

    const isProduction = process.env.NODE_ENV === "production";
    const initialProps = await Document.getInitialProps(ctx);
    const page = renderPage((App: any) => (props: any) => <App {...props} />);

    return { ...initialProps, isProduction, page };
  }

  setGoogleTags() {
    return {
      __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-149489768-1');
        `
    };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="/static/images/icon-48x48.png" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/icofont/icofont.min.css" />
          <link rel="stylesheet" href="/static/css/main.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {this.props.isProduction && (
            <>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-149489768-1"
              />
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </>
          )}
        </body>
      </Html>
    );
  }
}
