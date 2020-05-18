import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import {  ISize } from './glcanvas.interface';
export function useResize<T>(
    mountRef: React.RefObject<HTMLDivElement>,
    initialSize?: ISize
):ISize {

    const [size, setSize] = useState<ISize>([0,0]);

    useEffect(() => {
        const mount = mountRef.current;
        let width = 0;
        let height = 0;

        if(initialSize) {
            [width, height] = initialSize;
        } else {
            width = mount.offsetWidth;
            height = mount.offsetHeight;
        }

        setSize([width, height]);

        // update resize
        const resizeObserver = new ResizeObserver((entries): void => {
            if(!entries || !entries.length) {
                return;
            }
            if(initialSize === undefined) {
                const { width, height } = entries[0].contentRect;
                setSize([width, height]);
            }
        });
        resizeObserver.observe(mount);

        return ():void {
            resizeObserver.unobserve(mount);
        }

    }, [initialSize, mountRef]);

    return size;
}