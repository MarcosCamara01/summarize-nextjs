import FlexMain from '@/components/common/FlexMain';

export default function RootLayout(props: { children: React.ReactNode, modal: React.ReactNode }) {
    return (
        <FlexMain>
            {props.children}
            {props.modal}
        </FlexMain>
    )
}
