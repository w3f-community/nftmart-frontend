import React, { FC } from 'react';
import {
  FormControl,
  Flex,
  FormLabel,
  FormHelperText,
  FormControlProps,
  Heading,
} from '@chakra-ui/react';

export interface NFormControlProps extends Omit<FormControlProps, 'title'> {
  title: string;
  subtitle: string;
  direction?: 'horizontal' | 'vertical';
}

const NFormControl: FC<NFormControlProps> = ({
  title,
  subtitle,
  direction = 'horizontal',
  children,
  ...formControlProps
}) => {
  return (
    <FormControl id="email" {...formControlProps}>
      <Flex direction={direction === 'horizontal' ? 'row' : 'column'} justify="space-between">
        <Flex direction="column">
          <FormLabel mb="0">
            <Heading as="h4" size="md">
              {title}
            </Heading>
          </FormLabel>
          <FormHelperText>{subtitle}</FormHelperText>
        </Flex>
        <Flex paddingY={direction === 'horizontal' ? 0 : 4}>{children}</Flex>
      </Flex>
    </FormControl>
  );
};

export default NFormControl;
