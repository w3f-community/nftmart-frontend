import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import {
  Input,
  Image,
  Spinner,
  Box,
  Text,
  FormLabel,
  CircularProgress,
  CircularProgressLabel,
  useToast,
} from '@chakra-ui/react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import axios from 'axios';

import { IPFS_POST_SERVER, PINATA_SERVER, PINATA_POST_SERVER } from '../../constants';
import { t } from '../../i18n';
import colors from '../../themes/colors';

interface INavProps {
  imgUrl: string;
  name: string;
  uploadHandle: any;
}

const CropperCop: React.FC<INavProps> = (props) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<any>();

  // 将base64转换为blob
  const dataURLtoBlob = (dataurl: any) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i <= n; i += 1) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  };

  const getCropData = () => {
    console.log('cropper : ', cropper);
    if (typeof cropper !== 'undefined') {
      const imgData = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      const cropBlob = dataURLtoBlob(imgData);
      const cropFile = new File([cropBlob], props.name);
      props.uploadHandle([cropFile]);
    }
  };

  return (
    <Box>
      <Cropper
        src={props.imgUrl}
        style={{ height: 400, width: '100%' }}
        // Cropper.js options
        initialAspectRatio={16 / 9}
        guides={false}
        // crop={onCrop}
        ref={cropperRef}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <Text
        fontSize="14px"
        lineHeight="47px"
        cursor="pointer"
        color={colors.success}
        onClick={getCropData}
      >
        {t('create.crop.confirm')}
      </Text>
    </Box>
  );
};

const {
  REACT_APP_PINATA_API_KEY,
  REACT_APP_PINATA_API_SECRET_KEY,
  REACT_APP_PINATA_ENABLE,
} = process.env;
const ipfsClient = require('ipfs-http-client');

export interface UploadProps {
  boxProps?: Record<string, unknown>;
  id: string;
  value?: any;
  onChange?: (cid: string) => any;
}

const Upload: FC<UploadProps> = ({ id, value: valueFromProp, onChange, boxProps, ...rest }) => {
  const [value, setValue] = useState(valueFromProp.url || '');
  const [isLoading, setLoadingStatus] = useState(false);
  const [imgName, setImgName] = useState('');
  const [showCrop, setShowCrop] = useState(false);
  const [fileSize, setFileSize] = useState(true);
  const [progresses, setProgresses] = useState(0);
  const toast = useToast();

  const saveToIpfs = useCallback(async (files: any[]) => {
    if (files[0].size > 10737418240 || files[0].size === 10737418240) {
      toast({
        title: 'The file size cannot exceed 10G',
        status: 'error',
        position: 'top',
        duration: 3000,
      });

      setLoadingStatus(false);
      return;
    }
    if (files[0].size < 10737418240 && REACT_APP_PINATA_ENABLE === 'true') {
      setLoadingStatus(true);
      const formData = new FormData();

      formData.append('file', files[0]);

      // const result = await fetch(PINATA_POST_SERVER, {
      //   method: 'POST',

      //   headers: {
      //     pinata_api_key: REACT_APP_PINATA_API_KEY!,
      //     pinata_secret_api_key: REACT_APP_PINATA_API_SECRET_KEY!,
      //   },

      //   body: formData,

      // });

      const result = await axios.post(PINATA_POST_SERVER, formData, {
        headers: {
          pinata_api_key: REACT_APP_PINATA_API_KEY!,
          pinata_secret_api_key: REACT_APP_PINATA_API_SECRET_KEY!,
        },
        onUploadProgress: (progress) => {
          // 格式化成百分数
          setProgresses(Math.floor((progress.loaded / progress.total) * 100));
        },
      });

      const responseData = await result;
      setValue(responseData.data.IpfsHash);
      setLoadingStatus(false);
      return;
    }

    const ipfs = ipfsClient(PINATA_POST_SERVER);
    if (files.length === 0) {
      return;
    }
    try {
      setLoadingStatus(true);
      const added = await ipfs.add(files[0], {
        progress: (arg: any) => arg,
      });
      // console.log(added.cid.toString(), '=============');
      setValue(added.cid.toString());
      setLoadingStatus(false);
      setShowCrop(false);
    } catch (err) {
      setLoadingStatus(false);
    }
  }, []);
  const captureFile = useCallback((event: any) => {
    if (event.target.files.length > 0) {
      event.stopPropagation();
      event.preventDefault();
      saveToIpfs(event.target.files);
      setShowCrop(false);
      setImgName(event.target.files[0].name);
    }
  }, []);

  const cropImage = (e: any) => {
    if (e) {
      e.stopPropagation();
    }
    setShowCrop(true);
  };

  useEffect(() => {
    if (valueFromProp.url !== !!valueFromProp.url) {
      setValue(valueFromProp.url as string);
    }
  }, []);

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  const txtUpload = (
    <Text fontSize="14px" lineHeight="47px" cursor="pointer" color={colors.success}>
      {t('create.upload')}
    </Text>
  );
  const crop = !showCrop ? (
    <Image w="auto" h="350px" m="16px 0" src={`${PINATA_SERVER}${value}`} />
  ) : (
    <CropperCop
      imgUrl={`${PINATA_SERVER}${value}`}
      uploadHandle={saveToIpfs}
      name={imgName}
    ></CropperCop>
  );
  const view = (
    <Box>
      {value
        ? // <Image w="350px" h="350px" m="16px 0" src={`${PINATA_SERVER}/${value}`} />
          crop
        : txtUpload}
    </Box>
  );
  const imgWrap = (
    <Box>
      {isLoading ? (
        <CircularProgress value={progresses} isIndeterminate color="green.400">
          <CircularProgressLabel>{progresses}%</CircularProgressLabel>
        </CircularProgress>
      ) : (
        view
      )}
    </Box>
  );

  const operateBtn = (
    <Box>
      {value && !showCrop ? (
        <Text
          fontSize="14px"
          lineHeight="47px"
          cursor="pointer"
          color={colors.success}
          onClick={cropImage}
        >
          {t('create.crop')}
        </Text>
      ) : (
        ''
      )}
    </Box>
  );

  return (
    <Box>
      <Box {...boxProps}>
        <FormLabel htmlFor="url">
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
          {/* {txtUpload} */}
          {showCrop ? txtUpload : ''}
          {!showCrop ? imgWrap : ''}
        </FormLabel>
        {/* 切图编辑时不触发input点击事件 */}
        {showCrop ? imgWrap : ''}
      </Box>
      {operateBtn}
    </Box>
  );
};

export default Upload;
