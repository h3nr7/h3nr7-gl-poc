import * as React from 'react';
import { hot } from 'react-hot-loader';

import { IFoot } from './foot.interface';

const FootComp:React.StatelessComponent<IFoot> = () => {


    return <div>Foot</div>;
};

export const Foot = hot(module)(FootComp);