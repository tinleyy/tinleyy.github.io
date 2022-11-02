import { Card, CardContent, Chip, Grid } from '@mui/material';

export default function GeneralDisplayPanel({ data }: { data: any[] }) {
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
            <Grid item xs={12} sm={6} md={6} xl={6} p={3} key={index}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item>
                      <h4>{title}</h4>
                    </Grid>
                    <PanelContent content={content} />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </>
    );
  
  }
  