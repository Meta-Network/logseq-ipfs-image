import '@logseq/libs';

async function main() {
  logseq.App.showMsg('IPFS embeder :)');

  logseq.Editor.registerSlashCommand('Embed IPFS image 🦇', async () => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer ipfs://cid}} `,
    );
  })

  logseq.App.onMacroRendererSlotted(({ slot, payload }) => {
    const [ipfsEmbedUrl] = payload.arguments;
    if (!ipfsEmbedUrl?.startsWith('ipfs://')) return;

    const ipfsRegex = /ipfs:\/\/(\w*)/gm;

    const [url, cid] = ipfsRegex.exec(ipfsEmbedUrl);
    // reset slot ui
    return logseq.provideUI({
      key: `ipfs-${slot}`,
      slot, reset: true,
      template: `
        <div class="ipfs-embed">ipfs:${cid}
          <img src="https://ipfs.io/ipfs/${cid}"/>
        </div>
      `,
    })
  })
}

// bootstrap
logseq.ready(main).catch(console.error);