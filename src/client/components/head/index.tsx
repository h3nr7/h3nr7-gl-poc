import * as React from 'react';
import { hot } from 'react-hot-loader';

import { IHead } from './head.interface';

const HeadComp:React.StatelessComponent<IHead> = () => {

    return (
        <div></div>
    );
}

export const Head = hot(module)(HeadComp);


