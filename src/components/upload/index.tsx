import React, { FC, useState, useCallback, useEffect } from 'react';
import { Input, Image, Spinner, Box, Text } from '@chakra-ui/react';
import { IPFS_POST_SERVER, IPFS_GET_SERVER } from '../../constants';

const ipfsClient = require('ipfs-http-client');

export interface UploadProps {
  id: string;
  value?: string;
  onChange?: (cid: string) => any;
}

const Upload: FC<UploadProps> = ({ id, value: valueFromProp, onChange, ...rest }) => {
  const [value, setValue] = useState(valueFromProp || '');
  const [isLoading, setLoadingStatus] = useState(false);
  const saveToIpfs = useCallback(async (files: any[]) => {
    const ipfs = ipfsClient(IPFS_POST_SERVER);
    if (files.length === 0) {
      return;
    }
    try {
      setLoadingStatus(true);
      const added = await ipfs.add(files[0], {
        progress: (arg: any) => arg,
      });
      console.log(added.cid.toString(), '=============');
      setValue(added.cid.toString());
      setLoadingStatus(false);
    } catch (err) {
      setLoadingStatus(false);
    }
  }, []);
  const captureFile = useCallback((event: any) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
      saveToIpfs(event.target.files);
    }
  }, []);

  useEffect(() => {
    if (valueFromProp !== value) {
      setValue(valueFromProp);
    }
  }, []);

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);
  const view = (
    <Box>
      {value ? (
        <Image w="100px" h="30px" src={`${IPFS_GET_SERVER}/${value}`} />
      ) : (
        <Text fontSize="14px">上传</Text>
      )}
    </Box>
  );
  return (
    <Box>
      <Input
        id={id}
        display="none"
        type="file"
        onClick={(e) => {
          if (e) {
            e.stopPropagation();
          }
        }}
        onChange={captureFile}
        {...rest}
      />
      {isLoading ? <Spinner /> : view}
    </Box>
  );
};

export default Upload;
