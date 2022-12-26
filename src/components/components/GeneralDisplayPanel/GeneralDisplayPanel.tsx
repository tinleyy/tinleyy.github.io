import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import './GeneralDisplayPanel.css';
import { DataLength } from '../../../service/global';

export default function GeneralDisplayPanel({ data, selectedCard, handleSelectIndexModel, allItemsLength }: { data: any[], selectedCard: string, handleSelectIndexModel: Function, allItemsLength: DataLength | undefined }) {
  const dataset = data;

  const PanelContent = ({ content }: { content: any[] }) => {
    if (content.length >= 1) {
      return (
        <>
          {content?.map((d, index) => {
            return (
              <Grid item key={index} m={1}>
                <Chip icon={<FiberSmartRecordIcon />} variant="outlined" className="card-chips" label={d?.name} />
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
                      <h4 style={{ display: title === "Index" ? 'table-cell' : ''}}>{title === "Index"
                        ? allItemsLength?.index_length
                        : title === "Model"
                          ? allItemsLength?.model_length
                          : ""}&nbsp;{title}</h4>
                      <Typography variant="caption">
                        {title === "Index"
                          ? `${allItemsLength?.record_length} DataRecords` : ""}
                      </Typography>
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
