type Props = {
    currentPage: number,
    targetPage: number,
    children: JSX.Element
};

const PageContainer = ({ currentPage, targetPage, children }: Props) => {
    if(currentPage === targetPage)
        return children;
    return <></>
}

export default PageContainer;