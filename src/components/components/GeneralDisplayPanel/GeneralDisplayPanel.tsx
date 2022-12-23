import { Card, CardContent, Chip, Grid } from '@mui/material';
import './GeneralDisplayPanel.css';

export default function GeneralDisplayPanel({ data, selectedCard, handleSelectIndexModel }: { data: any[], selectedCard: string, handleSelectIndexModel: Function }) {
  const dataset = data;

  const PanelContent = ({ content }: { content: any[] }) => {
    if (content.length >= 1) {
      return (
        <>
          {content?.map((d, index) => {
            return (
              <Grid item key={index} m={1}>
                <Chip label={d?.name} />
              </Grid>
            );
          })}
        </>
      );
    }
    return <></>
  }

  return (
    <>
      {dataset.map((d, index) => {
        const title = d?.title;
        const content = d?.content;

        return (
          <Grid item key={index} xs={12} sm={6} md={6} xl={6} p={3}>
            <div onClick={() => handleSelectIndexModel(title)}>
              <Card className={selectedCard === title ? "search_IndexModelCard--selected" : "can--select"}>
                <CardContent>
                  <Grid container>
                    <Grid item pr={5}>
                      <h4>{title}</h4>
                    </Grid>
                    &nbsp;
                    <PanelContent content={content} />
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </Grid>
        );
      })}
    </>
  );

}
