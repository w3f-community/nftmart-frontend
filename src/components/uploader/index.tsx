import React from 'react';
import { Input } from '@chakra-ui/react';

const ipfsClient = require('ipfs-http-client');

export default function Uploader() {
  const saveToIpfs = async (files = []) => {
    const ipfs = ipfsClient('http://59.110.115.146:5001');
    if (files.length === 0) {
      return;
    }
    try {
      const added = await ipfs.add(files[0], {
        progress: (prog: any) => console.log(`received: ${prog}`),
      });
      console.log(added.cid.toString(), '=============');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const captureFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    saveToIpfs(event.target.files);
  };

  return (
    <form id="capture-media" onSubmit={handleSubmit}>
      <Input type="file" onChange={captureFile} />
      <br />
    </form>
  );
}
