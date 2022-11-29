type Props = {
    currentPanel: string,
    targetPanel: string,
    children: JSX.Element
};

const PanelContainer = ({ currentPanel, targetPanel, children }: Props) => {
    if(currentPanel === targetPanel)
        return children;
    return <></>
}

export default PanelContainer;