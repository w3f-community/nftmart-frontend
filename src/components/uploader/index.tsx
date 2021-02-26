import React, { useCallback } from 'react';
import { Box, Center } from '@chakra-ui/react';
// import { useIpfs } from '../../utils';
import { useDropzone } from 'react-dropzone'
const ipfsClient = require('ipfs-http-client')

export default function Uploader({ name = '' }) {

  const onDrop = useCallback(files => {

    console.log(files)
    saveToIpfs(files)
  }, [])

  const saveToIpfs = async (files = []) => {
    const ipfs = ipfsClient('http://59.110.115.146:4001')
    if (files.length == 0) {
      return
    }
    try {
      const added = await ipfs.add(
        files[0],
        {
          progress: (prog: any) => console.log(`received: ${prog}`)
        }
      )
      console.log(added)
    } catch (err) {
      console.error(err)
    }
  }

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  })

  return <Center p={4} border='1px solid gray' borderRadius='lg'>
    <div {...getRootProps()}>
      <input {...getInputProps} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  </Center>

}
