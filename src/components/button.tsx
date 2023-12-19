import {IButtonProps, Text, Button as NativeBaseButton,} from 'native-base'

interface ButtonProps extends IButtonProps{
    children: string
}

export default function Button({children, ...props} : ButtonProps) {
    return (
        <NativeBaseButton my={16} bg={'purple.700'} {...props}>
            <Text color={'white'}>{children}</Text>
        </NativeBaseButton>
    );
}