import React, { FC } from 'react';

import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  Center,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';

import Layout from '../../layouts/common';
import colors from '../../themes/colors';
import { t } from '../../i18n';
import { CLASS_METADATA } from '../../constants';

const schema = Yup.object().shape({
  name: Yup.string().max(50, 'Too Long!').required('Required'),
  description: Yup.string().max(200, 'Too Long!').required('Required'),
  bannerUrl: Yup.string().required('Required'),
});

const CreateCollection: FC = () => {
  const formLabelLayout = {
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
    <Layout>
      <Box paddingTop={2}>
        <Container
          width="880px"
          height="600px"
          backgroundColor="#fff"
          mt="20px"
          mb="148px"
          borderRadius="4px"
        >
          <Box
            height="48px"
            borderBottom="1px solid #E9E9F0"
            pl="20px"
            fontWeight="600"
            fontSize="16px"
            lineHeight="47px"
            color={colors.text.black}
          >
            {t('create.collection.title')}
          </Box>
          <Container p="0 20px">
            <Formik
              initialValues={{
                name: '',
                bannerUrl: '',
                description: '',
              }}
              onSubmit={() => {
                console.log('aaa');
              }}
              validationSchema={schema}
            >
              {(props: FormikProps<any>) => {
                return (
                  <Form>
                    <Field name={CLASS_METADATA.name}>
                      {({
                        field,
                        form,
                      }: {
                        field: Record<string, unknown>;
                        form: { errors: { name: string }; touched: { name: string } };
                      }) => {
                        return (
                          <FormControl isInvalid={!!(form.errors.name && form.touched.name)}>
                            <Center w="100%">
                              <FormLabel {...formLabelLayout} htmlFor="name">
                                {t('create.name')}
                              </FormLabel>
                              <Input
                                id="name"
                                placeholder={t('create.name.placeholder')}
                                {...formInputLayout}
                              />
                            </Center>
                            <FormErrorMessage pl="188px">{form.errors.name}</FormErrorMessage>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field name={CLASS_METADATA.bannerUrl}>
                      {({
                        field,
                        form,
                      }: {
                        field: Record<string, unknown>;
                        form: { errors: { bannerUrl: string }; touched: { bannerUrl: string } };
                      }) => (
                        <FormControl
                          isInvalid={!!(form.errors.bannerUrl && form.touched.bannerUrl)}
                        >
                          <Center>
                            <FormLabel {...formLabelLayout} htmlFor="bannerUrl">
                              {t('create.img')}
                            </FormLabel>
                            <FormLabel htmlFor="bannerUrl" width="100%" mb="0">
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
                            <Input display="none" type="file" id="bannerUrl" />
                          </Center>
                          <FormErrorMessage pl="188px">{form.errors.bannerUrl}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name={CLASS_METADATA.description}>
                      {({
                        field,
                        form,
                      }: {
                        field: Record<string, unknown>;
                        form: { errors: { description: string }; touched: { description: string } };
                      }) => (
                        <FormControl
                          isInvalid={!!(form.errors.description && form.touched.description)}
                        >
                          <Center>
                            <FormLabel {...formLabelLayout} height="96px" htmlFor="description">
                              {t('create.intro')}
                            </FormLabel>
                            <Textarea
                              _placeholder={{ color: colors.text.lightGray }}
                              id="description"
                              placeholder={t('create.intro.placeholder')}
                              {...formInputLayout}
                              height="96px"
                            />
                          </Center>
                          <FormErrorMessage pl="188px">{form.errors.description}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Box textAlign="center" mt="20px">
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
                );
              }}
            </Formik>
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

export default CreateCollection;
