interface Props {
    children: React.ReactNode;
}

const Content = ({ children }: Props) => {
    return <main>{children}</main>;
};
export default Content;
