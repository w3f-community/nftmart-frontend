import React, { FC } from 'react';
import { Box, Stack, Text, Button, Container, Center, BoxProps } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import colors from '../../../themes/colors';

export interface AlertProps extends BoxProps {
  onSetting: () => void;
}

const Alert: FC<AlertProps> = ({ onSetting, ...boxProps }) => {
  const { t } = useTranslation();

  return (
    <Box height="80px" backgroundColor="#e9ecff" display="flex" alignItems="center" {...boxProps}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          <Center>
            <Box>
              <Text display="inline" color={colors.text.gray}>
                {t('sales-setting.onsale')}
              </Text>{' '}
              <Text as="span" color={colors.primary}>
                {t('type.arts')} {t('type.sport')}
              </Text>
            </Box>
          </Center>
          <Button variant="default">{t('destory')}</Button>
          <Button variant="primary" onClick={onSetting}>
            {t('sales-setting.title')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Alert;
