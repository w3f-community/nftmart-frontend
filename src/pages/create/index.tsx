import React from 'react';
import {
  Box,
  Container,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import colors from '../../themes/colors';
import Layout from '../../layouts/common';

const CreateCollection = () => {
  const { t } = useTranslation();

  const formLableLayout = {
    width: '240px',
    height: '48px',
    htmlFor: 'name',
    fontSize: '14px',
    color: colors.text.gray,
    borderBottom: '1px solid #F3F4F8',
    mb: '0',
    mr: '0',
    lineHeight: '47px',
  };
  const formInputLayout = {
    variant: 'flushed',
    size: 'lg',
    fontSize: '14px',
    borderBottomColor: '#F3F4F8',
  };

  return (
    <Layout title="title.create">
      <Box padding={2}>
        <Container
          width="880px"
          minHeight="100vh"
          backgroundColor="#fff"
          mt="20px"
          mb="148px"
          borderRadius="4px"
        >
          <Box
            height="48px"
            borderBottom=" 1px solid #E9E9F0"
            pl="20px"
            fontWeight="600"
            fontSize="16px"
            lineHeight="47px"
            color={colors.text.black}
          >
            {t('create.title')}
          </Box>
          <Container p="0 20px">
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={() => {
                console.log('aaa');
              }}
            >
              <Form>
                <Field name="name">
                  {({
                    field,
                    form,
                  }: {
                    field: Record<string, unknown>;
                    form: { errors: { name: string }; touched: { name: string } };
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.name && form.touched.name)}
                      display="flex"
                      alignItems="center"
                    >
                      <FormLabel {...formLableLayout}>{t('create.collection.name')}</FormLabel>
                      <Select {...formInputLayout}>
                        <option value="" color={colors.text.black}>
                          Hashmasks
                        </option>
                      </Select>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({
                    field,
                    form,
                  }: {
                    field: Record<string, unknown>;
                    form: { errors: { name: string }; touched: { name: string } };
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.name && form.touched.name)}
                      display="flex"
                      alignItems="center"
                    >
                      <FormLabel {...formLableLayout}>{t('create.name')}</FormLabel>
                      <Input
                        _placeholder={{ color: colors.text.lightGray }}
                        id="name"
                        placeholder={t('create.name.placeholder')}
                        {...formInputLayout}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({
                    field,
                    form,
                  }: {
                    field: Record<string, unknown>;
                    form: { errors: { name: string }; touched: { name: string } };
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.name && form.touched.name)}
                      display="flex"
                      alignItems="center"
                    >
                      <FormLabel {...formLableLayout}>{t('create.img')}</FormLabel>
                      <FormLabel htmlFor="file" width="100%" mb="0">
                        <Box
                          height="48px"
                          fontSize="14px"
                          color={colors.text.lightGray}
                          lineHeight="48px"
                          borderBottom="1px solid #F3F4F8"
                        >
                          {t('create.img.placeholder')}
                        </Box>
                      </FormLabel>
                      <Input display="none" type="file" id="file" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({
                    field,
                    form,
                  }: {
                    field: Record<string, unknown>;
                    form: { errors: { name: string }; touched: { name: string } };
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.name && form.touched.name)}
                      display="flex"
                      alignItems="center"
                    >
                      <FormLabel {...formLableLayout}>{t('create.link')}</FormLabel>
                      <Input {...formInputLayout} />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({
                    field,
                    form,
                  }: {
                    field: Record<string, unknown>;
                    form: { errors: { name: string }; touched: { name: string } };
                  }) => (
                    <FormControl
                      isInvalid={!!(form.errors.name && form.touched.name)}
                      display="flex"
                      alignItems="center"
                    >
                      <FormLabel {...formLableLayout} height="96px">
                        {t('create.intro')}
                      </FormLabel>
                      <Textarea
                        _placeholder={{ color: colors.text.lightGray }}
                        id="name"
                        placeholder={t('create.intro.placeholder')}
                        {...formInputLayout}
                        height="96px"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Box textAlign="center" mt="21px">
                  <Button
                    type="submit"
                    backgroundColor={colors.primary}
                    fontSize="14px"
                    color="#fff"
                    _hover={{ backgroundColor: colors.primary }}
                    _focus={{ backgroundColor: colors.primary }}
                  >
                    {t('create.save')}
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

export default CreateCollection;
