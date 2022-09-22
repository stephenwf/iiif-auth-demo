export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Auth dev</h1>
      <a href="/iiif/manifest">Example manifest</a>
      <br />
      <a href="https://digirati-co-uk.github.io/iiif-auth-client/?manifest=https://iiif-auth-demo.stephenwf.workers.dev/iiif/manifest">
        Auth client
      </a>
    </div>
  );
}
