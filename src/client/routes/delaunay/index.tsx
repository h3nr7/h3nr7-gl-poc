import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Convexhull } from '../../components/convexhull';
import { IDelaunay } from './delaunay.interface';
import { Img, ControlContainer, Heading, P, Button } from './delaunay.styles';
import { MenuItem, Select, SelectProps, makeStyles, FormControl, InputLabel } from '@material-ui/core';
import { OPTIONS } from '../../components/convexhull/convexhull.interface';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    label: {
        color: 'white',
        borderColor: 'white'
    },
    selector: {
        marginTop: theme.spacing(2)
    }
  }));

const DelaunayComp:React.FunctionComponent<IDelaunay> = () => {

    const classes = useStyles();
    const [option, setOption] = React.useState<OPTIONS>(OPTIONS.qhull2d);
    let [loaded, setLoaded] = React.useState(0);

    const handleChange = (event:React.ChangeEvent<SelectProps & { value: OPTIONS }>) => {
        setOption(event.target.value)
    };

    const handleRerun = () => setLoaded(loaded+1);

    return (
        <div>
            <Convexhull reload={loaded} renderOption={option}/>
            <ControlContainer>
                {/* <Img src="https://www.codewars.com/users/henryyp/badges/micro" /> */}
                <Heading>Convex Hull Lab</Heading>
                <P>Testing implementations of convex hull with various different techniques.</P>
                <FormControl className={classes.formControl}>
                    <InputLabel  
                        className={classes.label}
                        id="label-id">
                        Algorithm
                    </InputLabel>
                    <Select
                    displayEmpty
                    className={classes.selector}
                    id="select-id"
                    labelId="label-id"
                    value={option}
                    onChange={handleChange}
                    >
                    <MenuItem value={OPTIONS.qhull2d}>Quick Hull 2D</MenuItem>
                    <MenuItem value={OPTIONS.jarvismarch}>Jarvis March (gift wrapping)</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handleRerun} variant="contained" color="secondary">Rerun</Button>
            </ControlContainer>
                
        </div>
    );
}

export const Delaunay = hot(module)(DelaunayComp);