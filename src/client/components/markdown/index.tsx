import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown';
import MathJax from 'react-mathjax';
import * as RemarkMathPlugin from 'remark-math';
import { hot } from 'react-hot-loader';


export type IMarkdown = ReactMarkdownProps;

const Comp:React.FC<IMarkdown> = (props) => {

    const newProps:ReactMarkdownProps = {
        ...props,
        plugins:[
            RemarkMathPlugin
        ],
        renderers: {
            ...props.renderers,
            math: (props:any) => <MathJax.Node fomula={props.value} />,
            inlineMath: (props:any) => <MathJax.Node inline formula={props.value} />
        }
    };

    console.log(newProps, ReactMarkdown, MathJax.Node);
    return (
        <MathJax.Provider input="tex">
            <ReactMarkdown {...newProps} />
        </MathJax.Provider>
    );
}

export const Markdown = hot(module)(Comp);
