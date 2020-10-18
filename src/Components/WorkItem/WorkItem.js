import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    margin: 10,
  },
  media: {
    height: 160,
  },
});

const WorkItem = ({data}) => {
    const {_id, title, photo} = data;
    const bgColor = ['primary', 'info', 'danger', 'success', 'warning'];
    const randomBgColor = bgColor[Math.floor(Math.random() * bgColor.length)];
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <Link to={`/event/${_id}`} className="text-decoration-none">
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={photo}
                    title={title}
                    />
                    <CardContent className={`bg-${randomBgColor} text-white`}>
                    <Typography className="text-center" gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Link>
            </Card>
        </>
    );
};

export default WorkItem;